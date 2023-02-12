"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseSchema = void 0;
const mongoose = require("mongoose");
exports.HouseSchema = new mongoose.Schema({
    name: String,
    picturePath: String,
    price: String,
    bedroom: String,
    salon: String,
    bathroom: String,
});
//# sourceMappingURL=housescheema.scheema.js.map