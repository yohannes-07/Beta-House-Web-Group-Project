"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hash_service_1 = require("./hash.service");
const user_schema_1 = require("./user.schema");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, hashService, jwtService) {
        this.userModel = userModel;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    async getUserByUsername(username) {
        return this.userModel.findOne({
            username
        })
            .exec();
    }
    async registerUser(createUserDto) {
        const createUser = new this.userModel(createUserDto);
        const user = await this.getUserByUsername(createUser.username);
        if (user) {
            throw new common_2.ConflictException("The user already exists");
        }
        createUser.password = await this.hashService.hashPassword(createUser.password);
        createUser.save();
        const payload = {
            username: createUser.username,
            sub: createUser.id
        };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, hash_service_1.HashService, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map