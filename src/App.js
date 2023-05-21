import React, { Fragment, Component } from "react";

import "font-awesome/css/font-awesome.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Assets/css/style.css';

import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";

import Downtime from "./Components/Pages/Downtime";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import CommonRoutes from "./Routes/CommonRoutes";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      downtime: false,
      downtime_msg:
        "<h3>Down for maintenance</h3><p>Site is temporarily unavailable due to planned maintenance.</p>"
    };

  }



  render() {
    // const cur_url = window.location.href;
    return (
        <Fragment>
            {this.state.downtime ? (
                <Downtime downtime_msg={this.state.downtime_msg} disableDowntime={this.disableDowntime} />
            ) : (
                <Fragment>
                    {this.state.loading ? (
                        <div className="home-loading" />
                    ) : (
                        <Fragment>
                            <Header />
                            <div className="site-wrapper">
                                <CommonRoutes />
                            </div>
                            <Footer />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}

}

export default App;
