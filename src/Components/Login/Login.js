import React, { useState } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router";
import axios from "axios";
import { signinFailure, signinSuccess } from "../../Redux/actions/actions";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { Paper, InputAdornment } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { Logo } from "../HelperCells";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-input": {
      padding: "14px 12px 14px",
      width: "240px",
    },
  },
}));
const Login = (props) => {
  document.body.style.backgroundColor = "white";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  // Submit Function
  const submitLogin = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/api/login", data)
      .then((res) => {
        if (res.status == 200) {
          console.log("res", res);
          dispatch(signinSuccess(res && res));
          toast.success("Login Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          props.history.push("/loads");
        } else {
          dispatch(signinFailure());
          toast.error("Login Unsuccessful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log("err", err.response);

        toast.error(
          err && err.response ? err.response.data.msg : "Error Occured",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };
  return (
    <Paper
      elevation={3}
      sx={{
        height: "500px",
        width: "410px",
        display: "inline-block",
        marginTop: "60px",
        backgroundColor: "#F7FAFC",
      }}
    >
      <div
        style={{
          height: "106px",
        }}
      >
        <Logo style={{ fontSize: "xx-large", marginTop: "5vh" }} />
      </div>
      <hr></hr>
      <div
        style={{
          marginTop: "10vh",
        }}
      >
        <div className="login">
          <TextField
            disableUnderline
            required
            // label="Username/Email"
            variant="filled"
            // className="loginTextFields"
            className={classes.root}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid lightgrey",
                verticalAlign: "centre",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail style={{ backgroundColor: "transparent" }} />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <TextField
            disableUnderline
            required
            // label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            // className="loginTextFields"
            className={classes.root}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid lightgrey",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <FaUnlockAlt style={{ backgroundColor: "transparent" }} />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <br />
          <br />
          <button
            style={{ float: "none" }}
            className="addButton"
            onClick={submitLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </Paper>
  );
};

export default Login;
