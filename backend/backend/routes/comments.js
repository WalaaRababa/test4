const express = require("express");

//controllers
const { createNewComment, getCommentsByArticleId } = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post(
  "/:id",
  authentication,
  authorization("CREATE_COMMENT"),
  createNewComment
);
commentsRouter.get("/:id", getCommentsByArticleId);

module.exports = commentsRouter;
