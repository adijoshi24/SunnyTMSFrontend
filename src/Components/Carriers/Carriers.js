import React, { Component } from "react";
import Topbar from "../Sidebar/Topbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Carriers extends Component {
  componentDidMount = () => {
    if (!this.props.user.auth) {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div className="carriers">
        <div className="tableContent">
          <Topbar />
          Table
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(Carriers));
