import {
    Injectable,
    BadRequestException,
    UnauthorizedException
  } from '@nestjs/common';
  import {
    CreateUserDto
  } from './create-user.dto';
  import {
    InjectModel
  } from '@nestjs/mongoose';
  import {
    Model
  } from 'mongoose';
  import {
    HashService
  } from './hash.service';
  import {
    User,
    UserDocument
  } from './user.schema';
  
  import { ConflictException } from '@nestjs/common';

  import {
    JwtService
  } from '@nestjs/jwt';
  import { LocalStrategy } from 'src/strategy/local.strategy';

  @Injectable()
  export class UserService {
  
    constructor(@InjectModel(User.name) private userModel: Model < UserDocument > , private hashService: HashService, private jwtService: JwtService) {}
  
    async getUserByUsername(username: string) {
      return this.userModel.findOne({
          username
        })
        .exec();
    }
  
  
  
    async registerUser(createUserDto: CreateUserDto) {
      // validate DTO
  
    const createUser = new this.userModel(createUserDto);

       // check if user exists
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      throw new ConflictException("The user already exists");
    }
     // Hash Password
     createUser.password = await this.hashService.hashPassword(createUser.password);
     createUser.save();

    // const newuser = this.validate(createUser.username, createUser.password);
    // console.log(newuser)
    const payload = {
      username: createUser.username,
      sub: createUser.id
    };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
 
  }
}