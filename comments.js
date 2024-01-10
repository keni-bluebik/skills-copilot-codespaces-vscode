// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express(); // Create an instance of express
app.use(bodyParser.json()); // Parse the body of the request as JSON

// Create empty object to store comments
const commentsByPostId = {};

// Create route handler to handle POST requests to /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // Create a random ID for the comment
  const { content } = req.body; // Extract the content from the request body
  const comments = commentsByPostId[req.params.id] || []; // Get the comments for the post from the commentsByPostId object

  // Add the new comment to the comments array
  comments.push({ id: commentId, content });

  // Store the comments array back in the commentsByPostId object
  commentsByPostId[req.params.id] = comments;

  // Send the new comment back to the client
  res.status(201).send(comments);
});

// Create route handler to handle GET requests to /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // Send the comments for the post back to the client
  res.send(commentsByPostId[req.params.id] || []);
});

// Start the server on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});