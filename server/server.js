const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// added Apollo server
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./Schema');
const { authMiddleware } = require('./utils/auth');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
app.set("port", PORT);

async function wait(){
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
  await server.start();
}

wait.applyserver.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => 
  console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
