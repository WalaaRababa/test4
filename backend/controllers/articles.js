const pool = require("../models/db");

const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const author_id = req.token.userId;
  const query = `INSERT INTO articles (title, description, author_id) VALUES ($1,$2,$3) RETURNING *;`;
  const data = [title, description, author_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Article created successfully",
        result: result.rows[0],
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

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles a WHERE a.is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the articles",
        result: result.rows,
        userId: req.token.userId,
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

const getArticlesByAuthor = (req, res) => {
  const author_id = req.query.author;
  const query = `SELECT * FROM articles WHERE author_id = $1 AND is_deleted=0;`;
  const data = [author_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The author: ${author_id} has no articles`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All articles for the author: ${author_id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getArticleById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT title,description,firstName,author_id FROM users INNER JOIN articles ON users.id=articles.author_id WHERE articles.id=$1 AND articles.is_deleted=0;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The article with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `The article with id: ${id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateArticleById = (req, res) => {
  const id = req.params.id;
  let { title, description } = req.body;

  const query = `UPDATE articles SET title = COALESCE($1,title), description = COALESCE($2, description) WHERE id=$3 AND is_deleted = 0  RETURNING *;`;
  const data = [title || null, description || null, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The article with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Article with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
//

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE articles SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The article with id: ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Article with id: ${id} deleted successfully`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deleteArticlesByAuthor = (req, res) => {
  const author_id = req.params.id;
  const query = `UPDATE articles SET is_deleted=1 WHERE author_id=$1 ;`;
  const data = [author_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The author: ${author_id} has no articles`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Articles with author: ${author_id} deleted successfully`,
        });
      }
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
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
