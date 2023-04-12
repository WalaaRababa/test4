import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import moment from "moment";
import { format } from "timeago.js";


//===========================Redux====================================
import {
  updateArticleById,
  setArticles,
  deleteArticleById,
  handleCommentByArticleId
} from "../redux/reducers/articles";

import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token, articles, comments, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      articles: state.articles.articles,
      userId: state.auth.userId,
    };
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState("")
  const [show2, setShow2] = useState([])

  //===============================================================

  const getAllArticles = async () => {
    try {
      const res = await axios.get("https://project-77.onrender.com/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setArticles(res.data.result));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
//   function changeDatetimeByTimezone(dateTime, timezone) {
//     console.log(dateTime,timezone);
//     var localTime = moment.utc(dateTime, "HH:mm").tz('Africa/Khartoum').format("HH:mm");
//     var date = moment(dateTime)
//       .utcOffset('+5:00')
//       .startOf('hour').fromNow();
//       console.log(date);
//     console.log(localTime);
//     const parsedDateAsUtc = moment.utc()
//       .startOf('day') 
//       .add(dateTime.substring(0, 2), "hours")
//       .add(dateTime.substring(3, 5), "minutes");
//     return parsedDateAsUtc.clone().tz(timezone).format("hh:mm");

   
// }

  //===============================================================
  const getCommentsByArticle = async (article_id) => {
    try {
      const result = await axios.get(
        `https://project-77.onrender.com/comments/${article_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        console.log(result.data);
        // setShow2(result.data.created_at)
  const payload={comments:result.data.result,id:article_id}
 dispatch(handleCommentByArticleId(payload))
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };


  //===============================================================

  const handleUpdateClick = (article) => {
    setUpdateBox(!updateBox);
    setArticleId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    if (updateBox) updateArticle(article.id);
  };
  //===============================================================

  const updateArticle = async (id) => {
    try {
      const result = await axios.put(`https://project-77.onrender.com/articles/${id}`, {
        title,
        description,
      });
      dispatch(updateArticleById(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`https://project-77.onrender.com/articles/${id}`);
      dispatch(deleteArticleById(id));
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const createComment = async (id) => {
    try {
      const result = await axios.post(
        `https://project-77.onrender.com/comments/${id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const payload={comments:[result.data.result],id}
      dispatch(handleCommentByArticleId(payload))
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  useEffect(() => {
      getAllArticles();
  }, []);

  //===============================================================

  return (
    <>
      <br />
      {articles?.map((article, index) => (
        <div key={index} className="article">
          <div>{article.title}</div>
          <div>{article.description}</div>
          {!article.comments&& <button onClick={() => {
              getCommentsByArticle(article.id);
              setShow(article.id)
            }}
          >
          show comment
          </button>}
           {show==article.id &&<div>
            <textarea
              className="commentBox"
              placeholder="comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="commentBtn"
              onClick={() => {
                if (comment) createComment(article.id);
              }}
            >
              Add comment
            </button>
          </div>}
         <div>
            {article.comments?.map((comment, i) => {
                return (
                  <p className="comment" key={i}>
                    {format(comment.created_at)}
{                    moment(comment.created_at).format('LTS')   
}
{                    moment(comment.created_at).startOf('hour').fromNow()  
}
                </p>
                );
              
            })}
          </div>
          {article.author_id === parseInt(userId) && (
            <>
              {updateBox && articleId === article.id && (
                <form>
                  <br />
                  <input
                    type="text"
                    defaultValue={article.title}
                    placeholder="article title here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <textarea
                    placeholder="article description here"
                    defaultValue={article.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              )}
              <button
                className="delete"
                onClick={() => deleteArticle(article.id)}
              >
                X
              </button>
              <button
                className="update"
                onClick={() => handleUpdateClick(article)}
              >
                Update
              </button>
            </>
          )}
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
