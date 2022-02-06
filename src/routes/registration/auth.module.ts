import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET_KEY } from 'src/common/config';
import { Authentification } from './auth.repository';
import { AuthentificationController } from './auth.controller';
import { AuthentificationService } from './auth.service';

@Module({
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
  imports: [
    TypeOrmModule.forFeature([Authentification]),
    JwtModule.register({
      secret: JWT_SECRET_KEY || 'secret-key',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
