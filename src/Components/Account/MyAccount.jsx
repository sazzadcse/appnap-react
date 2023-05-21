import React, { Component } from 'react'

import ProductList from '../../Components/Account/ProductList'
import CreateProduct from '../../Components/Account/CreateProduct'

export class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectPage: 'list',
        loading: false
    };

    document.title = "Dashboard | Product Managment";

  }

  activePage = (e, page) => {
    e.preventDefault();
      this.setState({ selectPage : page });
  }

  render() {

      const { loading, selectPage } = this.state;

    return (
      <>

        <div className="d-flex p-4" id="wrapper">

          <div className="border-end bg-white" id="sidebar-wrapper">
            <div className="list-group list-group-flush">
            <a
                className={selectPage == 'list' ? 'activeMenu list-group-item list-group-item-action list-group-item-light p-3' : 'list-group-item list-group-item-action list-group-item-light p-3'}
                href="#"
                onClick={(e) =>this.activePage(e, 'list')}
              >Product List</a>
            <a
                className={ selectPage == 'create' ? 'activeMenu list-group-item list-group-item-action list-group-item-light p-3' : 'list-group-item list-group-item-action list-group-item-light p-3'}
                href="#"
                onClick={(e) => this.activePage(e, 'create') }
              >Create Product</a>
            </div>
          </div>

          <div id="page-content-wrapper" className="w-75">

            <div className="container-fluid">
              
              {
                  selectPage == 'list' ? <ProductList /> : <CreateProduct />
              }
              
            </div>
          </div>
        </div>

      </>
    )
  }
}

export default MyAccount;