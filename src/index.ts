import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { connect } from './utils/db/mongo';
import { auth } from './utils/auth';
import { schema } from './Schema/Schema';

// Connect to Mongo
connect();

const { PORT } = process.env;

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const token = req.headers.token;
    const refreshToken = req.headers.refreshtoken;
    const user = await auth.initializeUser(token, refreshToken, res);
    return {
      user,
      req,
      res
    }
  },
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});