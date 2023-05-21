import React, { Component } from 'react';
import { BASE_URL, AJAX_PUBLIC_REQUEST } from "../../Constants/AppConstants";
import ReactImageFallback from "react-image-fallback";

export class Products extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      message: '',
      products: []
    }

    document.title = "Home | Product Managment";

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AJAX_PUBLIC_REQUEST("GET", "getAllProducts", {}).then(results => {
      if (parseInt(results.code) === 1000) {
        this.setState({
          products: results.data,
          loading: false,
          message: results.message
        });
      } else {
        this.setState({
          message: "No data found",
          loading: false,
        })
      }
    });
  }

  render() {

    const { loading, message, products } = this.state;

    return (
      <>
        <div className="main-container ptb25">
          <div className="container">

            {
              loading ? <div className='loading'>Loading ...</div> :

                <>
                  {
                    products.length > 0 ?

                      <>

                        {
                          products.map(function (item, key) {
                            return (
                              <div key={key} className="row mt-25">
                                <div className="col-sm-4 col-xs-12 border-1 p15-10">
                                  <div className="product-top-content">
                                    <span className="product-top-let">
                                      New
                                    </span>
                                    <span className="product-top-right">
                                      -10.00$
                                    </span>
                                  </div>
                                  <div className="product-img-wrapper">
                                  <ReactImageFallback
                                    src={item.image}
                                    fallbackImage={require("../../Assets/images/no-image.png")}
                                    initialImage={require("../../Assets/images/no-image.png")}
                                    alt="img"
                                    title=""
                                    className=""
                                  />
                                  </div>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                  <h2 className="product-title">{item.name}</h2>
                                  <p className="stars">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                  </p>
                                  <div className="product-price">
                                    <span className="offer-price">${item.price}.00</span>
                                    <span className="save-price">SAVE $108.00</span>
                                    <span className="regular-price">${item.price}.00</span>
                                  </div>
                                  <p className="product-description">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
                                  </p>

                                  <div className="color-attr">
                                    <label htmlFor="" className="color-attr-label">Color</label>
                                    <div className="product-color">
                                      <span className="active-color-attr"></span>
                                      <span></span>
                                    </div>
                                  </div>

                                  <div className="product-qty-container">
                                    <label htmlFor="" className="qty-attr-label">Quantity</label>
                                    <div className="product-qty">
                                      <input className="qty-text" type="number" value="1" min="1" size="4" />
                                    </div>
                                  </div>

                                  <div className="add-to-cart-btn-area">
                                    <button className="btn-add-to-cart" type='button' name="add-to-cart" value="add_to_cart">Add To Cart</button>
                                  </div>

                                  <div className="product-footer">
                                    <span className="add-to-compare"><i class="fa fa-refresh" aria-hidden="true"></i> Add To Compare</span>
                                    <span className="add-to-wishlist"><i class="fa fa-heart" aria-hidden="true"></i> Add To Wishlist</span>
                                  </div>

                                </div>
                              </div>
                            )
                          })
                        }

                      </>


                      : <div>No data found</div>
                  }
                </>
            }


          </div>
        </div>
      </>

    )
  }
}

export default Products;