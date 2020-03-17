const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const user = req.body;
  userDb
    .insert(user)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ message: "Error adding user.", err }));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user_id = req.params.id;
  const post = { ...req.body, user_id };

  postDb
    .insert(post)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(400).json({ message: "error adding post", err }));
});

router.get("/", (req, res) => {
  userDb.get().then(users => res.status(200).send(users));
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).send(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb.getUserPosts(req.user.id).then(posts => res.status(200).send(posts));
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  userDb.remove(id).then(deleted => {
    console.log(deleted);
    if (deleted) res.status(204).end();
  });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;

  const user = req.body;
  console.log(user);
  userDb
    .update(id, user)
    .then(updated => {
      if (updated) {
        res.status(200).json({ id: Number(id), ...user });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "error updating user", err })
    );
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb.getById(id).then(user => {
    user
      ? (req.user = user)
      : res.status(400).json({ message: "invalid user id" });
    next();
  });
}

function validateUser(req, res, next) {
  const user = req.body;
  if (!user || Object.keys(user).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;

  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
