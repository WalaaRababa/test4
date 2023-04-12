import { Link } from "react-router-dom";
import "./style.css";

//============================Redux===================================

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
  });
  //===============================================================

  return (
    <>
      <div className="NavBar">
        {isLoggedIn ? (
          <>
            <Link className="Link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="Link" to="/newArticle">
              Add New Article
            </Link>
            <button
              className="logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="Link" to="/">
              Register
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
