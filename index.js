const express = require('express');
const app = express();

const requestLogger = require('./middleware/logger');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');

app.use(express.json());
app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1>LMS API</h1>');
});

app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
