import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Grid, Typography} from '@mui/material';
import {BsBellFill} from "react-icons/bs";
import {logout} from "../../Redux/actions/actions";

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
            <Grid container padding={2} sx={{pl: 4, pr: 4}} flexWrap={'wrap'}>
                <div style={{flex: "1", textAlign: 'left'}}>
                    <Typography variant='h5'>{title}</Typography>
                </div>
                <Grid item alignItems={'center'} display={'flex'} gap={1}>
                    <BsBellFill
                        title={'Logout'}
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => this.logout()}
                    />
                    {this.props.user && <span>
                        Hi {this.props.user.name}
                    </span>}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.Login};
};
export default withRouter(connect(mapStateToProps)(Topbar));
