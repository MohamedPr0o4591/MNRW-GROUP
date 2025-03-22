import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function TopBar(props) {
  let changeTheme = (_) => {
    props.setMode((prev) => (prev == "light" ? "dark" : "light"));
  };

  let theme = useTheme();

  return (
    <AppBar position="fixed" open={props.open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            props.open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={changeTheme}
          sx={[
            {
              mr: 2,
            },
          ]}
        >
          {theme.palette.mode == "light" ? (
            <LightModeRounded />
          ) : (
            <DarkModeRounded />
          )}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          MNRW GROUP
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
