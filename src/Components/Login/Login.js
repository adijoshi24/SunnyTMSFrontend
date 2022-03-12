import React, { useState } from "react";
import cn from 'classnames';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { signinFailure, signinSuccess } from "../../Redux/actions/actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {Paper, Grid, Divider, Stack, Typography, Box} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { Logo } from "../HelperCells";
import styles from "./styles.module.css";
import {EMAIL_REGEX, validateEmpty} from "./utils";


const validateFields = (data) => {
    const {email, password} = data;
    if(!email){
        return {valid: false, field: 'email', message: 'Please enter email'};
    }
    else if(!String(email).toLowerCase().match(EMAIL_REGEX)){
        return {valid: false, field: 'email', message: 'Please enter valid Email'};
    }
    else if(!password){
        return {valid: false, field: 'password', message: 'Please enter password'};
    }

    return {valid: true};
}

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  // Submit Function
  const submitLogin = (e) => {
    e.preventDefault();
    const {email, password} = formData;
    const validate = validateEmpty(formData);
    if(!validate) {
        setErrors({email: 'Please enter Email', password: 'Please enter Password'});
        return;
    }

    const {valid, field, message} = validateFields(formData);
      if(!valid){
          setErrors({[field]: message});
          return;
      }
    axios
      .post("http://localhost:5000/api/login", {email, password})
      .then((res) => {
        if (res.status === 200) {
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
    
  const onChange = (e) => {
      const { target: {name, value} } = e;
      setFormData(prevState => ({ ...prevState, [name]: value }));
      setErrors({[name]: ''});
  }
  
  return (
    <Grid container={true} justifyContent={'center'} alignItems={'center'} sx={{height: window.innerHeight, background: '#FFFDFD'}}>
        <Paper
            sx={{
                width: "390px",
                display: "inline-block",
                backgroundColor: "#F7FAFC",
                boxShadow: '0px 0px 32px #8898AA26;'
            }}
        >
            <Logo style={{ fontSize: "xx-large", padding: "2rem" }} />
            <Divider sx={{color: '#0000001A'}} />
            <div>
                <form noValidate className={styles.loginFormContainer} onSubmit={submitLogin}>
                    <Stack spacing={2}>
                        <Stack className={styles.inputWrapper}>
                            <Box sx={{width: '100%',display: 'flex'}} alignItems={'center'}>
                                <em className={styles.inputIcon}><MdEmail style={{ color: "#ADB5BD" }} /></em>
                                <input
                                    className={cn(styles.loginEmail, styles.textFieldBase)}
                                    name="email"
                                    placeholder='Email'
                                    onChange={onChange}
                                    required={true}
                                />
                            </Box>
                            {errors['email'] && <Typography sx={{color: 'red', fontSize: 12}}>{errors['email'] || ''}</Typography>}
                        </Stack>
                        <Stack className={styles.inputWrapper}>
                            <Box sx={{width: '100%',display: 'flex'}} alignItems={'center'}>
                                <em className={styles.inputIcon}><FaUnlockAlt style={{ color: "#ADB5BD" }} /></em>
                                <input
                                    className={cn(styles.loginEmail, styles.textFieldBase)}
                                    placeholder='Password'
                                    name="password"
                                    onChange={onChange}
                                    required={true}
                                    type="password"
                                />
                            </Box>
                            {errors['password'] && <Typography sx={{color: 'red', fontSize: 12}}>{errors['password'] || ''}</Typography>}
                        </Stack>
                        <div>
                            <button
                                style={{ float: "none" }}
                                className={cn('addButton', styles.submitButton)}
                                type='submit'
                            >
                                Sign in
                            </button>
                        </div>
                    </Stack>
                    {/*<TextField*/}
                    {/*    disableUnderline*/}
                    {/*    required*/}
                    {/*    // label="Username/Email"*/}
                    {/*    variant="filled"*/}
                    {/*    // className="loginTextFields"*/}
                    {/*    className={classes.root}*/}
                    {/*    name="email"*/}
                    {/*    placeholder='Email'*/}
                    {/*    onChange={(e) => setEmail(e.target.value)}*/}
                    {/*    InputProps={{*/}
                    {/*        style: {*/}
                    {/*            backgroundColor: "white",*/}
                    {/*            border: "1px solid lightgrey",*/}
                    {/*            verticalAlign: "centre",*/}
                    {/*        },*/}
                    {/*        startAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                <MdEmail style={{ color: "#ADB5BD" }} />*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    disableUnderline*/}
                    {/*    required*/}
                    {/*    // label="Password"*/}
                    {/*    type="password"*/}
                    {/*    autoComplete="current-password"*/}
                    {/*    variant="filled"*/}
                    {/*    placeholder='Password'*/}
                    {/*    // className="loginTextFields"*/}
                    {/*    className={classes.root}*/}
                    {/*    name="password"*/}
                    {/*    onChange={(e) => setPassword(e.target.value)}*/}
                    {/*    InputProps={{*/}
                    {/*        style: {*/}
                    {/*            backgroundColor: "white",*/}
                    {/*            border: "1px solid lightgrey",*/}
                    {/*        },*/}
                    {/*        startAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                <FaUnlockAlt style={{ color: "#ADB5BD" }} />*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}
                    
                </form>
            </div>
        </Paper>
    </Grid>
  );
};

export default Login;
