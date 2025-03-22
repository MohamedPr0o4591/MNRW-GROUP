import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Box, Button, Container, useTheme } from "@mui/material";
import { CloseRounded, RemoveShoppingCartRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CartPage() {
  const theme = useTheme();

  const [allPro, setAllPro] = useState([]);

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    setAllPro(products);
  }, [localStorage.products]);

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

  return (
    <div className="cart-page">
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
                        src={`${import.meta.env.VITE_API_HOST}/upload/${
                          data.img
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
                        className="minus"
                        onClick={(_) => handleDecrement(index)}
                      >
                        -
                      </button>
                      <button
                        className="add"
                        onClick={(_) => handleIncrement(index)}
                      >
                        +
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

          {allPro?.length > 0 && (
            <Link to={"/"} className="continue-shopping">
              <Button variant="contained" color="primary">
                continue shopping
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}

export default CartPage;
