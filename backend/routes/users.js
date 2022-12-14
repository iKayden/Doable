const express = require('express');
const router = express.Router();
const { getPostsByUsers } = require('../helpers/dataHelpers');

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts,
  getUsersByProjectId,
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    if (req.query.projectId) {
      getUsersByProjectId(req.query.projectId)
        .then((users) => res.json(users))
        .catch((err) =>
          res.json({
            error: err.message,
          })
        );
    } else {
      getUsers()
        .then((users) => res.json(users))
        .catch((err) =>
          res.json({
            error: err.message,
          })
        );
    }
  });

  router.get('/posts', (req, res) => {
    getUsersPosts()
      .then((usersPosts) => {
        const formattedPosts = getPostsByUsers(usersPosts);
        res.json(formattedPosts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/', (req, res) => {
    const { name, avatar, email, password } = req.body;

    getUserByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists',
          });
        } else {
          return addUser(name, avatar, email, password);
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
