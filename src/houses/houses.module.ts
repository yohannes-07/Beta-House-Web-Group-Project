import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from 'src/houseScheema/housescheema.scheema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'House', schema: HouseSchema}])],
  providers: [HousesService],
  controllers: [HousesController]
})
export class HousesModule {}
