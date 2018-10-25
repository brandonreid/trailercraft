import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';
import classNames from 'classnames';

import css from './inventory.scss';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'trucks'
    }

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  static async getInitialProps() {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const request = await bucket.getObjects({
      type: 'current-inventories'
    });

    const products = {
      trucks: [],
      busses: [],
      vans: [],
      plows: [],
      trailers: []
    };

    if (request.objects) {
      products.trucks = request.objects.filter((item) => {
        return item.metadata.category === 'Truck';
      });
      products.busses = request.objects.filter((item) => {
        return item.metadata.category === 'Bus';
      });
      products.vans = request.objects.filter((item) => {
        return item.metadata.category === 'Van';
      });
      products.plows = request.objects.filter((item) => {
        return item.metadata.category === 'Plow';
      });
      products.trailers = request.objects.filter((item) => {
        return item.metadata.category === 'Trailer';
      });
    }

    return {products};
  }

  setActiveTab(type) {
    this.setState({activeTab: type});
  }

  render() {
    const { products } = this.props;
    const { setActiveTab } = this;
    const { activeTab } = this.state;

    return (
      <div className={css.inventoryContainer}>
        <div className={css.inventoryWrapper}>
          <h1>Current Inventory</h1>
          <div className={css.filters}>
            <div className="tab-list collapse-xs">
              <button
                className={classNames('tab-item', {'active': activeTab === 'trucks'})}
                onClick={() => setActiveTab('trucks')}
              >Trucks ({ products.trucks.length })</button>
              <button
                className={classNames('tab-item', {'active': activeTab === 'busses'})}
                onClick={() => setActiveTab('busses')}
              >Busses ({ products.busses.length })</button>
              <button
                className={classNames('tab-item', {'active': activeTab === 'vans'})}
                onClick={() => setActiveTab('vans')}
              >Vans ({ products.vans.length })</button>
              <button
                className={classNames('tab-item', {'active': activeTab === 'plows'})}
                onClick={() => setActiveTab('plows')}
              >Plows ({ products.plows.length })</button>
              <button
                className={classNames('tab-item', {'active': activeTab === 'trailers'})}
                onClick={() => setActiveTab('trailers')}
              >Trailers ({ products.trailers.length })</button>
            </div>
          </div>
          <div className={css.invItems}>
            {console.log(products[activeTab])}
            {products[activeTab].length < 1 && (
              <p className={css.noItems}>
                There are currently no inventory items to show for this category.
              </p>
            )}
            {products[activeTab].map(({
              title,
              metadata: {
                description,
                detailed_specs,
                featured_image,
                list_price,
                new_or_used,
                product_images,
                location_of_item
              }
            }, i) => (
              <div className={css.productItem} key={i}>
                <div
                  className={css.productImg}
                  style={{
                    backgroundImage: `url(${featured_image.imgix_url}?w=600)`
                  }}
                >
                  {list_price !== "" ? (
                    <p>${ list_price }</p>
                  ) : (
                    <p>Call for Price</p>
                  )}
                </div>
                <div className={css.productInfo}>
                  <h3>
                    { title }
                    {new_or_used === "Used" && (
                      <span> (Preowned)</span>
                    )}
                  </h3>
                  <p className={css.productLocation}>
                    Current Location: { location_of_item }
                  </p>
                  <div className={css.productDescription}>
                    { renderHTML(description) }
                    <button>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Inventory;
