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
            content="The current inventory of products available at Trailercraft, Ink. in Anchorage and/or Fairbanks."
          />
        </Head>
        <div className={css.inventoryWrapper}>
          <h1>Current Inventory</h1>
          <div className={css.filters}>
            <div className="tab-list collapse-xs">
              <a className={css.vanLink} href="http://www.anchorage.ftlvansdealer.com/new-cars-anchorage-ak" target="_blank">
                View our Sprinter Van inventory.
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
