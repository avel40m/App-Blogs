const mongoose = require('mongoose');
const { Schema, model } = mongoose;

UserSchema = new Schema({
    username: {type:String,unique:true,required:true,min:4},
    password: {type:String,required:true}
});

const UserModel = model('User',UserSchema);

module.exports = UserModel;