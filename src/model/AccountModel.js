import '../db/db.js'
import mongoose from "mongoose";
import COLLECTION from '../db/collection.js';

const AccountSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    verify_email:{type:Boolean,default:false}
});


const AccountModel = mongoose.model(COLLECTION.account,AccountSchema)
// const AccountCart = mongoose.model(COLLECTION.cart,)

export default AccountModel;