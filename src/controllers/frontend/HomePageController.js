import { serverError } from '../../utils/errorHandler.js';
import { CategoryModel } from '../../models/CategoryModel.js';
import { ProductModel } from '../../models/ProductModel.js';

export const homePage = async (req, res, next) => {
  try {
    const homePageCategory = await CategoryModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $sort: {
           createdAt: 1
        },
      },
      {
        $limit:3  
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
        },
      },
    ]);

    if (!homePageCategory || homePageCategory === 0) {
      res.status(422).json({
        success: false,
        message: 'Category not found',
        data: homePageCategory,
      });
    }

    const homePageProduct = await ProductModel.aggregate([
      {
        $match: {
          featured: true,
          deletedAt: null,
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          _id: 1,
          deletedAt:1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message:'success',
      data:{category:homePageCategory, featured:homePageProduct}

    });
  } catch (err) {
    return next(serverError(err));
  }
};
