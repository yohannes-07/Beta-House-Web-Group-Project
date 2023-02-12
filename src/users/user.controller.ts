import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards, 
    Request
  } from '@nestjs/common';
 
  import {
    CreateUserDto
  } from './create-user.dto';
  import {
    AuthGuard
  } from '@nestjs/passport';

  import { UserService } from './users.service';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    registerUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.registerUser(createUserDto);
    }
  }