import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import UserEntity from '../entities/User';

@ValidatorConstraint({ name: 'isAvailableEmail', async: true })
export default class IsAvailableEmailCustomer implements ValidatorConstraintInterface {
  async validate(value: string): Promise<boolean> {
    const count = await UserEntity.count({ where: { email: value } });
    return count < 1;
  }

  defaultMessage(): string {
    return 'This email is already been used';
  }
}
