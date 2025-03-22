import React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import {
  ApartmentRounded,
  CategoryRounded,
  QrCode2Rounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

let drawerData = [
  {
    name: "Categories",
    path: "categories",
    icon: <CategoryRounded />,
  },
  {
    name: "Companies",
    path: "companies",
    icon: <ApartmentRounded />,
  },
  {
    name: "Products",
    path: "products",
    icon: <QrCode2Rounded />,
  },
];

export default function DrawerBar(props) {
  const theme = useTheme();
  let nav = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerData.map((item, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: location.pathname.includes(item.path)
                  ? theme.palette.color.secondary
                  : "",
                color: location.pathname.includes(item.path) ? "#fff" : "",
              }}
            >
              <ListItemButton onClick={(_) => nav(item.path)}>
                <ListItemIcon
                  sx={{
                    color: location.pathname.includes(item.path) ? "#fff" : "",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
}
