import { House } from 'src/houseInterface/houseinterface.interface';
import { Model } from 'mongoose';
import { HouseDTO } from 'src/housesDTO/housedto.dto';
export declare class HousesService {
    private readonly HouseModel;
    constructor(HouseModel: Model<House>);
    findAllHouses(): Promise<House[]>;
    findOne(id: string): Promise<House>;
    delete(id: string): Promise<House>;
    update(id: string, House: House): Promise<House>;
    create(HouseDTO: HouseDTO, picturePathURL: string): Promise<House>;
}
