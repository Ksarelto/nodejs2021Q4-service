import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { EntUser } from '../typeorm/entities/user.entity';
import { defaultAdmin } from '../common/constants';

export const createAdmin = async () => {
  const admin = await getRepository(EntUser).findOne({ login: 'admin' });
  if (!admin) {
    const newAdmin = {
      ...defaultAdmin,
      password: bcrypt.hashSync(defaultAdmin.password, 7),
    };
    await getRepository(EntUser).save(newAdmin);
  }
};
