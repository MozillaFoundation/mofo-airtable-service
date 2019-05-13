const Habitat = require("habitat");
const express = require("express");
const basicAuth = require("express-basic-auth");
const forceSSL = require("express-enforces-ssl");

const env = new Habitat();
const server = express();
const port = env.get("port") || 5000;

server.enable("trust proxy");
server.disable("x-powered-by");

server.use(forceSSL());
server.use((req, res, next) => { console.log(req.headers); next(); })
server.use(basicAuth({ users: env.get("apiUsers") }));
server.use(express.json({ strict: false }));

server.use("/api/engagement-team", require("./api/engagement-team-projects")(express));
server.use("/api/shared", require("./api/shared")(express));

server.listen(port, () => console.log(`Listening on port ${port}`));
