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
      contentItems: [
        {
          itemTitle: 'Highway',
          moreLink: '/freightliner-highway',
          products: [
            ...freightHighway
          ]
        }, {
          itemTitle: 'Vocational',
          moreLink: '/freightliner-vocational',
          products: [
            ...freightVocational
          ]
        }
      ]
    }, {
      logoUrl: '/static/logo_western-star.png',
      logoAlt: 'Western Star Logo',
      contentItems: [
        {
          itemTitle: 'Highway',
          moreLink: '/western-star-highway',
          products: [
            ...wsHighway
          ]
        }, {
          itemTitle: 'Vocational',
          moreLink: '/western-star-vocational',
          products: [
            ...wsVocational
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
