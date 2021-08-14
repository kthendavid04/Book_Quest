//const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// added Apollo server
//const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./Schema');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 8080;
//app.set("port", PORT);
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// });

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const schema = ({typeDefs, resolvers}) ;


  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };


//   apolloServer.applyMiddleware({
//     app,
//     cors: false
//   });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

// db.once('open', () => {
//   app.listen(PORT, () => 
//   console.log(`🌍 Now listening on localhost:${PORT}`));
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// });
