const config = require("../../config/server");
const niceUri = require("../../utils/nice-uri");
const mongoose = require('mongoose');

const intOr = (int, or) => Number.isInteger(int) ? int : or;
const stringOr = (string, or) => ("string" === typeof string) ? string : or;

const Post = mongoose.model("post", new mongoose.Schema({
  _id: String,
  author: String,
  title: Object,
  content: Object,
  date: Date,
  tags: [String],
  notes: String
}));

// Misc operations
const filterPostData = ({ _id, author, title, content, date, tags, notes }, user) => ({
  _id, author, title, content, date, tags,
  notes: user && user.hasPermission("author") ? notes : ""
});

const install = ({ server }) => {
  // API specific middlemare
  server.use((req, res, next) => {
    // Get User & Session data
    req.post = {};

    // Senders
    res.sendPost = async (post, user = req.user.maybeGetUser()) => {
      user = await user;
      console.log("sending post ...", {user,post})
      Array.isArray(post)
        ? res.sendData({ data: post.map(post => filterPostData(post, user)) })
        : res.sendData({ data: filterPostData(post, user) });
    }

    next();
  });

  // https://stackoverflow.com/questions/5830513/how-do-i-limit-the-number-of-returned-items
  server.get("/api/post", async (req, res) => Post
    .find({})
    .sort({ date: "descending" })
    .skip(intOr(parseInt(req.query.skip), 0)) // TODO: skip has poor performance on large collection
    .limit(intOr(parseInt(req.query.limit), undefined))
    .then(posts => res.sendPost(posts))
    .catch(error => res.error.server(error)));

  server.post("/api/post", (req, res) =>
    req.user.getUser()
      .then(user => {
        if (!user.hasPermission("author")) {
          return res.error.missingPermission("author");
        }
        const { title } = req.body;
        const post = new Post({ ...req.body, _id: niceUri(title) });
        post.isNew = true;
        return post.save().then(post => res.sendData({ data: post }))
      })
      .catch(error => {
        if (error === "not-logged-in") {
          res.error.notLoggedIn();
        } else {
          res.error.server(error);
        }
      }));

  server.get("/api/post/:id", (req, res) => {
    // We use a reg exp to find the post to allow users to potentially omit the UUID from the URL.
    const idRegExp = new RegExp("^" + req.params.id);
    Post
      .findOne({ _id: idRegExp })
      .then(post => res.sendPost(post))
      .catch(error => res.error.server(error));
  });

  server.put("/api/post/:id", (req, res) =>
    req.user.getUser()
      .then(user => {
        if (!user.hasPermission("author")) {
          return res.error.missingPermission("author");
        }
        const post = new Post({ ...req.body, _id: req.params.id });
        post.isNew = false;
        // TODO: Validate Post
        return post.save().then(post => res.sendData({ data: post }));
      })
      .catch(error => {
        if (error === "not-logged-in") {
          res.error.notLoggedIn();
        } else {
          res.error.server(error);
        }
      }));

  server.delete("/api/post/:id", async (req, res) => {
    try {
      const user = await req.user.getUser();
      if (!user.hasPermission("author")) {
        return res.error.missingPermission("author");
      }
      const post = await Post.deleteOne({ _id: req.params.id });
      return res.sendData({ data: post });
    } catch (error) {
      if (error === "not-logged-in") {
        return res.error.notLoggedIn();
      } else {
        return res.error.server(error);
      }
    }
  });

  server.get("/api/post-count", (req, res) =>
    Post
      .count({})
      .exec()
      .then(count => res.sendData({ data: { count } }))
      .catch(error => res.error.server(error)));

  server.get("/api/posts-of", (req, res) =>
    Post
      .find({ author: config.defaultUser.id })
      .sort({ date: "descending" })
      .skip(intOr(parseInt(req.query.skip), 0)) // todo: skip has poor performance on large collection
      .limit(intOr(parseInt(req.query.limit), undefined))
      .exec()
      .then(posts => res.sendData({ data: posts }))
      .catch(error => res.error.server(error)));

  server.get("/api/posts-of/:id", (req, res) =>
    Post
      .find({ author: req.params.id })
      .sort({ date: "descending" })
      .skip(intOr(parseInt(req.query.skip), 0)) // todo: skip has poor performance on large collection
      .limit(intOr(parseInt(req.query.limit), undefined))
      .exec()
      .then(posts => res.sendData({ data: posts }))
      .catch(error => res.error.server(error)));

  server.get("/api/tag", (req, res) =>
    Post
      .distinct("tags")
      .exec()
      .then(tags => res.sendData({ data: { tags } }))
      .catch(error => res.error.server(error)));

  server.get("/api/tag/count/:tag", (req, res) =>
    Post
      .count({ tags: req.params.tag })
      .exec()
      .then(count => res.sendData({ data: { count } }))
      .catch(error => res.error.server(error)));

  server.get("/api/tag/posts/:tag", (req, res) =>
    Post
      .find({ tags: req.params.tag })
      .sort({ date: "descending" })
      .skip(intOr(parseInt(req.query.skip), 0)) // todo: skip has poor performance on large collection
      .limit(intOr(parseInt(req.query.limit), undefined))
      .exec()
      .then(posts => res.sendData({ data: posts }))
      .catch(error => res.error.server(error)));
}

module.exports = {
  install
}