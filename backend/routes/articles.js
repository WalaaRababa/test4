const express = require("express");
const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const articlesRouter = express.Router();

articlesRouter.get("/", authentication, getAllArticles);
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2/:id", getArticleById);

articlesRouter.post(
  "/",
  authentication,
  authorization("CREATE_ARTICLE"),
  createNewArticle
);
articlesRouter.put("/:id", updateArticleById);

articlesRouter.delete("/:id/author", deleteArticlesByAuthor);
articlesRouter.delete("/:id", deleteArticleById);

module.exports = articlesRouter;
