import React, { Component } from 'react'
import { BASE_URL, AJAX_REQUEST, AJAX_REQUEST_WITH_FILE } from "../../Constants/AppConstants";
import distProductCreate from '../../Validation/distProductCreate';
import AlertWrapper from '../Common/AlertWrapper';
import AlertWrapperSuccess from '../Common/AlertWrapperSuccess';

import history from "../../history";

export class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            category: '',
            image: {},

            data: [],

            errors: {},
            isValid: false,
            isLoading: false,
            isFormValid: true,
            server_message: '',
            success_alert_wrapper_show: false,

        };

    }

    onSubmit = (e) => {
        e.preventDefault();
        const val_return = distProductCreate(this.state);
        this.setState(val_return);

        if (val_return.isValid) {

            let data = new FormData();
            data.append('name', this.state.name);
            data.append('price', parseInt(this.state.price));
            data.append('category', this.state.category);
            data.append('image', this.state.image);

            this.setState({ errors: {}, isLoading: true });

            AJAX_REQUEST_WITH_FILE("POST", "createProduct", data).then(results => {

                if (parseInt(results.code) === 1000) {

                    this.setState({
                        isLoading: false,
                        isFormValid: true,
                        server_message: results.message,
                        success_alert_wrapper_show: true,
                        name: '',
                        price: '',
                        category: '',
                        image: '',
                    });
                    history.push("/my-account");
                } else {
                    this.setState({
                        server_message: results.message,
                        isLoading: false,
                        isFormValid: false,
                        success_alert_wrapper_show: false,
                    });

                    history.push("/my-account");

                }
            });

        }
    }

    handalerSetImage = (e) => {
        var image = e.target.files[0];
        console.log( 'image ', );
    }

    render() {

        const { isLoading, name, price, image, category, server_message } = this.state;
        const errors_data = server_message;

        return (
            <>
                <div className="container">

                    <div className="row">
                        <div className="col-sm-6 offset-3 p-4">
                            <h4 className="card-title mt-3 text-center">Create Product</h4>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-sm-6 offset-3">

                            <AlertWrapper errors_data={errors_data} isFormValid={this.state.isFormValid} />
                            <AlertWrapperSuccess errors_data={errors_data} success_alert_wrapper_show={this.state.success_alert_wrapper_show} />

                            <form onSubmit={this.onSubmit} method="post">

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="name">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="price">Product Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => this.setState({ price: e.target.value })}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="category">Product Category</label>
                                    <select name="category" id="category" className="form-control" onChange={(e) => this.setState({ category: e.target.value })}>
                                        <option value="">Please Select ..</option>
                                        <option value="electronice">Electronice</option>
                                        <option value="laptop">Laptop</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="monitor">Monitor</option>
                                    </select>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="image">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="form-control"
                                        onChange={(e) => this.setState({ image: e.target.files[0] })}
                                    /> 
                                </div>


                                <button
                                    disabled={this.state.isLoading}
                                    type="submit" className="btn btn-primary btn-block mb-4">{this.state.isLoading ? 'Please Wait...' : 'Save'}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateProduct