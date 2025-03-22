import React, { useEffect } from "react";
import NavBar from "./utils/app bar/NavBar";
import { Route, Routes } from "react-router";
import Footer from "./utils/footer/Footer";
import HomePage from "./pages/home/HomePage";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { getDesignTokens } from "./designToken";
import LoginPage from "./pages/auth/LoginPage";
import ForgetPassword from "./pages/auth/ForgetPassword";
import CreateAccount from "./pages/auth/CreateAccount";
import { toast, ToastContainer, Zoom } from "react-toastify";
import ComparePage from "./pages/compare/ComparePage";
import Dashboard from "./admin/Dashboard";
import CategoryComponent from "./admin/components/CategoryComponent";
import CompanyComponent from "./admin/components/CompanyComponent";
import ProductsComponents from "./admin/components/ProductsComponents";
import CartPage from "./pages/cart/CartPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfile from "./pages/profile/edit profile/EditProfile";

function App() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("mode") || "light"
  );

  useEffect(() => {
    document.title = "MNRW GROUP | HOME PAGE";
    localStorage.mode = mode;
  }, [mode]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleToast = (status, msg) => {
    toast[status](msg, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.color.primary,
        }}
      >
        <NavBar setMode={setMode} mode={mode} themeStyle={theme} />

        <section>
          <Routes>
            <Route path="/" element={<HomePage toast={handleToast} />} />
            <Route path="/registration">
              <Route index element={<LoginPage toast={handleToast} />} />
              <Route path="forget" element={<ForgetPassword />} />
              <Route
                path="create"
                element={<CreateAccount toast={handleToast} />}
              />
            </Route>
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/profile"
              element={<ProfilePage toast={handleToast} />}
            />

            <Route
              path="/profile/edit/:id"
              element={<EditProfile toast={handleToast} />}
            />

            {/* Admin page */}
            <Route path="/admin" element={<Dashboard setMode={setMode} />}>
              <Route
                path="products"
                element={<ProductsComponents toast={handleToast} />}
              />
              <Route
                path="companies"
                element={<CompanyComponent toast={handleToast} />}
              />
              <Route
                path="categories"
                element={<CategoryComponent toast={handleToast} />}
              />
            </Route>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Zoom}
          />
        </section>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
