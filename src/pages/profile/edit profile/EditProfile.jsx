import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Stack } from "@mui/material";
import "./EditProfile.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  get_profile_info,
  get_userdata_token,
} from "../../../redux/action/actions";
import { CameraAltRounded } from "@mui/icons-material";
import axios from "axios";

function EditProfile(props) {
  const params = useParams();
  const profileInfo = useSelector((state) => state.GET_PROFILE_USER.data);
  const userData = useSelector((state) => state.GET_USERDATA_TOKEN.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialState = {
    f_name: "",
    l_name: "",
    u_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    imgFile: null,
    img_profile: null,
  };
  const [updateInfo, setUpdateInfo] = useState(initialState);

  useEffect(() => {
    let token = params.id;

    dispatch(get_userdata_token(token));
    dispatch(get_profile_info(token));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let token = params.id;

    formData.append("u_id", token);
    if (updateInfo.imgFile) {
      formData.append("img_p", updateInfo.imgFile);
    }

    if (updateInfo.f_name != "") {
      formData.append("f_name", updateInfo.f_name);
    }

    if (updateInfo.l_name != "") {
      formData.append("l_name", updateInfo.l_name);
    }

    if (updateInfo.u_name != "") {
      formData.append("u_name", updateInfo.u_name);
    }

    if (updateInfo.email != "") {
      formData.append("email", updateInfo.email);
    }

    if (
      updateInfo.password != "" &&
      updateInfo.password == updateInfo.confirmPassword
    ) {
      formData.append("pass", updateInfo.password);
    } else if (
      updateInfo.password != "" &&
      updateInfo.password != updateInfo.confirmPassword
    ) {
      props.toast("warning", "Password doesn't match");
      return;
    }

    let res = await axios.post(
      `${import.meta.env.VITE_API_HOST}/auth/Login.php`,
      {
        u_name: userData.username,
        u_pass: updateInfo.currentPassword,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.message == "Login successfully") {
      await axios.post(
        `${import.meta.env.VITE_API_HOST}/profile/update_any_info.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      props.toast("success", "Update Successfully");
      nav("/profile");
    }
  };

  const handleUploadImg = (e) => {
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setUpdateInfo((prevInfo) => ({
          ...prevInfo,
          imgFile: file, // الملف نفسه للرفع
          img_profile: reader.result, // معاينة الصورة
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="edit-profile">
      <Container>
        <Stack direction={"row"} alignItems={"center"} gap={0.5} mt={2}>
          <j />
          <Box width={150} height={150} className="img-profile">
            <Avatar
              src={
                updateInfo.img_profile
                  ? updateInfo.img_profile
                  : `${import.meta.env.VITE_API_HOST}/upload/${
                      profileInfo.img_profile
                    }`
              }
              sx={{ width: "100%", height: "100%" }}
            />
            <label htmlFor="upload-img">
              <CameraAltRounded />
            </label>
            <input type="file" id="upload-img" onChange={handleUploadImg} />
          </Box>

          <j />
        </Stack>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-box">
              <label>First Name (optional)</label>
              <input
                type="text"
                value={updateInfo.f_name}
                onChange={(e) =>
                  setUpdateInfo({ ...updateInfo, f_name: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <label>Last Name (optional)</label>
              <input
                type="text"
                value={updateInfo.l_name}
                onChange={(e) =>
                  setUpdateInfo({ ...updateInfo, l_name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input-box">
              <label>Username (optional)</label>
              <input
                type="text"
                value={updateInfo.u_name}
                onChange={(e) =>
                  setUpdateInfo({ ...updateInfo, u_name: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label>Email Address (optional)</label>
              <input
                type="email"
                value={updateInfo.email}
                onChange={(e) =>
                  setUpdateInfo({ ...updateInfo, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input-box">
              <label>New Password (optional)</label>
              <input
                type="password"
                value={updateInfo.password}
                onChange={(e) =>
                  setUpdateInfo({ ...updateInfo, password: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <label>Confirm Password (optional)</label>
              <input
                type="password"
                value={updateInfo.confirmPassword}
                onChange={(e) =>
                  setUpdateInfo({
                    ...updateInfo,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input-box">
              <label>
                Current Password to Confirm<span>*</span>
              </label>
              <input
                type="password"
                value={updateInfo.currentPassword}
                onChange={(e) =>
                  setUpdateInfo({
                    ...updateInfo,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
      </Container>
    </div>
  );
}

export default EditProfile;
