const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/action', actionRouter)

module.exports = server;
