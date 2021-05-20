import { AuthChecker } from 'type-graphql';

import { IContextType } from './interfaces';

const authChecker: AuthChecker<IContextType> = async ({ context: { user } }) => {
  if (!user) {
    return false;
  }

  return true;
};

export default authChecker;
