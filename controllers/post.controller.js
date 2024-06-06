const PostsModel = require("../models/post.model");
const { formatValidationErrorMessage } = require("../utils/formatter");
const {
     validateCreatePostSchema,
     validateUpdatePostSchema,
} = require("../utils/validations/post");

const createPost = async (req, res) => {
     try {
          const { error } = validateCreatePostSchema(req.body);
          console.log({ data: req.body });
          if (error) {
               return res.status(400).json({
                    status: false,
                    message: formatValidationErrorMessage(error.message),
                    data: null,
               });
          }
          const post = await PostsModel.create({
               ...req.body,
          });

          return res.status(201).json({
               status: true,
               message: "Created successfully",
               data: post,
          });
     } catch (error) {
          console.log("error[createPost]", error);

          return res.status(500).json({
               status: false,
               message: "Internal Server Error",
               data: null,
          });
     }
};

const getPosts = async (req, res) => {
     try {
          const posts = await PostsModel.find({});

          return res.status(200).json({
               status: true,
               message: "Retrieved successfully",
               data: posts,
          });
     } catch (error) {
          console.log("error[getPosts]", error);
          return res.status(500).json({
               status: false,
               message: "Internal Server Error",
               data: null,
          });
     }
};

const getPostById = async (req, res) => {
     try {
          const postId = req.params.postId;

          const post = await PostsModel.findById(postId);

          return res.status(200).json({
               status: true,
               message: "Retrieved successfully",
               data: post,
          });
     } catch (error) {
          return res.status(500).json({
               status: false,
               message: "Internal Server Error",
               data: null,
          });
     }
};

const updatePostById = async (req, res) => {
     try {
          const postId = req.params.postId;

          const { error } = validateUpdatePostSchema(req.body);

          if (error) {
               return res.status({
                    status: false,
                    message: formatValidationErrorMessage(error.message),
                    data: null,
               });
          }
          const post = await PostsModel.findById(postId);

          if (!post) {
               return res.status(404).json({
                    status: false,
                    message: "Post not found",
                    data: null,
               });
          }

          const updatedPost = await PostsModel.findOneAndUpdate(
               {
                    _id: postId,
               },
               {
                    ...req.body,
               },
               {
                    new: true,
               }
          );

          return res.status(200).json({
               status: true,
               message: "Updated successfully",
               data: updatedPost,
          });
     } catch (error) {
          console.log("error[updatePostById]", error);

          return res.status(500).json({
               status: false,
               message: "Internal Server Error",
               data: null,
          });
     }
};

const deletePostById = async (req, res) => {
     try {
          const postId = req.params.postId;

          const post = await PostsModel.findById(postId);

          if (!post) {
               return res.status(404).json({
                    status: false,
                    message: "Post not found",
                    data: null,
               });
          }

          await PostsModel.findOneAndDelete({ _id: postId });

          return res.status(204).json({
               status: true,
               message: "Deleted successfully",
               data: null,
          });
     } catch (error) {
          console.log("error[deletePostById]", error);
          return res.status(500).json({
               status: false,
               message: "Internal Server Error",
               data: null,
          });
     }
};

module.exports = {
     createPost,
     getPosts,
     getPostById,
     updatePostById,
     deletePostById,
};
