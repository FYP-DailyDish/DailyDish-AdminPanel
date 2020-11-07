import React from "react";
import UpdateIcon from "@material-ui/icons/Update";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from '@material-ui/icons/Send';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import "./Sidemenu.css";

export const SideBarData = [
  {
    title: "Activity Feed",
    icon: <UpdateIcon />,
    Link: "/",
  },
  {
    title: "Admin Users",
    icon: <SupervisorAccountIcon />,
    Link: "/admin-users",
  },
  {
    title: "Application Users",
    icon: <SmartphoneIcon />,
    Link: "/app-users",
  },
  {
    title: 'Chef',
    icon: <FastfoodIcon />,
    Link: "/chefs",
  },
  {
    title: "Orders Feed",
    icon: <ShoppingCartIcon />,
    Link: "/orders",
  },
  {
    title: "Riders",
    icon: <DirectionsBikeIcon />,
    Link: "/riders",
  },
  {
    title: "My Profile",
    icon: <PersonIcon />,
    Link: "/update-profile",
  },
  {
    title: "Chat",
    icon: <SendIcon />,
    Link: "/admin-chat",
  },
];
