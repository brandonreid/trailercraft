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

  const freightlinerHighwayRequest = await bucket.getObjects({
    type: 'freightliner-highway-products',
    limit: 3
  });
  const freightlinerVocationalRequest = await bucket.getObjects({
    type: 'freightliner-vocational-products',
    limit: 3
  });
  const westernStarHighwayRequest = await bucket.getObjects({
    type: 'western-star-highway-products',
    limit: 3
  });
  const westernStarVocationalRequest = await bucket.getObjects({
    type: 'western-star-vocational-products',
    limit: 3
  });

  const freightHighway = freightlinerHighwayRequest.objects;
  const freightVocational = freightlinerVocationalRequest.objects;
  const wsHighway = westernStarHighwayRequest.objects;
  const wsVocational = westernStarVocationalRequest.objects;

  const columns = [
    {
      logoUrl: '/static/logo_freightliner.svg',
      logoAlt: 'Freightliner Logo',
      pageRoute: '/product',
      contentItems: [
        {
          itemTitle: 'Highway',
          moreLink: '/product-list/freightliner-highway-products',
          mobileTitle: 'Freightliner Highway',
          products: [
            ...freightHighway
          ]
        }, {
          itemTitle: 'Vocational',
          moreLink: '/product-list/freightliner-vocational-products',
          mobileTitle: 'Freightliner Vocational',
          products: [
            ...freightVocational
          ]
        }
      ]
    }, {
      logoUrl: '/static/logo_western-star.png',
      logoAlt: 'Western Star Logo',
      pageRoute: '/product',
      contentItems: [
        {
          itemTitle: 'Highway',
          moreLink: '/product-list/western-star-highway-products',
          mobileTitle: 'Western Star Highway',
          products: [
            ...wsHighway
          ]
        }, {
          itemTitle: 'Vocational',
          moreLink: '/product-list/western-star-vocational-products',
          mobileTitle: 'Western Star Vocational',
          products: [
            ...wsVocational
          ]
        }
      ]
    }
  ];

  return (
    <Subnav columns={columns} truckLink="true" />
  );
};

export default asyncReactor(SubnavTrucks, Loader);
