import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import blogCtrl from '../controllers/blog.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/blogs - Get list of blogs */
  .get(blogCtrl.list)

  /** POST /api/blogs - Create new blog */
  .post(validate(paramValidation.createBlog), blogCtrl.create);

router.route('/:blogId')
  /** GET /api/blogs/:blogId - Get blog */
  .get(blogCtrl.get)

  /** PUT /api/blogs/:blogId - Update blog */
  .put(validate(paramValidation.updateBlog), blogCtrl.update)

  /** DELETE /api/blogs/:blogId - Delete blog */
  .delete(blogCtrl.remove);

/** Load blog when API with blogId route parameter is hit */
router.param('blogId', blogCtrl.load);

export default router;
