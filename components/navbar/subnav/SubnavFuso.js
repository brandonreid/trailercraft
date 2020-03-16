import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';

import Subnav from './Subnav';

function Loader() {
  return (
    <p>Loading</p>
  );
}

async function SubnavTrucks() {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });

  const fusosRequest = await bucket.getObjects({
    type: 'fuso-products',
    limit: 6
  });

  const fusos = fusosRequest.objects;

  const columns = [
    {
      logoUrl: '/static/logo_fuso.png',
      logoAlt: 'FUSO',
      contentItems: [
        {
          itemTitle: 'FUSO',
          moreLink: '/product-list/fuso-products',
          mobileTitle: 'FUSO',
          products: [
            ...fusos
          ]
        }
      ]
    }
  ];

  return (
    <Subnav columns={columns} />
  );
};

export default asyncReactor(SubnavTrucks, Loader);
