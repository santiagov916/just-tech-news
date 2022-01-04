const router = require('express').Router();
const userRoutes = require('./user-routes.js');

const { Post, User, Comment } = require('');

router.use('/users', userRoutes);

module.exports = router;