import stripePackage from 'stripe';
import { OrderModel } from '../../models/OrderModel.js';
import { ProductModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';
import env from '../../env.js';

export const orderDetails = async (req, res, next) => {
  try {
    const stripe = stripePackage(env.STRIPE_SECRET_KEY);
    // const { userId } = req.params;
    const {userId} = req.user;

    console.log('first',req.user.adminId);

    const { billingDetails, cartItems } = req.body;
    
    const shippingCost = 30;
    
    if (!cartItems) {
      return res.status(201).json({
        success: false,
        message: 'Cart is empty',
      });
    }
    
    const productIds = cartItems.map((item) => item.id);
    
    const matchedProducts = [];
    
  
    for (const productId of productIds) {
      const products = await ProductModel.find({ _id: productId }).lean();
      matchedProducts.push(...products);
    }

    if (matchedProducts.length !== cartItems.length) {
      return res.status(201).json({
        success: false,
        message: 'All product not found',
      });
    }

    let total = 0;

     cartItems.map((cartItem) => {
      const price = matchedProducts.find(
        (item) => item._id.toString() === cartItem.id.toString()
      )?.price;
      total = total + cartItem.quantity * price;

      // return {
      //   productId: cartItem.productId,
      //   quantity: cartItem.quantity,
      //   price: cartItem.price,
      // };
    });

    const grandTotal = total + shippingCost;

    const items = [];

    cartItems.map((cartItem) => {
      items.push({
        productId: cartItem.id,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });
    });

    const order = await OrderModel.create({
      userId: userId,
      items: items,
      total: total,
      shippingCost: shippingCost,
      grandTotal: grandTotal,
      billingDetails: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        email: billingDetails.email,
        address: billingDetails.address,
        phoneNumber: billingDetails.phoneNumber,
        country: billingDetails.country,
        zipCode: billingDetails.zipCode,
      },
      deletedAt: null,
    });

    const customer = await stripe.customers.create({
      name: `${billingDetails.firstName} ${billingDetails.lastName}`,
      address: {
        country: billingDetails.country,
        postal_code: billingDetails.zinCode,
        line1: billingDetails.address,
      },
      email: billingDetails.email,
      phone: billingDetails.phoneNumber,
    });

console.log('first',customer);

    const paymentIntents = await stripe.paymentIntents.create({
      amount: grandTotal * 100,
      currency: 'inr',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { orderId: order._id.toString() },
      shipping: {
        name: `${billingDetails.firstName} ${billingDetails.lastName}`,
        address: {
          country: billingDetails.country,
          postal_code: billingDetails.zinCode,
          line1: billingDetails.address,
        },
      },
      receipt_email: billingDetails.email,
    });

    console.log('first',paymentIntents);


    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: {
        amount: grandTotal,
        total: total,
        shippingCost: shippingCost,
        orderId: order._id,
        sessionId: paymentIntents.client_secret,
        
      },
    });
  } catch (error) {
    return next(serverError(error));
  }
};
