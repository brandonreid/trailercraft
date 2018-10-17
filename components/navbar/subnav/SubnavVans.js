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
    limit: 3
  });
  const backcountryVanRequest = await bucket.getObjects({
    type: 'backcountry-van-products',
    limit: 3
  });

  const sprinterVans = sprinterVanRequest.objects;
  const backcountryVans = backcountryVanRequest.objects;

  const columns = [
    {
      logoUrl: '/static/logo_sprinter.png',
      logoAlt: 'Sprinter Logo',
      contentItems: [
        {
          itemTitle: 'Sprinter Vans',
          moreLink: '/sprinter-vans',
          mobileTitle: 'Sprinter Vans',
          products: [
            ...sprinterVans
          ]
        }
      ]
    }, {
      logoUrl: '/static/logo_back-country-vans.png',
      logoAlt: 'Backcountry Vans Logo',
      contentItems: [
        {
          itemTitle: 'Backcountry Vans',
          moreLink: '/backcountry-vans',
          mobileTitle: 'Backcountry Vans',
          products: [
            ...backcountryVans
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
