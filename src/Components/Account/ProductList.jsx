import React, { Component } from 'react'
import { BASE_URL, AJAX_REQUEST } from "../../Constants/AppConstants";
import ReactImageFallback from "react-image-fallback";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
      message: ''
    };

  }

  componentDidMount() {

    this.getData();

  }

  getData = () => {
    AJAX_REQUEST("GET", "getProducts", {}).then(results => {
      // console.log('res ', results);
      if (parseInt(results.code) === 1000) {

        this.setState({
          loading: false,
          products: results.data,
          message: results.message
        });
      } else {
        this.setState({
          loading: false,
          products: [],
          message: results.message
        });
      }
    });
  }

  render() {
    const { loading, message, products } = this.state;
    return (
      <>
        <h4 className='text-center'>Product List</h4>

        {
          loading ?

            <div className='loading'>Loading ...</div>

            :

            <>
              <table className="table table-bordered table-responsive">
                <thead>
                  <tr>
                    <th>#SL</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.length > 0 ?
                      <>
                        {
                          products.map(function (item, key) {
                            return (
                              <tr key={key}>
                                <td>{item.id}</td>
                                <td>
                                  <ReactImageFallback
                                    src={item.image}
                                    fallbackImage={require("../../Assets/images/no-image.png")}
                                    initialImage={require("../../Assets/images/no-image.png")}
                                    alt="img"
                                    title=""
                                    className=""
                                    height={60}
                                    width={60}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td className="text-right">{item.price}</td>
                              </tr>
                            )
                          })
                        }

                      </>

                      : <><tr><td colSpan={5}>{message}</td></tr></>
                  }

                </tbody>
              </table>
            </>
        }


      </>
    )
  }
}

export default ProductList