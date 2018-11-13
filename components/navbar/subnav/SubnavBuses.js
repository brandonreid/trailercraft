import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';

import Subnav from './Subnav';

function Loader() {
  return (
    <p>Loading</p>
  );
}

async function SubnavBuses() {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });

  const busesRequest = await bucket.getObjects({
    type: 'bus-products',
    limit: 6
  });

  const buses = busesRequest.objects;

  const columns = [
    {
      logoUrl: '/static/logo_blue-bird.png',
      logoAlt: 'Blue Bird Logo',
      contentItems: [
        {
          itemTitle: 'Buses',
          moreLink: '/product-list/bus-products',
          mobileTitle: 'Blue Bird Buses',
          products: [
            ...buses
          ]
        }
      ]
    }
  ];

  return (
    <Subnav columns={columns} />
  );
};

export default asyncReactor(SubnavBuses, Loader);
