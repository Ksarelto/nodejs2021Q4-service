import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { EntUser } from '../../typeorm/entities/user.entity';
import {
  CustomErrors,
  errorMessages,
  errorNames,
} from '../../common/errors.object';
import { StatusCodes } from '../../common/constants';
import { ILoginBody } from '../../common/types';
import { generateToken } from '../../auth/access.token';

export const checkRegistration = async (body: ILoginBody) => {
  const { login, password } = body;
  const searchedUser = await getRepository(EntUser).findOneOrFail({
    login,
  });
  const validatePassword = bcrypt.compareSync(password, searchedUser.password);
  if (!validatePassword)
    throw new CustomErrors(
      errorNames.VE,
      StatusCodes.invalidPassword,
      errorMessages.invalidPass
    );
  return generateToken({ id: searchedUser.id, login: searchedUser.login });
};
