import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminListLearner from "./AdminListLearner";
import AdminListTeacher from "./AdminListTeacher";
import AdminListCourse from "./AdminListCourse";

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [currentNavDisplay, setCurrentNavDisplay] = useState();

  const handleNavAdmin = (text) => {
    console.log(text);
    //console.log(index);

    switch (text) {
      case "List Learner":
        setCurrentNavDisplay(<AdminListLearner />);
        break;
      case "List Teacher":
        setCurrentNavDisplay(<AdminListTeacher />);
        break;
      case "List Course":
        setCurrentNavDisplay(<AdminListCourse />);
        break;
      default:
        setCurrentNavDisplay("rien afficher");
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="relative"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 80,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["List Learner", "List Teacher", "List Course"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    onClick={(e) => handleNavAdmin(text)}
                  />
                </ListItem>
              )
            )}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ marginLeft: 35,
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3, }}>
        <Toolbar />
        <Typography paragraph>
          {currentNavDisplay}
        </Typography>
      </Box>
    </Box>
  );
}
