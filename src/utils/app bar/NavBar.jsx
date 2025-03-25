import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { Avatar, Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  get_profile_info,
  get_userdata_token,
} from "../../redux/action/actions";

let navigators = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "compare phones",
    link: "/compare",
  },
  {
    name: "cart",
    link: "/cart",
  },
];

function NavBar(props) {
  const nav = useNavigate();
  const theme = useTheme();
  function changeMode() {
    props.setMode(props.mode == "light" ? "dark" : "light");
  }

  const [openMenu, setOpenMenu] = useState(false);

  const userData = useSelector((state) => state.GET_USERDATA_TOKEN.user);
  const profile_info = useSelector((state) => state.GET_PROFILE_USER.data);
  const dispatch = useDispatch();

  useEffect(() => {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      dispatch(get_userdata_token(token));
      dispatch(get_profile_info(token));
    }
  }, []);

  const handleLogOut = (_) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    location.pathname = "/";
  };

  return (
    <>
      <div
        className="navbar"
        style={{
          backgroundColor: props.themeStyle.palette.background.default,
          color: props.themeStyle.palette.color.primary,
          boxShadow: `0 2px 4px ${props.themeStyle.palette.color.shadows}`,
          display: location.pathname.includes("admin") ? "none" : "",
        }}
      >
        <div className="left-side">
          <IconButton color="inherit" onClick={changeMode}>
            {theme.palette.mode == "light" ? (
              <i className="bx bxs-sun bx-spin"></i>
            ) : (
              <i className="bx bxs-moon bx-tada"></i>
            )}
          </IconButton>

          <h1>mnrw group</h1>
        </div>

        <div className="right-side navigators">
          {navigators.map((nav, index) => {
            return (
              <Link
                key={index}
                to={nav.link}
                className={` ${
                  location.pathname == nav.link ? "active" : "navigator"
                }`}
                style={{
                  color:
                    location.pathname != nav.link
                      ? props.themeStyle.palette.color.primary
                      : "#fff",
                }}
              >
                {nav.name}
              </Link>
            );
          })}

          {Object.keys(profile_info)?.length > 0 && (
            <IconButton onClick={(_) => nav("/profile")}>
              <Avatar
                src={`${import.meta.env.VITE_API_HOST}/upload/${
                  profile_info.img_profile
                }`}
              ></Avatar>
            </IconButton>
          )}

          <Link
            to={Object.keys(userData)?.length == 0 && "/registration"}
            className="account-btn"
            style={{
              color: props.themeStyle.palette.color.primary,
            }}
            onClick={Object.keys(userData)?.length > 0 && handleLogOut}
          >
            {Object.keys(userData)?.length > 0 ? "logout" : "have an account?"}
          </Link>
        </div>
      </div>

      {/* Phone screen */}

      <div
        className="navbar-phones"
        style={{
          backgroundColor: props.themeStyle.palette.background.default,
          color: props.themeStyle.palette.color.primary,
          boxShadow: `0 2px 4px ${props.themeStyle.palette.color.shadows}`,
          display: location.pathname.includes("admin") ? "none" : "",
        }}
      >
        <div
          className="openMenu"
          style={{
            backgroundColor: theme.palette.background.default,
            width: openMenu ? 90 + "%" : 0,
            padding: openMenu ? "0.5rem 0.7rem" : 0,
          }}
        >
          <IconButton
            color="inherit"
            sx={{ float: "right" }}
            onClick={(_) => setOpenMenu(false)}
          >
            <i className="bx bx-x-circle"></i>
          </IconButton>
        </div>
        <div className="left-side">
          <IconButton color="inherit" onClick={changeMode}>
            {theme.palette.mode == "light" ? (
              <i className="bx bxs-sun bx-spin"></i>
            ) : (
              <i className="bx bxs-moon bx-tada"></i>
            )}
          </IconButton>

          <h1>mnrw group</h1>
          <Box flex={1} />

          <IconButton color="inherit" onClick={(_) => setOpenMenu(true)}>
            <i className="bx bx-menu-alt-right"></i>
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default NavBar;
