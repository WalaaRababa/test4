const pool = require("../models/db");

const createNewComment = (req, res) => {
  const article_id = req.params.id;
  const commenter_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, article_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter_id, article_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getCommentsByArticleId = (req, res) => {
  const article_id = req.params.id;
  const query = `SELECT c.comment,c.article_id,u.firstName, c.commenter_id, c.created_at FROM comments c JOIN users u ON u.id=c.commenter_id WHERE c.article_id=$1 AND c.is_deleted=0;`;
  const data = [article_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for article: ${article_id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createNewComment,
  getCommentsByArticleId,
};
