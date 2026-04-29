const express = require('express');
const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes'); // import the male measurement router
const measurementMaleRouter = require('./features/measurement/female/measurement-female-routes'); // import the female measurement router


const apiRouter = express.Router();

// Mount the male measurement routes under /measurements/male
apiRouter.use('/measurements/male', measurementMaleRouter);

// You can add other routers (female, etc.) here later

module.exports = apiRouter;