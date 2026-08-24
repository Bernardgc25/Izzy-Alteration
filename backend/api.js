const express = require('express');
const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes');
const alterationRouter = require('./features/alteration/alteration-routes');

const apiRouter = express.Router();

apiRouter.use('/measurements/male', measurementMaleRouter);
apiRouter.use('/measurements/female', measurementFemaleRouter);
apiRouter.use('/alterations', alterationRouter);

module.exports = apiRouter;