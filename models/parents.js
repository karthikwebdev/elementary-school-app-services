const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:64,
        trim:true,
    },
    grade:{
        type:String,
        required:true,
        maxlength:64,
        trim:true,
    }
},{timestamps:true});

module.exports = mongoose.model('Parent',parentSchema)