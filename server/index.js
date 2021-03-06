const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
const template = require('./template');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 6000*24*60
   },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
}));

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send(template({activeUser: req.session.username || ''}))
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/graphql', (req, res) => graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  context: {req}
})(req, res));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app is up on port ${port}`)
});
