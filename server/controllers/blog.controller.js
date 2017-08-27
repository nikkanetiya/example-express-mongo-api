import Blog from '../models/blog.model';

/**
 * Load blog and append to req.
 */
function load(req, res, next, id) {
  Blog.get(id)
    .then((blog) => {
      req.blog = blog; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get blog
 * @returns {Blog}
 */
function get(req, res) {
  return res.json(req.blog);
}

/**
 * Create new blog
 * @property {authorId} req.body.authorId - The author Id of blog.
 * @property {title} req.body.title - The title of blog.
 * @property {description} req.body.description - The description of blog.
 * @returns {Blog}
 */
function create(req, res, next) {
  const blog = new Blog({
    author: req.body.authorId,
    title: req.body.title,
    description: req.body.description
  });

  blog.save()
    .then(savedBlog => res.json(savedBlog))
    .catch(e => next(e));
}

/**
 * Update existing blog
 * @property {string} req.body.title - The title of blog.
 * @property {string} req.body.description - The description of blog.
 * @returns {Blog}
 */
function update(req, res, next) {
  const blog = req.blog;
  blog.title = req.body.title;
  blog.description = req.body.description;

  blog.save()
    .then(savedBlog => res.json(savedBlog))
    .catch(e => next(e));
}

/**
 * Get blog list.
 * @property {number} req.query.skip - Number of blogs to be skipped.
 * @property {number} req.query.limit - Limit number of blogs to be returned.
 * @returns {Blog[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Blog.list({ limit, skip })
    .then(blogs => res.json(blogs))
    .catch(e => next(e));
}

/**
 * Delete blog.
 * @returns {Blog}
 */
function remove(req, res, next) {
  const blog = req.blog;
  blog.remove()
    .then(deletedBlog => res.json(deletedBlog))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
