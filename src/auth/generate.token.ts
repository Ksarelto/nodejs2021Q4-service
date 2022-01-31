import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { StatusCodes } from '../common/constants';
import {
  CustomErrors,
  errorMessages,
  errorNames,
} from '../common/errors.object';
import { IPayload } from '../common/types';

export const generateToken = (payload: IPayload) => {
  if (JWT_SECRET_KEY) {
    return { token: jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' }) };
  }

  throw new CustomErrors(
    errorNames.NFE,
    StatusCodes.notFound,
    errorMessages.errorToken
  );
};
