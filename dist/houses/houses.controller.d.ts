/// <reference types="multer" />
import { HouseDTO } from 'src/housesDTO/housedto.dto';
import { HousesService } from './houses.service';
import { House } from 'src/houseInterface/houseinterface.interface';
import { Response } from 'express';
export declare class HousesController {
    private readonly HouseService;
    constructor(HouseService: HousesService);
    findAllHouses(): Promise<House[]>;
    findOne(id: any): Promise<House>;
    update(HouseDTO: HouseDTO, id: any): Promise<House>;
    uploadData(HouseDTO: HouseDTO, file: Express.Multer.File): void;
    viewTheFile(filename: any, res: Response): Promise<void>;
    delete(id: any): Promise<House>;
}
