import mongoose from 'mongoose';
import { ProductModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';
import { BrandModel } from '../../models/BrandModel.js';
import { CategoryModel } from '../../models/CategoryModel.js';

export const singleProductPage = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const singleProductPage = (await ProductModel.aggregate([
      {
        $match: {
         _id: new mongoose.Types.ObjectId(productId),
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: CategoryModel.modelName,
          localField: 'category',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                deletedAt: null,
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: 'category',
        },
      },
      {
        $unwind:{
          path:'$category',
          preserveNullAndEmptyArrays:true
        },
      },
      {
        $lookup: {
          from: BrandModel.modelName,
          localField: 'brand',
          foreignField: '_id',
          pipeline: [
            {
              $match: {
                deletedAt: null,
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: 'brand',
        },
      },
      {
        $unwind:{
          path:'$brand',
          preserveNullAndEmptyArrays:true
        },
      },
      {
        $project: {
          name: 1,
          _id: 1,
          image: 1,
          price:1,
          description:1,
          brand:1,
          category:1
        },
      },
    ])).at(0);

    if (!singleProductPage || singleProductPage === 0) {
      res.status(422).json({
        success: false,
        message: 'Products not found',
        data: singleProductPage,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'success',
      data: singleProductPage,
    });
  } catch (err) {
    return next(serverError(err));
  }
};
