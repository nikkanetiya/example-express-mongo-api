import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/blogs
  createBlog: {
    body: {
      authorId: Joi.string().hex().required(),
      title: Joi.string().required(),
      description: Joi.string().required()
    }
  },

  // UPDATE /api/blogs/:blogId
  updateBlog: {
    body: {
      authorId: Joi.string().hex().required(),
      title: Joi.string().required(),
      description: Joi.string().required()
    },
    params: {
      blogId: Joi.string().hex().required()
    }
  },
};
