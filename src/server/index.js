const fs = require("fs");
const axios = require("axios");
const spdy = require("spdy");
const createNext = require("next");
const express = require("express");
const session = require("express-session");
const compression = require("compression");
const api = require("./api");
const db = require("./db");
const config = require("../config/server");

const isDevelopment = process.env.NODE_ENV !== "production";

axios.defaults.baseURL = `https://localhost:${config.port.https}`;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = isDevelopment || config.certs.allowUnsigned ? "0" : "1";

console.log("📡", "Helios is starting ...");
console.log("📡", "Dev-Mode:", isDevelopment);

const next = createNext({
  dev: isDevelopment,
  dir: "./src"
});

const $send = (res, { error, data, errorCode, successCode }) => {
  console.info("sending", { error, data, errorCode, successCode })
  if (error) {
    res.status(errorCode || 500);
    res.send(error);
  } else if (!data) {
    res.status(errorCode || 404);
    res.send("no-data");
  } else {
    res.status(successCode || 200);
    res.send(data);
  }
}
$send.missingPermission = (res, permission) => $send(res, { error: `missing-permission-${permission}`, errorCode: 403 });
$send.incorrectPassword = (res) => $send(res, { error: "incorrect-password", errorCode: 400 });

Promise.all([next.prepare(), db.connected]).then(([_, dbResolved]) => {
  const server = express();

  server.use(compression({ filter: shouldCompress }));
  server.use(express.json({ limit: config.maxPayloadSize }));
  server.use(express.urlencoded({ limit: config.maxPayloadSize, extended: true }));
  server.use("/static", express.static("static"));
  server.use(session({
    // todo: Have a look at this again once we switch to HTTPS, or go live(Cookie laws...)!
    // todo: Use a better session store! (MongoDB)
    secret: config.cookieSecret
  }));

  // Pages
  server.get("/admin/post/:id", (req, res) => next.render(req, res, "/admin/post", req.params));
  server.get("/post", (req, res) => next.render(req, res, "/", req.params));
  server.get("/post/:id", (req, res) => next.render(req, res, "/post", req.params));

  // APIs
  Object.keys(api).forEach(k => !api[k].doNotInstall && api[k].install({ ...dbResolved, server, $send }));

  // Fallback
  server.get('*', next.getRequestHandler());

  // HTTP Server
  if (config.port.http) {
    const fallbackServer = express();
    fallbackServer.get("*", (req, res) => res.redirect("https://" + req.headers.host + ":" + config.port.https + req.url));
    fallbackServer.listen(config.port.http, err => err
      ? console.error("🔥", "Error while listening to fallback HTTP server", err)
      : console.log("📡", `Listening on fallback HTTP port ${config.port.http}!`));
  }
  // HTTPS Server
  spdy.createServer(spdyOptions(), server).listen(config.port.https, err => err
    ? console.error("🔥", "Error while listening", err)
    : console.log("📡", `Listening on port ${config.port.https}!`))
}).catch(err => console.error("🔥", "Error while preparing server!", err));

const shouldCompress = (req, res) => {
  if (isDevelopment) return false;
  if (req.headers["x-no-compression"]) return false;
  return compression.filter(req, res);
}

const spdyOptions = () => {
  const { key, cert } = config.certs;
  return {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert)
  };
};