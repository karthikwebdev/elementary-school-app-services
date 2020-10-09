const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const arrayUniquePlugin = require('mongoose-unique-array');

const visitersSchema = new Schema({
    date:{
        type:String,
        required:true,
        unique:true
    },
    visiters:[{
        parentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Parent',
            unique:true
        },
        timeStamp:{
            type:Date,
        }
    }]
})

visitersSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model('Visiter',visitersSchema)