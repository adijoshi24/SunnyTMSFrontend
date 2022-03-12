import React, { Component } from "react";
import Topbar from "../Sidebar/Topbar";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
    document.body.style.backgroundColor = "rgba(173, 173, 173, 0.2)";
  }

  componentDidMount = () => {
    if (!this.props.user.auth) {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <>
        <div className="tableContent">
          <Topbar />
          Dashboard
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.Login };
};
export default withRouter(connect(mapStateToProps)(Dashboard));
