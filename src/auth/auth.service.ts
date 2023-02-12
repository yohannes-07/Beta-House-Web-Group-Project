import {
    UserService
  } from 'src/users/users.service';
  import {
    Injectable
  } from '@nestjs/common';
  import {
    JwtService
  } from '@nestjs/jwt';
  import {
    HashService
  } from 'src/users/hash.service';
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService,
      private hashService: HashService,
      private jwtService: JwtService) {}
  
    async validateUser(username: string, pass: string): Promise < any > {
      const user = await this.userService.getUserByUsername(username);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
        
      }
      return null;
    }
  
    
    async login(user: any) {
      const payload = {
        username: user.username,
        sub: user.id  
      };
      
      console.log({access_token: this.jwtService.sign(payload)})
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
  