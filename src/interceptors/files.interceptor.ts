import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import multer, { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import util from 'util';
import fs from 'fs';
import stream from 'stream';
import { USE_FASTIFY } from 'src/common/config';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    if (USE_FASTIFY === 'true') await this.catchFastify(context);
    else await this.catchExpress(context);
    return next.handle();
  }

  private catchExpress(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    return new Promise<void>((resolve, reject) => {
      this.upload.single('file')(req, res, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  private async catchFastify(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    await req.multipart(this.handler, (err: Error) => {
      if (err) throw new Error('Error during downloading');
    });
  }
  private async handler(
    field: string,
    file: any,
    filename: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(`src/routes/files/db/${filename}`);
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }

  private upload = multer({
    storage: diskStorage({
      destination: './src/routes/files/db/',
      filename: (req, file, cd) => {
        cd(null, file.originalname);
      },
    }),
  });
}
