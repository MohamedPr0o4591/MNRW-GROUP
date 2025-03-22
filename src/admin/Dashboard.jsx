import * as React from "react";
import "./Dashboard.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./top bar/TopBar";
import DrawerBar from "./drawer/DrawerBar";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { get_userdata_token } from "../redux/action/actions";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(false);
  let nav = useNavigate();

  const userData = useSelector((state) => state.GET_USERDATA_TOKEN.user);
  let dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    document.title = "Admin Dashboard";
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    location.pathname == "/admin" && nav("/admin/products");

    if (!token) {
      nav("/");
    } else dispatch(get_userdata_token(token));
  }, []);

  React.useEffect(() => {
    if (Object.values(userData).length > 0 && userData.status != "admin")
      nav("/");
  }, [userData]);

  return (
    <div className="dashboard">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={props.setMode}
        />

        <DrawerBar open={open} handleDrawerClose={handleDrawerClose} />

        <Main open={open}>
          <Outlet />
        </Main>
      </Box>
    </div>
  );
}
