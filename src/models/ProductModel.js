import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    brand:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    deletedAt:{
        type:Date,
        required:false
    },
    featured:{
        type:Boolean,
        required:true,
        default:false
    }
},
{timestamps:true},
);

export const ProductModel = mongoose.model('products',productSchema);
