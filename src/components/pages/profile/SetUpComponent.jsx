import React, { useEffect, useState } from "react";
import { Avatar, Container } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_profile_info } from "../../../redux/action/actions";

function SetUpComponent(props) {
  const profileData = useSelector((state) => state.GET_PROFILE_USER.data);
  const dispatch = useDispatch();

  useEffect(() => {
    let token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    dispatch(get_profile_info(token));
  }, []);

  const initialUserInfo = {
    first_name: "",
    last_name: "",
    gender: 0,
    birth_date: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [imgFile, setImgFile] = useState({
    reader: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    const formData = new FormData();

    formData.append("u_id", token);
    formData.append("f_name", userInfo.first_name);
    formData.append("l_name", userInfo.last_name);
    if (userInfo.gender > 0) {
      formData.append("gender", userInfo.gender == 1 ? "male" : "female");
    }
    formData.append("b_day", userInfo.birth_date);
    if (imgFile.file) formData.append("img_p", imgFile.file);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/profile/upload_info.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status == 200) {
        props.toast("success", "Profile Updated Successfully");
        setUserInfo(initialUserInfo);
        setImgFile({
          reader: "",
          file: "",
        });
      } else {
        props.toast("error", "Something went wrong");
      }
    } catch (err) {
      props.toast("error", "Something went wrong");
    }
  };

  const handleUploadImg = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = (_) => {
      setImgFile({
        ...imgFile,
        reader: reader.result,
      });
    };

    setImgFile({
      ...imgFile,
      file: file,
    });
  };

  return (
    <Container className="profile-container">
      <form action="" onSubmit={handleSubmit}>
        <h2>Set up your profile to get started</h2>

        <div className="input-container">
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={
              imgFile.reader != ""
                ? imgFile.reader
                : `${import.meta.env.VITE_API_HOST}/upload/${
                    profileData?.img_profile
                  }`
            }
            alt={profileData?.first_name + " " + profileData?.last_name}
          />

          <div className="input-box">
            <label className="upload">Upload your profile picture</label>
            <input type="file" onChange={handleUploadImg} />
          </div>
        </div>

        <br />

        <div className="input-container">
          <div className="input-box">
            <label>First Name</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, first_name: e.target.value })
              }
              value={userInfo.first_name}
            />
          </div>

          <div className="input-box">
            <label>Last Name</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, last_name: e.target.value })
              }
              value={userInfo.last_name}
            />
          </div>
        </div>

        <div className="input-container">
          <select
            value={userInfo.gender}
            onChange={(e) =>
              setUserInfo({ ...userInfo, gender: e.target.value })
            }
            required
          >
            <option value={0} disabled>
              Select your gender
            </option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>

          <div className="input-box">
            <label>Select your birthdate</label>
            <input
              type="date"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, birth_date: e.target.value })
              }
              value={userInfo.birth_date}
            />
          </div>
        </div>

        <input type="submit" value="Save information" />
      </form>
    </Container>
  );
}

export default SetUpComponent;
