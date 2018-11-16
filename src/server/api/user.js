/*
 * Contains the user API operations for Helios like logging in
 */
const config = require("../../config/server");
const crypto = require("crypto");
const fp = require("../../fp");
const async = require("../../async");
const mongoose = require('mongoose');
const DbError = require("../db-error");
const { mongoError } = require("../error-transformer");

// All permissions avilable.
const allPermissions = {
  // The admin can do everything.
  admin: "admin",
  // The author can publish, delete and edit posts.
  author: "author"
};

// ===============================================
// === API FUNCTIONS
// ===============================================

const User = mongoose.model("user", new mongoose.Schema({
  _id: String,
  bio: Object,
  avatar: String,
  password: String,
  permissions: [String]
}));

const install = ({ server }) => {
  // API specific middlemare
  server.use((req, res, next) => {
    // Get User & Session data
    req.user = {};
    req.user.getSession = () => req.session.helios || {};
    req.user.putSession = (values) => req.session.helios = { ...req.getSession(), ...values };
    req.user.getUser = () => req.getSession().userId ? User.findOne({ _id: req.getSession().userId }) : Promise.reject("not-logged-in");

    // Senders
    res.sendUser = (user) => Array.isArray(user)
      ? res.sendData({ data: filterUserData(user) })
      : res.sendData({ data: user.map(filterUserData) });

    next();
  });

  // todo: handle if no default user exists (is that even reasonable?)
  server.get("/api/user", (req, res) =>
    getUser(config.defaultUser.id)
      .then(user => res.sendUser(user))
      .catch(error => res.error.server(error)));

  server.get("/api/user/:id", (req, res) =>
    getUser(req.params.id)
      .then(user => res.sendUser(user))
      .catch(error => res.error.server(error)));

  server.get("/api/users", (req, res) =>
    User.find({}).exec()
      .then(users => res.sendUser(users))
      .catch(error => res.error.server(error)))

  server.post("/api/user", (req, res) =>
    req.user.getUser()
      .then(user => {
        if (!hasPermission(user, "admin")) {
          return res.error.missingPermission("admin");
        }
        const { password, id, bio, avatar } = req.body;
        const user = new User({
          _id: id, // TODO: Permissions
          password: encrypt(password),
          bio, avatar
        });
        user.isNew = true;
        // TODO: Validate
        user.save()
          .then(user => res.sendUser(user))
          .catch(error => res.error.server(error));
      })
      .catch(error => res.sendData({ error })));

  server.put("/api/user/:id", (req, res) =>
    async.all({
      session: req.user.getUser(),
      oldUser: getUser(req.params.id)
    }).then(({ session, oldUser }) => {
      if (!hasPermission(session, "admin")) {
        return res.error.missingPermission("admin");
      }
      const { password, bio, avatar, permissions } = req.body;
      const user = new models.user({
        _id: req.params.id,
        password: password ? encrypt(password) : oldUser.password,
        permissions: permissions.reduce(
          (a, p) => allPermissions[p] && !a.includes(p) && p !== "admin" ? [...a, p] : a,
          oldUser.permissions.includes("admin") ? ["admin"] : []
        ),
        bio, avatar
      });
      user.isNew = false;
      // TODO: Validate
      user.save()
        .then(user => res.sendUser(user))
        .catch(error => res.error.server(error));
    }).catch(error => res.error.server(error)));

  server.get("/api/user-count", (req, res) =>
    User.count({}).exec()
      .then(count => res.sendData({ data: { count } }))
      .catch(error => res.error.server(error)));

  server.post("/api/session/login", (req, res) => {
    // If the user is already logged in they cannot log in again.
    // A log out is required first.
    if (req.user.getSession().userId) {
      return res.error.authorizationFailure();
    }
    const { id, password } = req.body;
    getUser(id)
      .then(user => {
        if (user.password !== encrypt(password)) {
          return res.error.authorizationFailure();
        }
        res.user.putSession({ userId: id })
        res.sendUser(user);
      })
      .catch(error => {
        if (error.code === DbError.NoSuchKey) {
          res.error.authorizationFailure({ error, errorCode: 400 })
        } else {
          res.error.server(error);
        }
      });
  });

  server.post("/api/session/logout", (req, res) => {
    const oldUser = req.user.getSession().userId || null;
    req.user.putSession({ userId: null });
    res.sendData({ data: oldUser });
  });

  server.get("/api/session", (req, res) =>
    getSessionUser(req)
      .then(user => res.sendUser(user))
      .catch(error => {
        if (error === "not-logged-in") {
          res.error.notLoggedIn();
        } else {
          res.error.server(error);
        }
      }));

  server.put("/api/session", (req, res) =>
    getSessionUser(req)
      .then(user => {
        const { password } = req.body;
        if (user.password !== encrypt(password)) {
          return res.error.authorizationFailure();
        }
        const { passwordNew, avatar, bio } = req.body;
        const newModel = createUpdatedModel(user, { password: passwordNew, avatar, bio });
        newModel.save()
          .then(user => res.sendUser(user))
          .catch(error => res.error.server(error));
      })
      .catch(error => {
        if (error === "not-logged-in") {
          res.error.authorizationFailure();
        } else {
          res.error.server(error);
        }
      }));

  server.get("/api/avatar/:id", (req, res) =>
    getUser(req.params.id)
      .then(user => user.avatar
        ? res.blob(user.avatar)
        : res.redirect("/static/content/system/default-avatar.png"))
      .catch(error => res.error.server(error)));

  createFactoryContent();
}

const hasPermission = (user, permission, notImpliedByAdmin) => user.permissions.includes(permission) || (!notImpliedByAdmin && user.permissions.includes("admin"));

// ===============================================
// === INTERNAL FUNCTIONS
// ===============================================

// Create default content for the CMS if ot does not exist
const createFactoryContent = () => {
  if (config.defaultUser) {
    const { password, id } = config.defaultUser;
    const user = new User({
      _id: id,
      bio: "",
      avatar: "",
      password: encrypt(password),
      permissions: ["admin"]
    });
    user.isNew = true;
    user.save((error, data) => {
      if (error && error.code !== mongoError.duplicateKey) {
        console.error("Default user *not* created:", id, error);
      } else if (data) {
        console.log("Default user created:", id);
      }
    });
  }
}

const createUpdatedModel = (user, { password, avatar, permissions, bio }) => {
  const validPassword = password => password && ("string" === typeof password);
  // TODO: make sure the avatar is of the right image format. We don't want users to upload malware!
  const validAvatar = avatar => avatar && ("string" === typeof avatar) && avatar.length <= 200 * 1024;
  const validPermissions = permissions => permissions && Array.isArray(permissions) && fp.all(permissions, p => allPermissions[p]);
  const validBio = () => true;

  const newUser = new User({
    _id: user._id,
    permissions: validPermissions(permissions) ? permissions : user.permissions,
    password: validPassword(password) ? encrypt(password) : user.password,
    bio: validBio(bio) ? bio : user.bio,
    avatar: validAvatar(avatar) ? avatar : user.avatar
  });
  newUser.isNew = false;
  return newUser;
}

// Misc operations
const filterUserData = ({ _id, avatar, bio, permissions }) => ({ id: _id, avatar, bio, permissions });
const encrypt = password => crypto.createHmac("sha256", config.passwordSecret).update(password).digest("hex");

// ===============================================
// === EXPORTS
// ===============================================

module.exports = {
  install, 
  
  hasPermission
}
