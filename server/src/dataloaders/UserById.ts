import DataLoader from 'dataloader';

import UserEntity from '../entities/User';

const batchUsers = async (ids: number[]) => {
  return await UserEntity.findAll({ where: { id: ids } });
};

export default new DataLoader(batchUsers);
