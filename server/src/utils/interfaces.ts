import UserEntity from '../entities/User';

export interface IContextType {
  token: string | null;
  user: UserEntity;
}
