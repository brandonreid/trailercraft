import React from 'react';
import Cosmic from 'cosmicjs';
import classNames from 'classnames';
import Head from 'next/head';

import css from './inventory.scss';

import InventoryItem from './inventory-item';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'trucks'
    }

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentDidMount() {
    if (window && window.location) {
      // check route param and assign the location if there is one.
      const vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      if (vars && vars.tab !== undefined) {
        if (this.props.products[vars.tab] !== undefined
            && this.props.products[vars.tab].length > 0) {
          this.setState({
            activeTab: vars.tab
          });
        }
      }
    }
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
      buses: [],
      vans: [],
      plows: [],
      trailers: []
    };

    if (request.objects) {
      products.trucks = request.objects.filter((item) => {
        return item.metadata.category === 'Truck';
      });
      products.buses = request.objects.filter((item) => {
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
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Current Inventory"
          />
          <title>TrailerCraft, Inc – Current Inventory</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="The current inventory of products available at TrailerCraft, Ink. in Anchorage and/or Fairbanks."
          />
        </Head>
        <div className={css.inventoryWrapper}>
          <h1>Current Inventory</h1>
          <div className={css.filters}>
            <div className="tab-list collapse-xs">
              <a className={classNames(css.vanLink, 'button-style')} href="http://www.anchorage.ftlvansdealer.com/inventory" target="_blank">
                View Our Sprinter Van Inventory
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523
                          243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569
                          0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255
                          0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384
                          303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381
                          64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49
                          48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z"></path>
                </svg>
              </a>
              <button
              className={classNames('tab-item', {'active': activeTab === 'trucks'})}
              onClick={() => setActiveTab('trucks')}
              >Trucks ({ products.trucks.length })</button>
              {products.buses.length > 0 && (
                <button
                  className={classNames('tab-item', {'active': activeTab === 'buses'})}
                  onClick={() => setActiveTab('buses')}
                >Buses ({ products.buses.length })</button>
              )}
              {products.plows.length > 0 && (
                <button
                  className={classNames('tab-item', {'active': activeTab === 'plows'})}
                  onClick={() => setActiveTab('plows')}
                >Plows ({ products.plows.length })</button>
              )}
              {products.trailers.length > 0 && (
                <button
                  className={classNames('tab-item', {'active': activeTab === 'trailers'})}
                  onClick={() => setActiveTab('trailers')}
                >Trailers ({ products.trailers.length })</button>
              )}
            </div>
          </div>
          {products[activeTab].length < 1 && (
            <p className={css.noItems}>
              There are currently no inventory items to show for this category.
            </p>
          )}
          {products[activeTab].map((product, i) => (
            <InventoryItem product={product} key={i} />
          ))}
        </div>
      </div>
    );
  }
};

export default Inventory;
