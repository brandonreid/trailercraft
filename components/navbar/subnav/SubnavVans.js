import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';

import Subnav from './Subnav';

function Loader() {
  return (
    <p>Loading</p>
  );
}

async function SubnavVans() {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });

  const sprinterVanRequest = await bucket.getObjects({
    type: 'sprinter-van-products',
    limit: 6
  });

  const sprinterVans = sprinterVanRequest.objects;

  const columns = [
    {
      logoUrl: '/static/logo_sprinter.png',
      logoAlt: 'Sprinter Logo',
      contentItems: [
        {
          itemTitle: 'Sprinter Vans',
          moreLink: '/product-list/sprinter-van-products',
          mobileTitle: 'Sprinter Vans',
          products: [
            ...sprinterVans
          ]
        }
      ]
    }
  ];

  return (
    <Subnav columns={columns} />
  );
};

export default asyncReactor(SubnavVans, Loader);
