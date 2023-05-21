import React, { Component } from 'react';
// import Parser from 'html-react-parser';

class Downtime extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <main className="error404Img">
                            { <img className="" src={require('../../Assets/images/404.png')} />}
                        </main>
                    </div>
                    <div className="col-md-6">
                        <div className="sitedown_container mt-250">
                            <h2> Opps : Something Wrong!! </h2>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>

        );
    }
}

export default Downtime;