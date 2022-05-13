import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "../image/favicon.png";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useNavigate } from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Chip } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#455a64",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function ButtonAppBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  //console.log(userData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar theme={theme} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NavLink to="/">
              <img width={200} src={logo} alt="logo" />
            </NavLink>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {uid ? (
            <>
              <Chip
                onClick={(e) => navigate("/profil")}
                label={
                  userData.isAdmin === true
                    ? "Welcome Admin " +
                      userData.firstName +
                      " " +
                      userData.lastName
                    : userData.isTeacher === true
                    ? "Welcome Teacher " +
                      userData.firstName +
                      " " +
                      userData.lastName
                    : "Welcome Learner " +
                      userData.firstName +
                      " " +
                      userData.lastName
                }
                color="success"
                variant="filled"
                clickable
                sx={{ margin: 1 }}
              />
              <Logout />
            </>
          ) : (
            <>
              {" "}
              {/*<Button href="/signin" size="large" color="inherit">
                SignIn
              </Button>*/}
              <Button href="/signup" size="large" color="inherit">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
