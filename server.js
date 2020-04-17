const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");

server.use(express.json());
server.use(logger);

server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString().replace("T", " ")}] ${
      req.method
    } method is requested on "${req.url}" path`
  );
  next();
}

module.exports = server;
