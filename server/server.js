const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());


// connect to mlab database

mongoose.connect('mongodb://admin:admin123@ds361768.mlab.com:61768/gel-ninja');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8000, () => {
    console.log("Now listening!!! 8000 port");
})