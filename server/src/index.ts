import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { Container as container } from 'typedi';

import connect from './utils/connection';
import authChecker from './utils/authChecker';
import fillContext from './utils/fillContext';

(async (): Promise<void> => {
  await connect();

  const schema: GraphQLSchema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/*.{ts,js}`],
    authChecker,
    container
  });

  const { SERVER_PORT } = process.env;

  const apolloServer = new ApolloServer({
    schema,
    context: fillContext
  });

  const app = express();

  apolloServer.applyMiddleware({ app });
  app.listen(SERVER_PORT);
  console.log(`🚀  Server ready at http://localhost:${SERVER_PORT}`);
})();
