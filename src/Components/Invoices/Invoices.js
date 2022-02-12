import React, { Component } from "react";
import Topbar from "../Sidebar/Topbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Invoices extends Component {
  componentDidMount = () => {
    if (!this.props.user.auth) {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div className="invoices">
        <div className="tableContent">
          <Topbar />
          Invoices
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(Invoices));
