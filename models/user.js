import mongoose, {Schema} from "mongoose";
//import bcrypt from "bcrypt-nodejs";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import config from "../config/index";
import jwt from "jsonwebtoken";


const userScheme = new Schema({
    email: {type:String, unique: true},
    login: {type:String, unique: true, lowercase: true, index: {unique: true}},
    password: {type:String},
    token: {type:String},
})

userScheme.pre('save', async function(next) {
    var user = this;

    if(!user.isModified('password'))
        return next();

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
            });
        });

        user.token = jwt.sign({ _id:user._id},config.secretKey);
    
})

userScheme.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userScheme)