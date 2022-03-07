import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {Typography} from '@mui/material';
import { BsBellFill } from "react-icons/bs";
import { logout } from "../../Redux/actions/actions";

class Topbar extends Component {
  logout = () => {
    this.props.dispatch(logout());
    this.props.history.push("/");
  };
  render() {
    let title;
    switch (window.location.pathname) {
      case "/dashboard":
        title = "Dashboard";
        break;
      case "/customers":
        title = "Customers";
        break;
      case "/operations-reps":
        title = "Operations Reps";
        break;
      case "/loads":
        title = "Loads";
        break;
      case "/invoices":
        title = "Invoices";
        break;
      case "/customer-reps":
        title = "Customer Reps";
        break;
      case "/carriers":
        title = "Carriers";
    }
    return (
      <div className="topBar">
        <Typography variant='h5'>{title}</Typography>
        <div style={{flex: "1"}}/>
        <BsBellFill
          style={{
            marginTop: "5px",
          }}
          onClick={() => this.logout()}
        />
        <span style={{ marginLeft: "20px" }}>
          Hi {this.props.user && this.props.user.name}
        </span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(Topbar));
