import { CreateUserDto } from './create-user.dto';
import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
