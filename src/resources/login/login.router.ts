import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from '../../common/constants';
import { checkRegistration } from './login.service';

export const loginRouter = Router();

loginRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;
      const token = await checkRegistration(body);
      res.status(StatusCodes.successCode).json(token);
    } catch (err) {
      next(err);
    }
  }
);
