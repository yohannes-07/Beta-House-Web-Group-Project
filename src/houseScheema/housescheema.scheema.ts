import * as mongoose from 'mongoose';

export const HouseSchema = new mongoose.Schema({
  name:String,
  picturePath:String,
  price: String,
  bedroom: String,
  salon:String,
  bathroom: String,
});

