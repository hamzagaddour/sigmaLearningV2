import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import './log.css'


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <>Sigma Learning</> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#004d40",
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

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let firstName = data.get("firstName");
    let lastName = data.get("lastName");
    let email = data.get("email");
    let password = data.get("password");
    let controlPassword = data.get("password-conf");
    console.log(firstName + lastName + email + password + controlPassword);

    const terms = document.getElementById("terms");
    //const firstNameError = document.querySelector(".firstName.error");
    //const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales";
      }
    } else {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          //setFormSubmit(true)
        })
        .catch((err) => {
          console.log(err);
          //firstNameError.innerHTML = err.response.data.errors.firstName;
          //lastNameError.innerHTML = err.response.data.errors.lastName;
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <div className="firstName error"></div>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <div className="lastName error"></div>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <div className="email error"></div>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <div className="password error"></div>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-conf"
                  label="Password"
                  type="password"
                  id="password-conf"
                />
              </Grid>
              <div className="password-confirm error"></div>

              <Grid item xs={12}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  J'accept les{" "}
                  <a
                    href="https://www.link.ch/fr/conditions-commerciales-generales/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    conditions générales
                  </a>{" "}
                </label>
              </Grid>
              <div className="terms error"></div>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
