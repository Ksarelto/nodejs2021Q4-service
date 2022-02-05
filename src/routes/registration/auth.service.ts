import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { passwordStrength } from 'src/common/constants';
import { errMess } from 'src/exeptions/errors.object';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { Authentification } from './auth.repository';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthentificationService {
  constructor(
    private authRepository: Authentification,
    private jwtService: JwtService,
  ) {}

  async checkRegistration(body: LoginUserDto) {
    const { login, password } = body;
    const searchedUser = await this.authRepository.getUser(login);
    const validatePassword = bcrypt.compareSync(
      password,
      searchedUser.password,
    );
    if (!validatePassword)
      throw new HttpException(errMess.invalidPass, HttpStatus.FORBIDDEN);
    return { token: this.generateToken(searchedUser) };
  }

  async registrUser(body: CreateUserDto) {
    const userExist = await this.authRepository.getOneUser(body.login);
    if (userExist)
      throw new HttpException(errMess.existUser, HttpStatus.BAD_REQUEST);
    const hashPassword = bcrypt.hashSync(body.password, passwordStrength);
    const newUser = { ...body, password: hashPassword };
    const savedUser = await this.authRepository.addUser(newUser);
    const token = this.generateToken(savedUser);
    return { ...savedUser, token };
  }

  private generateToken(user: ResponseUserDto) {
    const payload = { id: user.id, login: user.login };
    return this.jwtService.sign(payload);
  }
}
