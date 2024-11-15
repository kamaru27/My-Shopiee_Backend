import mongoose from 'mongoose';
import { ProductModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';

export const productsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const productsPage = await ProductModel.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
          deletedAt: null,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          name: 1,
          _id: 1,
          image: 1,
          price:1
        },
      },
    ]);

    if (!productsPage || productsPage === 0) {
      res.status(422).json({
        success: false,
        message: 'Products not found',
        data: productsPage,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'success',
      data: productsPage,
    });
  } catch (err) {
    return next(serverError(err));
  }
};
