import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { defaultAdmin, passwordStrength } from './constants';
import { EntUser } from 'src/routes/users/entities/user.entity';

export const createAdmin = async () => {
  const admin = await getRepository(EntUser).findOne({
    login: defaultAdmin.login,
  });
  if (!admin) {
    const newAdmin = {
      ...defaultAdmin,
      password: bcrypt.hashSync(defaultAdmin.password, passwordStrength),
    };
    await getRepository(EntUser).save(newAdmin);
  }
};
