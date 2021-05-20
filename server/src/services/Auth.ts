import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import randomString from 'randomstring';
import { Op } from 'sequelize';

import UserEntity from '../entities/User';
import NotificationService from '../services/Notification';
import PasswordResetEntity from '../entities/PasswordReset';
import encryptPassword from '../utils/encryptPassword';

@Service()
export default class Auth {
  constructor(private readonly notificationService: NotificationService) {}

  async getUserByCredentials(email: string, password: string): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { email } });

    if (user === null) {
      return null;
    }

    const isPassCorrect = await compare(password, user.password);

    if (!isPassCorrect) {
      return null;
    }

    return user;
  }

  async requestResetPassword(email: string): Promise<void> {
    const user = await UserEntity.findOne({ where: { email } });
    if (!user) {
      return;
    }

    const token = randomString.generate({ length: 100, charset: 'alphanumeric' });
    await PasswordResetEntity.create({ userId: user.id, token });
    const { APP_URL } = process.env;
    const message = `
        <p>Hi!, you asked for a new password?</p>
        <p>So, <a href="${APP_URL}/define-password/${token}">click here to create a new one</a>.</p>
        <p><strong>Warning:</strong> This link will expire in 1 hour (but you will can request new links)</p>
    `;
    await this.notificationService.sendEmail(user.email, 'Creatopy test password reset', message);
  }

  async definePassword(token: string, password: string): Promise<boolean> {
    const ONE_HOUR = 60 * 60 * 1000;
    const curDate = new Date();
    const minDate = curDate.setTime(curDate.getTime() - ONE_HOUR);

    // Removing old invalid tokens
    await PasswordResetEntity.destroy({ where: { createdAt: { [Op.lt]: minDate } } });

    const reset = await PasswordResetEntity.findOne({ where: { token, createdAt: { [Op.gt]: minDate } } });
    if (!reset) {
      return false;
    }

    const newPassword = await encryptPassword(password);
    await UserEntity.update({ password: newPassword }, { where: { id: reset.userId } });
    await reset.destroy();

    return true;
  }

  generateUserJWT(user: UserEntity): string {
    const { JWT_SECRET } = process.env;
    return sign({ data: { id: user.id } }, JWT_SECRET, { expiresIn: '365 days' });
  }
}
