const express = require('express');
const measurementMaleRouter = require('./measurement-male-route'); // import the male measurement router

const apiRouter = express.Router();

// Mount the male measurement routes under /measurements/male
apiRouter.use('/measurements/male', measurementMaleRouter);

// You can add other routers (female, etc.) here later

module.exports = apiRouter;