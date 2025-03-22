import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, IconButton, Stack } from "@mui/material";
import visaLogo from "../../../../assets/Visa-Card-Logo-No-Background.png";
import "./AddVisaCardComponent.css";
import { CloseRounded } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  minHeight: "550px",
  maxHeight: "80vh",
  bgcolor: "transparent",
  border: "none",
  outline: "none",
  boxShadow: 0,
  padding: "40px 70px",
  color: "#000",
};

function AddVisaCardComponent(props) {
  const handleClose = () => props.setOpen(false);

  const handleAddVisaNumber = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    const formattedValue = inputValue.match(/.{1,4}/g)?.join(" ") || "";

    props.setVisaInfo({
      ...props.visaInfo,
      cardNumberPreview: formattedValue,
      cardNumber: inputValue,
    });
  };

  return (
    <div className="add-credit-card">
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2>Add / Update Card</h2>
              <Box flex={1} />

              <IconButton color="error" onClick={handleClose}>
                <CloseRounded />
              </IconButton>
            </Stack>

            <div className="card-info" id="card">
              <section
                className={`front ${props.CVVFocused ? "front-flipped" : ""}`}
              >
                <div className="header">
                  <img src={visaLogo} />

                  <p>master card</p>
                </div>

                <div className="card-number">
                  {Array.from({ length: 16 }).map((_, index) => {
                    return (
                      <span key={index} className="number">
                        <span>
                          {index < 4 || index >= 12
                            ? props.visaInfo.cardNumber?.[index] || "#"
                            : "#"}
                        </span>
                        {(index + 1) % 4 === 0 && index + 1 !== 16 && " "}
                      </span>
                    );
                  })}
                </div>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  className="card-additional-info"
                >
                  <div className="left-side">
                    <span>card holder</span>
                    <p>{props.visaInfo.cardHolderName || "John Doe"}</p>
                  </div>
                  <div className="right-side">
                    <p>Valid Thru</p>
                    <p>
                      {props.visaInfo.expiryMonth || "MM"}/
                      {props.visaInfo.expiryYear || "YY"}
                    </p>
                  </div>
                </Stack>
              </section>
              <section
                className={`back ${props.CVVFocused ? "back-flipped" : ""}`}
              >
                <div className="header"></div>

                <div className="cvv">
                  <p>CVV</p>
                  <div className="input-preview">
                    <span>{props.visaInfo.cvv || "***"}</span>
                  </div>
                </div>
              </section>
            </div>

            <Container>
              <form
                action=""
                onSubmit={(e) =>
                  props.fn(
                    e,
                    props.visaInfo.cardNumberPreview,
                    props.visaInfo.expiryMonth,
                    props.visaInfo.expiryYear,
                    props.visaInfo.cvv
                  )
                }
              >
                <div className="card-info-container">
                  <div className="input-box">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      value={props.visaInfo.cardNumberPreview}
                      onChange={handleAddVisaNumber}
                      maxLength={19}
                    />
                  </div>

                  <div className="input-box">
                    <label htmlFor="cardName">Name Holder</label>
                    <input
                      type="text"
                      name="cardName"
                      id="cardName"
                      value={props.visaInfo.cardHolderName}
                      onChange={(e) =>
                        props.setVisaInfo({
                          ...props.visaInfo,
                          cardHolderName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={1}
                    className="stack-input-box"
                  >
                    <input
                      type="text"
                      name="month"
                      id="month"
                      placeholder="MM"
                      maxLength={2}
                      value={props.visaInfo.expiryMonth}
                      onChange={(e) =>
                        props.setVisaInfo({
                          ...props.visaInfo,
                          expiryMonth: e.target.value,
                        })
                      }
                    />
                    /
                    <input
                      type="text"
                      name="year"
                      id="year"
                      placeholder="YY"
                      maxLength={2}
                      value={props.visaInfo.expiryYear}
                      onChange={(e) =>
                        props.setVisaInfo({
                          ...props.visaInfo,
                          expiryYear: e.target.value,
                        })
                      }
                    />
                    <Box flex={1} />
                    <input
                      type="text"
                      name="CVV"
                      id="CVV"
                      placeholder="CVV"
                      maxLength={3}
                      value={props.visaInfo.cvv}
                      onChange={(e) =>
                        props.setVisaInfo({
                          ...props.visaInfo,
                          cvv: e.target.value,
                        })
                      }
                      onFocus={(_) => props.setCVVFocused(true)}
                      onBlur={(_) => props.setCVVFocused(false)}
                    />
                  </Stack>

                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <div className="btn-box">
                      <button className="modify" type="submit">
                        submit
                      </button>
                    </div>
                  </Stack>
                </div>
              </form>
            </Container>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddVisaCardComponent;
