import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

/**
 * Blog Schema
 */
const BlogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BlogSchema.method({
});

/**
 * Statics
 */
BlogSchema.statics = {
  /**
   * Get blog
   * @param {ObjectId} id - The objectId of blog.
   * @returns {Promise<Blog, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('author', 'name')
      .exec()
      .then((blog) => {
        if (blog) {
          return blog;
        }
        const err = new APIError('No blog exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List blogs in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of blogs to be skipped.
   * @param {number} limit - Limit number of blogs to be returned.
   * @returns {Promise<Blog[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Blog
 */
export default mongoose.model('Blog', BlogSchema);
