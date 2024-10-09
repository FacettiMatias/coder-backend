import mongoose from "mongoose";
import  mongoosePaginate  from 'mongoose-paginate-v2';

const ProductSchema =mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true, 
        index:true
    },
    price:{
        type:Number,
        required:true,
        index:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        index:true
    }
})
ProductSchema.plugin(mongoosePaginate);
export default mongoose.model("Product",ProductSchema)