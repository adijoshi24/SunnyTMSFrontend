import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { signinFailure, signinSuccess } from "../../Redux/actions/actions";
import { Logo, ModalCloseHelper } from "../HelperCells";

class LoginModal extends Component {
  constructor({ showLoginModal }) {
    super();
    this.state = { modal: showLoginModal, fullscreen: true };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modal: nextProps.showLoginModal });
  }

  render() {
    return (
      // <Modal
      //   show={this.state.modal}
      //   onHide={this.handleCancel}
      //   className="loginModal"
      //   fullscreen={this.state.fullscreen}
      // >
      //   <Modal.Body>
      // <ModalCloseHelper clickFunc={this.handleCancel} />
      <div className="login">
        <Logo style={{ fontSize: "xx-large" }} />
        <TextField
          required
          label="Username/Email"
          variant="outlined"
          className="loginTextFields"
          name="email"
          onChange={(e) => this.onChange(e)}
        />
        <br />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="loginTextFields"
          name="password"
          onChange={(e) => this.onChange(e)}
        />
        <br />
        <p className="loginButton" onClick={this.submitLogin}>
          Log in
        </p>
        <p className="forgotButton">Forgot Password</p>
      </div>
      //    </Modal.Body>
      // </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(LoginModal));
