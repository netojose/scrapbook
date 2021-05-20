import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { IContextType } from '../utils/interfaces';
import UserEntity from '../entities/User';

const { JWT_SECRET } = process.env;

type JwtTokenType = string | object; // eslint-disable-line @typescript-eslint/ban-types

export default async ({ req }: ExpressContext): Promise<IContextType> => {
  // Skipping playground introspection query
  if (req.body.operationName === 'IntrospectionQuery') {
    return null;
  }

  const token = req.headers.authorization || null;
  let userId: number;
  let user: UserEntity;

  if (token) {
    const decoded: JwtTokenType = jwt.verify(token.replace(/^Bearer\s/, ''), JWT_SECRET);
    userId = get(decoded, 'data.id');
  }

  if (userId) {
    user = await UserEntity.findByPk(userId);
  }

  return { token, user };
};
