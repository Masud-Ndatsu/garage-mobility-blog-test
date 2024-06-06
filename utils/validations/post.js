const Joi = require("joi");

const validateCreatePostSchema = (postReq) => {
     const createPostSchema = Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
          author: Joi.string().required(),
     });

     return createPostSchema.validate(postReq);
};

const validateUpdatePostSchema = (postReq) => {
     const updatePostSchema = Joi.object({
          title: Joi.string().optional(),
          content: Joi.string().optional(),
     });

     return updatePostSchema.validate(postReq);
};

module.exports = {
     validateCreatePostSchema,
     validateUpdatePostSchema,
};
