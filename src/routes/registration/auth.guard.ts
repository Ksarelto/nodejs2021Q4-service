import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { JWT_SECRET_KEY } from 'src/common/config';
import { errMess } from 'src/exeptions/errors.object';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getTokenFromHeader(context);
    jwt.verify(token, JWT_SECRET_KEY || 'secret-key', (err) => {
      if (err)
        throw new HttpException(errMess.invalidToken, HttpStatus.UNAUTHORIZED);
    });
    return true;
  }
  private getTokenFromHeader(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tokenHeader = req.headers.authorization?.split(' ');
    if (!tokenHeader)
      throw new HttpException(errMess.emptyToken, HttpStatus.UNAUTHORIZED);
    const [bearer, token] = tokenHeader as string[];
    if (bearer !== 'Bearer' || !token)
      throw new HttpException(errMess.emptyToken, HttpStatus.UNAUTHORIZED);
    if (!JWT_SECRET_KEY)
      throw new HttpException(errMess.errorToken, HttpStatus.NOT_FOUND);
    return token;
  }
}
