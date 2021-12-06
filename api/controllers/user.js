const express = require('express');
const router = express.Router(); //create a router object.
const db = require('../models');
const { Post } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?

//creating routing for the User model.
//Route Handlers -- listen for request and send back responses
//router.HTTP_METHOD(URL_STRING (url that we want to listen to),ROUTE_HANDLER_FUNCTION(a function that will do the work of processing for this particular call) )
router.get('/', (req,res) => {  
//our api should listen to get request at the root url and this callback function (RHF)
//it give us acceess to the request object and response object 
//that we will use to do some processing
  Post.findAll({}) 
    .then(posts => res.json(posts)); 
    //in this case we find all post
    // and then for each post as a response send JSON response of post [res.json(posts)].
});


router.post('/', (req, res) => {
  let { content } = req.body;
  
  Post.create({ content })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      res.json(post);
    });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.content = req.body.content;
      post.save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.destroy();
      res.sendStatus(204);
    });
});


module.exports = router;