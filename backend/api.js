const express = require('express');
const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes'); // <-- changed variable name

const apiRouter = express.Router();

apiRouter.use('/measurements/male', measurementMaleRouter);
apiRouter.use('/measurements/female', measurementFemaleRouter);

module.exports = apiRouter;