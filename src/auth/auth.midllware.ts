import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { StatusCodes } from '../common/constants';
import {
  CustomErrors,
  errorMessages,
  errorNames,
} from '../common/errors.object';

export const authCheckMiddlware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      throw new CustomErrors(
        errorNames.NFE,
        StatusCodes.invalidToken,
        errorMessages.emptyToken
      );
    if (!JWT_SECRET_KEY)
      throw new CustomErrors(
        errorNames.NFE,
        StatusCodes.notFound,
        errorMessages.errorToken
      );
    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err)
        throw new CustomErrors(
          errorNames.VE,
          StatusCodes.invalidToken,
          errorMessages.invalidToken
        );

      next();
    });
  } catch (err) {
    next(err);
  }
};
