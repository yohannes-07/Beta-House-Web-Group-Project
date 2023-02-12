// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class HousesService {}



import { Injectable } from '@nestjs/common';
import { House } from 'src/houseInterface/houseinterface.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HouseDTO
 } from 'src/housesDTO/housedto.dto';
@Injectable()
export class HousesService {
    constructor(@InjectModel('House') private readonly HouseModel: Model<House>) {}
    
    async findAllHouses(): Promise<House[]>{
      return await this.HouseModel.find()
    }
  
    async findOne(id: string): Promise<House> {
      return await this.HouseModel.findOne({ _id: id });
    }
    
    
    
    async delete(id: string): Promise<House> {
        return await this.HouseModel.findByIdAndRemove(id);
    }
    
    async update(id: string, House: House): Promise<House> {
        return await this.HouseModel.findByIdAndUpdate(id, House, { new: true });
    }

    async create(HouseDTO: HouseDTO, picturePathURL:string): Promise<House> {
      const newData = new this.HouseModel(HouseDTO)
      newData.picturePath = picturePathURL
      return await newData.save()
    }
}
