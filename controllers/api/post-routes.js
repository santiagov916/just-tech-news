const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      oder: [['created_at', 'Desc']],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //get a single post
  router.get('/:id', (req, res) => {
      Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id', 'post_url', 'title', 'created_at'],
          include: [
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found'});
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
  })

  // create a post
  router.post('/', (req, res) => {
      Post.create({
          title: req.body.title,
          post_url: req.body.post_url,
          user_id: req.body.user_id
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  // update post
  router.put('/:id', (req, res) => {
      Post.update({
          title: req.body.title
      },
      {
          where: {
              id:req.params.id
          }
        }
      )
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  // delete post
  router.delete('/:id', (req, res) => {
      Post.destroy({
          where: {
              id: req.params.id
          }
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

module.exports = router;