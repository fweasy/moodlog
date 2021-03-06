import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Cookie from "universal-cookie";
import "./ErrorMessage.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [noIdFound, setNoIdFound] = useState(false);
  const cookies = new Cookie();

  const loginHandler = (email, password) => {
    axios
      .post("https://moodapi.freewizard.net/login", { email, password })
      .then((response) => {
        if (response.data.email === "passwordincorrect") {
          setPasswordIncorrect(true);
        } else if (response.data.email === "noidfound") {
          setNoIdFound(true);
        } else {
          console.log("successfully logged in");
          cookies.set("email", response.data.email, {
            path: "/",
            expires: new Date(2021, 12),
          });
          cookies.set("isLoggedIn", "true", {
            path: "/",
            expires: new Date(2021, 12),
          });
          window.location = "/";
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {passwordIncorrect && !noIdFound ? (
          <Typography component="h5" className="errorMessage">
            Password Incorrect
          </Typography>
        ) : (
            <></>
          )}
        {noIdFound ? (
          <Typography component="h5" className="errorMessage">
            ID Not found
          </Typography>
        ) : (
            <></>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          label="password"
          name="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => loginHandler(email, password)}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
