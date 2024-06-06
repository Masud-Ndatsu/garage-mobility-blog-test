const { Schema, model } = require("mongoose");

const schema = new Schema(
     {
          title: {
               type: String,
               required: true,
          },
          content: {
               type: String,
               required: true,
          },
          author: {
               type: String,
          },
     },
     { timestamps: true }
);

const PostsModel = model("posts", schema);

module.exports = PostsModel;
