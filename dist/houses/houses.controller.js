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
exports.HousesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const housedto_dto_1 = require("../housesDTO/housedto.dto");
const houses_service_1 = require("./houses.service");
const decorators_1 = require("@nestjs/common/decorators");
let HousesController = class HousesController {
    constructor(HouseService) {
        this.HouseService = HouseService;
    }
    findAllHouses() {
        return this.HouseService.findAllHouses();
    }
    findOne(id) {
        return this.HouseService.findOne(id);
    }
    update(HouseDTO, id) {
        return this.HouseService.update(id, HouseDTO);
    }
    uploadData(HouseDTO, file) {
        console.log(file);
        if (!file) {
            throw new common_1.BadRequestException("File is not appropriate");
        }
        else {
            const picturePathURL = `http://localhost:3000/Houses/viewImage/${file.filename}`;
            this.HouseService.create(HouseDTO, picturePathURL);
        }
    }
    async viewTheFile(filename, res) {
        return await res.sendFile(filename, { root: './uploads' });
    }
    delete(id) {
        return this.HouseService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "findAllHouses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [housedto_dto_1.HouseDTO, Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
                cb(null, newFileName);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [housedto_dto_1.HouseDTO, Object]),
    __metadata("design:returntype", void 0)
], HousesController.prototype, "uploadData", null);
__decorate([
    (0, common_1.Get)('viewImage/:filename'),
    __param(0, (0, decorators_1.Param)('filename')),
    __param(1, (0, decorators_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "viewTheFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorators_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HousesController.prototype, "delete", null);
HousesController = __decorate([
    (0, common_1.Controller)('houses'),
    __metadata("design:paramtypes", [houses_service_1.HousesService])
], HousesController);
exports.HousesController = HousesController;
//# sourceMappingURL=houses.controller.js.map