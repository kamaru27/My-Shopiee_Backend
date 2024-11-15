import { CategoryModel } from '../../models/CategoryModel.js';
import { serverError } from '../../utils/errorHandler.js';

export const categoryPage = async (req, res, next) => {
  try {
    const categoryPage = await CategoryModel.aggregate([
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
        $project: {
          name: 1,
          _id: 1,
          image: 1,
        },
      },
    ]);

    if (!categoryPage || categoryPage === 0) {
      res.status(422).json({
        success: false,
        message: 'Category not found',
        data: categoryPage,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'success',
      data: categoryPage,
    });
  } catch (err) {
    return next(serverError(err));
  }
};
