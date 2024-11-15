import mongoose from 'mongoose';
import AutoIncrementInc from 'mongoose-sequence';
import { OrderStatusEnum } from '../enum/OrderStatusEnum.js';
const AutoIncrement = AutoIncrementInc(mongoose);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        price: {
          type: String,
          required: false,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    total:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },
    shippingCost:{
        type:Number,
        required:false
    },
    billingDetails:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        zipCode:{
            type:Number,
            required:true
        }
    },
    orderStatus:{
      type:String,
      enum:Object.values(OrderStatusEnum),
       default:OrderStatusEnum.Confirmed
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(AutoIncrement,{
    inc_field:'orderNumber',
    startAt:1
});

export const OrderModel = mongoose.model('orders', orderSchema);
