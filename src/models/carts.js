import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const cartSchema =mongoose.Schema({
    products:{
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                }
            }
        ]
    }
    
})

export default mongoose.model("Cart",cartSchema)