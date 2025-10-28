const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const {verifyToken} = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware de GraphQL con autenticación
router.use(
    '/',
    verifyToken,
    graphqlHTTP((req) => ({
        schema: schema,
        graphiql: true,
        context: {
            user: req.user
        },
        customFormatErrorFn: (error) => ({
            message: error.message,
            locations: error.locations,
            path: error.path,
        })
    }))
);

module.exports = router;