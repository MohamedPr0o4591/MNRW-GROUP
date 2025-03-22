import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { get_profile_info } from "../../redux/action/actions";
import { useNavigate } from "react-router";
import SetUpComponent from "../../components/pages/profile/SetUpComponent";
import ModifyProfile from "../../components/pages/profile/ModifyProfile";

function ProfilePage(props) {
  const nav = useNavigate();
  const userData = useSelector((state) => state.GET_PROFILE_USER.data);
  const dispatch = useDispatch();
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    let token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      dispatch(get_profile_info(token));
    } else nav("/");
  }, []);

  useEffect(() => {
    if (userData.f_name != null && userData.l_name != null) {
      setMode("loaded");
    } else setMode("setUp");
  }, [userData]);

  return (
    <div className="profile-page">
      {mode == "setUp" ? (
        <SetUpComponent toast={props.toast} />
      ) : (
        <ModifyProfile userData={userData} toast={props.toast} />
      )}
    </div>
  );
}

export default ProfilePage;
