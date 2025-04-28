import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Box, Container, Stack, Button, useTheme } from "@mui/material";
import { AddRounded, CloseRounded, RemoveRounded, RemoveShoppingCartRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import ConfirmOrder from "./modal/ConfirmOrder";
import axios from "axios";

function CartPage(props) {
  const theme = useTheme();
  const nav = useNavigate();

  const [allPro, setAllPro] = useState([]);
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    setAllPro(products);
  }, [localStorage.products]);

  useEffect(() => {
    let total = 0;
    if (allPro.length > 0) {
      allPro.forEach(pro => total += pro.price * pro.quantity);
    }

    setTotalPrice(total.toFixed(2));
  }, [allPro]);

  const handleDeleteItem = (id) => {
    let pro = JSON.parse(localStorage.getItem("products"));

    pro.splice(id, 1);

    localStorage.setItem("products", JSON.stringify(pro));

    setAllPro(pro);
  };

  const handleIncrement = (id) => {
    let pro = JSON.parse(localStorage.getItem("products"));

    pro[id].quantity += 1;

    localStorage.setItem("products", JSON.stringify(pro));

    setAllPro(pro);
  };

  const handleDecrement = (id) => {
    let pro = JSON.parse(localStorage.getItem("products"));

    if (pro[id].quantity > 1) {
      pro[id].quantity -= 1;
    }

    localStorage.setItem("products", JSON.stringify(pro));

    setAllPro(pro);
  };

  const handleAddPro = async (_) => {
    let pro = JSON.parse(localStorage.getItem("products"));
    let token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    let formData = new FormData();
    let formData2 = new FormData();
    let price = 0;

    for (let i = 0; i < pro.length; i++) {
      price += +pro[i].price * pro[i].quantity;
    }

    formData.append("u_id", token);
    formData.append("t_price", price);

    let res = await axios.post(
      `${import.meta.env.VITE_API_HOST}/orders/NewOrder.php`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.status == 200) {
      props.toast("success", "Order Placed Successfully");
    }

    for (let i = 0; i < pro.length; i++) {
      formData2.append("img", pro[i].img);
      formData2.append("name", pro[i].name);
      formData2.append("desc", pro[i].desc);
      formData2.append("price", pro[i].price);
      formData2.append("quantity", pro[i].quantity);

      await axios.post(
        `${import.meta.env.VITE_API_HOST}/orders/AddOrderDetails.php`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    setAddressOpen(false);

    localStorage.removeItem("products");

    setAllPro([]);
    nav("/profile");
  };

  return (
    <div className="cart-page">
      <ConfirmOrder
        open={addressOpen}
        setOpen={setAddressOpen}
        fn={handleAddPro}
      />
      <Container
        className="cart-container"
        sx={{
          backgroundColor: theme.palette.divider,
        }}
      >
        <h2>Your Shopping Cart</h2>

        <div className="pro-container">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {allPro?.length > 0 ? (
              allPro.map((data, index) => {
                return (
                  <div
                    className="show-products"
                    style={{
                      backgroundColor: theme.palette.divider,
                    }}
                    key={index}
                  >
                    <div>
                      <img
                        src={`${import.meta.env.VITE_API_HOST}/upload/${data.img
                          }`}
                        alt={data.name}
                      />

                      <p className="details">
                        <span>{data.name}</span> - <span>${data.price}</span>{" "}
                        <span>(x{data.quantity})</span>
                      </p>
                    </div>

                    <div className="buttons-box">
                      <button
                        // className="minus"
                        onClick={(_) => handleDecrement(index)}
                      >
                        <RemoveRounded />
                      </button>
                      <button
                        // className="add"
                        onClick={(_) => handleIncrement(index)}
                      >
                        <AddRounded />
                      </button>
                      <button onClick={(_) => handleDeleteItem(index)}>
                        <CloseRounded />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="inner">
                <RemoveShoppingCartRounded />
                <span>your cart is empty</span>

                <Link to={"/"} className="back">
                  <button className="cssbuttons-io-button">
                    Go Back
                    <div className="icon">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            )}
          </Box>

          <Stack direction={'row'} alignItems={'center'} mt={1}>
            <Box flex={1} />

            {
              totalPrice > 0 && (
                <div className="total-price">
                  <span>Total Price ${totalPrice.toLocaleString("en-US")} </span>
                </div>
              )
            }

            <Box flex={1} />
            {allPro?.length > 0 && (
              <a href="#" className="continue-shopping">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(_) => {
                    let token =
                      sessionStorage.getItem("token") ||
                      localStorage.getItem("token");
                    if (!token) {
                      nav("/registration");
                      return;
                    }

                    setAddressOpen(true);
                  }}
                >
                  continue shopping
                </Button>
              </a>
            )}
          </Stack>

        </div>
      </Container>
    </div>
  );
}

export default CartPage;
