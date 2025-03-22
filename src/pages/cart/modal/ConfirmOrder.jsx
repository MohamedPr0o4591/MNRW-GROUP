import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Stack } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import "./ConfirmOrder.css";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 50 + "vw",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ConfirmOrder(props) {
  const handleClose = () => props.setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.fn();
  };
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Order
            </Typography>
            <IconButton color="error" onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <form action="" className="add-address-form" onSubmit={handleSubmit}>
            <h2>Add you address</h2>

            <div className="input-box">
              <label htmlFor="address">
                Address 1<span>*</span>
              </label>
              <input type="text" id="address" required />
            </div>

            <div className="input-box">
              <label htmlFor="address2">Address 2</label>
              <input type="text" id="address2" />
            </div>

            <div className="input-box">
              <label htmlFor="city">
                City<span>*</span>
              </label>
              <input type="text" id="city" required />
            </div>

            <div className="input-box">
              <label htmlFor="state">
                State<span>*</span>
              </label>
              <input type="text" id="state" required />
            </div>

            <div className="input-box">
              <label htmlFor="pincode">
                Pincode<span>*</span>
              </label>
              <input type="text" id="pincode" required />
            </div>

            <button type="submit">
              <span>Place Order</span>
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmOrder;
