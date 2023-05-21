import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SET_COOKIE, ENABLE_MEAL } from "../Constants/AppConstants";
import requireCustAuth from "../Uitls/requireAuth";

import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";


import Home from "../Components/Home";
import Products from "../Components/Pages/Products";
import MyAccount from "../Components/Account/MyAccount";
import PageNotFound from "../Components/Pages/PageNotFound";
import Downtime from "../Components/Pages/Downtime";

class CommonRoutes extends Component {
    constructor(props) {
        super(props);

        const url = new URL(window.location.href);
        
        const site = url.searchParams.get("site");
        if (site) {
            SET_COOKIE("site", site);
        }
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} exact strict />
                <Route path="/register" component={Register} exact strict />
                <Route path="/" component={Home} exact strict />
                <Route path="/products" component={Products} exact strict />
                <Route path="/my-account" component={requireCustAuth(MyAccount)} exact strict />
                <Route path="/error" component={Downtime} exact strict />
                {/* <Route component={PageNotFound} exact strict /> */}
            </Switch>
        );
    }
}

export default withRouter(CommonRoutes);