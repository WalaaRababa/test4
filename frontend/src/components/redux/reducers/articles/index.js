import { createSlice } from "@reduxjs/toolkit";

export const articles = createSlice({
  name: "articles",
  initialState: {
    articles: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    updateArticleById: (state, action) => {
      state.articles = state.articles.map((article, index) => {
        if (action.payload.id == article.id) {
          return action.payload;
        }
        return article;
      });
    },
    deleteArticleById: (state, action) => {
      state.articles = state.articles.filter((article, index) => {
        return article.id != action.payload;
      });
    },
    handleCommentByArticleId:(state,action)=>
    {
    
      state.articles=state.articles.map((article,index)=>
      {
        if (article.id == action.payload.id) {
          article.comments?article.comments.push(...action.payload.comments):(article.comments = action.payload.comments);
           }
           return article;
      })
    }
  },
});

export const { setArticles, addArticle, updateArticleById, deleteArticleById,handleCommentByArticleId } =
  articles.actions;

export default articles.reducer;
