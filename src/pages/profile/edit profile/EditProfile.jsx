import React from "react";
import {  Avatar, Container, Stack } from "@mui/material";
import "./EditProfile.css";
import { useParams } from "react-router";

function EditProfile() {
  const params = useParams();
  return (
    <div className="edit-profile">
    <Container >
     <Stack direction={"row"} alignItems={"center"} gap={0.5} mt={2}> 
      <j />
      <Avatar 
       sx={{ width: 150, height: 150 }}
       className="img-profile"
      />
      <j />
     </Stack>
    </Container>
    </div>
  );
}

export default EditProfile;
