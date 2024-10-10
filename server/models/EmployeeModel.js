const mongoose = require("mongoose");
const schema = mongoose.Schema({
    EmployeeID:{type:Number,unique:true,required:true},
    Name:{type:String,required:true},
    Description:{type:String,required:true},
    Position:{type:String,required:true},
    Salary:{type:String,required:true},
})
module.exports = mongoose.model("Employee",schema);
