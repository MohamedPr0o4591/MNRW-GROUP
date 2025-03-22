import { Avatar, Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_recent_order_data,
  get_userdata_token,
  get_visa_details,
} from "../../../redux/action/actions";
import {
  AutorenewRounded,
  CalendarMonthRounded,
  PersonRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import visaLogo from "../../../assets/Visa-Card-Logo-No-Background.png";
import AddVisaCardComponent from "./visa card/AddVisaCardComponent";
import { Link } from "react-router-dom";
import axios from "axios";

function ModifyProfile(props) {
  const mainInfo = useSelector((state) => state.GET_USERDATA_TOKEN.user);
  const ordersData = useSelector((state) => state.GET_RECENT_ORDERS.orders);
  const visa_details = useSelector(
    (state) => state.GET_VISA_CARD_DETAILS.details
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    dispatch(get_userdata_token(token));
    dispatch(get_recent_order_data(token));
    dispatch(get_visa_details(token));
  }, []);

  const [addVisaOpen, setAddVisaOpen] = useState(false);
  const initialVisaInfo = {
    cardNumber: "",
    cardNumberPreview: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  };
  const [visaInfo, setVisaInfo] = React.useState(initialVisaInfo);
  const [CVVFocused, setCVVFocused] = React.useState(false);

  const validateCreditCard = (cardNumber, expiryDate, cvv) => {
    // نظافة البيانات من المسافات
    cardNumber = cardNumber.replace(/\s/g, "");
    expiryDate = expiryDate.trim();
    cvv = cvv.trim();

    // التحقق من رقم البطاقة باستخدام Luhn Algorithm
    const isValidCardNumber = (num) => {
      let sum = 0,
        alternate = false;
      for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num[i], 10);
        if (alternate) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        alternate = !alternate;
      }
      return sum % 10 === 0;
    };

    // التحقق من نوع البطاقة
    const getCardType = (num) => {
      const patterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      };

      for (let [type, regex] of Object.entries(patterns)) {
        if (regex.test(num)) return type;
      }
      return "unknown";
    };

    // التحقق من تاريخ الانتهاء (MM/YY)
    const isValidExpiryDate = (date) => {
      const match = date.match(/^(\d{2})\/(\d{2})$/);
      if (!match) return false;
      const month = parseInt(match[1], 10);
      const year = parseInt(`20${match[2]}`, 10);
      if (month < 1 || month > 12) return false;
      const now = new Date();
      const expiry = new Date(year, month);
      return expiry > now;
    };

    // التحقق من CVV حسب نوع البطاقة
    const isValidCVV = (cvv, type) => {
      const cvvLength = {
        visa: 3,
        mastercard: 3,
        amex: 4,
        discover: 3,
      };
      return cvv.length === (cvvLength[type] || 3) && /^\d+$/.test(cvv);
    };

    // تنفيذ الفحوصات
    const isCardValid = isValidCardNumber(cardNumber);
    const cardType = getCardType(cardNumber);
    const isExpiryValid = isValidExpiryDate(expiryDate);
    const isCVVValid = isValidCVV(cvv, cardType);

    return {
      isValid: isCardValid && isExpiryValid && isCVVValid,
      cardType: cardType !== "unknown" ? cardType : "Invalid Card Type",
      errors: {
        cardNumber: isCardValid ? null : "Invalid Card Number",
        expiryDate: isExpiryValid ? null : "Invalid Expiry Date",
        cvv: isCVVValid ? null : "Invalid CVV",
      },
    };
  };

  const handleSubmit = async (e, cardNum, cardMonth, cardYear, cvv) => {
    e.preventDefault();
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (cardNum == "" || cardMonth == "" || cardYear == "" || cvv == "") {
      props.toast("warning", "Please Update Your Card Information");
      return;
    }

    let cardInfo = validateCreditCard(cardNum, `${cardMonth}/${cardYear}`, cvv);

    if (cardInfo.isValid) {
      let formData = new FormData();

      formData.append("c_number", visaInfo.cardNumber);
      formData.append("ex_month", visaInfo.expiryMonth);
      formData.append("ex_year", visaInfo.expiryYear);
      formData.append("cvv", visaInfo.cvv);
      formData.append("c_holder", visaInfo.cardHolderName);
      formData.append("u_id", token);

      let res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/visa card/upload_visa.php`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status == 200) {
        props.toast("success", res.data.message);
        dispatch(get_visa_details(token));
        setAddVisaOpen(false);
      } else props.toast("error", "Card Information Update Failed");
    } else props.toast("error", "Invalid Card Information");
  };

  return (
    <Container className="modify-profile">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={`${import.meta.env.VITE_API_HOST}/upload/${
            props.userData.img_profile
          }`}
        />

        <Box className="main-info">
          <h2>
            full name: {props.userData.f_name} {props.userData.l_name}
          </h2>

          <p className="username">username: {mainInfo.username}</p>
          <span className="email">email: {mainInfo.email}</span>
        </Box>

        <Box className="info">
          <p>
            <PersonRounded /> {props.userData.gender}
          </p>

          <p>
            <CalendarMonthRounded />{" "}
            {new Date(props.userData.b_day).toLocaleDateString("en-US")}
          </p>

          <div className="btn-box">
            <button className="modify">
              <Link to={`edit/${mainInfo.id}`}>Edit Profile</Link>
            </button>
          </div>
        </Box>
      </Stack>

      <br />
      <hr />
      <br />

      <h3>VISA Info</h3>

      <div className="card-info" id="card">
        <section className="front">
          <div className="header">
            <img src={visaLogo} />

            <p>master card</p>
          </div>

          <div className="card-number">
            {Array.from({ length: 16 }).map((_, index) => {
              return (
                <span key={index} className="number">
                  <span>
                    {(visa_details?.c_number && index < 4) ||
                    (visa_details?.c_number && index > 11)
                      ? visa_details?.c_number[index]
                      : "#"}
                  </span>
                  {(index + 1) % 4 == 0 && " "}
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
              <p>
                {visa_details?.c_holder
                  ? visa_details?.c_holder[0] + "****"
                  : "John Doe"}
              </p>
            </div>
            <div className="right-side">
              <p>Valid Thru</p>
              <p>
                {Object.values(visa_details).length > 0 ? "**/**" : "MM/YY"}
              </p>
            </div>
          </Stack>
        </section>
        <section className="back">
          <div className="header"></div>

          <div className="cvv">
            <p>CVV</p>
            <div className="input-preview">
              <span>***</span>
            </div>
          </div>
        </section>
      </div>

      <div className="btn-box">
        <button className="modify" onClick={(_) => setAddVisaOpen(true)}>
          {visa_details?.c_number ? "Edit Card" : "add card"}
        </button>
        {visa_details?.c_number ? (
          <button className="remove">delete card</button>
        ) : null}
      </div>

      <br />

      <hr />

      <br />

      <h3>Recent Orders</h3>

      <AddVisaCardComponent
        setOpen={setAddVisaOpen}
        open={addVisaOpen}
        visaInfo={visaInfo}
        setVisaInfo={setVisaInfo}
        CVVFocused={CVVFocused}
        setCVVFocused={setCVVFocused}
        fn={handleSubmit}
      />

      <table className="recent-orders">
        <thead>
          <tr>
            <th>id</th>
            <th>img</th>
            <th>name</th>
            <th>quantity</th>
            <th>status</th>
          </tr>
        </thead>

        <tbody>
          {ordersData?.length > 0
            ? ordersData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`${import.meta.env.VITE_API_HOST}/upload/${
                          data.img
                        }`}
                        alt={data.name}
                      />
                    </td>
                    <td>{data.name}</td>
                    <td>{data.quantity}</td>
                    <td>
                      {data.status == "pending" ? (
                        <span className="pending" style={{ color: "tomato" }}>
                          <AutorenewRounded />
                          الطلب قيد المراجعة
                        </span>
                      ) : (
                        <span className="pending" style={{ color: "green" }}>
                          <VerifiedRounded />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </Container>
  );
}

export default ModifyProfile;
