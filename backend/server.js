const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const apiRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Serve static files from the postman directory
app.use('/test-api', express.static(path.join(__dirname, 'postman', 'measurment-API-test')));

// API routes
app.use('/api', apiRouter);

// Serve test-api.html at the root for easy access
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'postman', 'measurment-API-test', 'test-api.html'));
});

// Basic error logging (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message);
});
app.use(errorhandler());

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(`Test API Console available at http://localhost:${PORT}/test`);
});

module.exports = app;