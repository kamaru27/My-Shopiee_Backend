import { ProductModel } from '../../models/ProductModel.js';
import { CategoryModel } from '../../models/CategoryModel.js';
import { serverError } from '../../utils/errorHandler.js';


export const featuredProducts = async (req, res, next) => {
    try {
      const products = await ProductModel.aggregate([
        {
          $match: {
            featured:true,
            deletedAt: null,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            image:1,
            featured: 1,
          },
        },
      ]);
      return res.status(200).json({
        success: true,
        message: 'Products successfully',
        data: { products: products },
      });
    } catch (error) {
      return next(serverError(error));
    }
  };

export const categories = async (req, res, next) => {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $match: {
            deletedAt: null,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit:7,
        },
        {
          $project: {
            _id: 1,
            name: 1,
            image:1,
          },
        },
      ]);
      return res.status(200).json({
        success: true,
        message: 'Categories successfully',
        data: { categories: categories },
      });
    } catch (error) {
      return next(serverError(error));
    }
  };