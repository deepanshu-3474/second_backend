import '../db/db.js'
import mongoose from "mongoose";
import COLLECTION from '../db/collection.js';

const AccountSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Name is Required"]},
    email:{type:String,unique:true},
    password:{type:String}
});
const CartSchema = new mongoose.Schema({
    product:{type:String,required:[true,"Product Name is required"]}
})


const AccountModel = mongoose.model(COLLECTION.cart,AccountSchema)
const AccountCart = mongoose.model(COLLECTION.cart,)

export default AccountModel;