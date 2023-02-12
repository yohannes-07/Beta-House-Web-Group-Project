// import { Controller } from '@nestjs/common';

// @Controller('houses')
// export class HousesController {}




import {Controller,Get,Post,UseInterceptors,Put,Delete,Patch,Body,BadRequestException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { HouseDTO } from 'src/housesDTO/housedto.dto';
import { HousesService } from './houses.service';
import { House } from 'src/houseInterface/houseinterface.interface';
import { Param, Res, UploadedFile } from '@nestjs/common/decorators';
import { Response } from 'express';



@Controller('houses')
export class HousesController {
  constructor(private readonly HouseService: HousesService) {}
    
    @Get()
    findAllHouses(): Promise<House[]>{
      return this.HouseService.findAllHouses()
    }


    @Get(':id')
    findOne(@Param('id') id): Promise<House> {
      return this.HouseService.findOne(id);
    }

    @Patch(':id')
    update(@Body() HouseDTO:HouseDTO ,@Param('id') id):Promise<House>{
        return this.HouseService.update(id,HouseDTO)
    }

    @Post('create')
   
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination:"./uploads",
            filename:(req,file,cb) => {
                const name = file.originalname.split('.')[0]
                const fileExtension = file.originalname.split('.')[1]
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension

                cb(null, newFileName)
            }
        })
    }))

    uploadData( @Body() HouseDTO:HouseDTO ,@UploadedFile('file') file:Express.Multer.File){
        console.log(file)
        if (!file){
            throw new BadRequestException("File is not appropriate")
        } else {

            const picturePathURL = `http://localhost:3000/Houses/viewImage/${file.filename}`
            this.HouseService.create(HouseDTO,picturePathURL)
        }
    }
    @Get('viewImage/:filename')
    async viewTheFile(@Param('filename') filename, @Res() res:Response): Promise<void> {
        return await res.sendFile(filename,{root: './uploads'})
    } 
    
    

    @Delete(':id')
    delete(@Param('id') id): Promise<House> {
      return this.HouseService.delete(id);
    }

    
}
