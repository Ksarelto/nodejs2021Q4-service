import { Injectable, StreamableFile } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class FilesService {
  async find(name: string) {
    const readStream = fs.createReadStream(`./src/routes/files/db/${name}`);
    return new StreamableFile(readStream);
  }
}
