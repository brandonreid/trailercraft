import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';

import Subnav from './Subnav';

function Loader() {
  return (
    <p>Loading</p>
  );
}

async function SubnavTrailers() {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });

  const doepkerRequest = await bucket.getObjects({
    type: 'doepker-products',
    limit: 3
  });
  const fellingTrailersRequest = await bucket.getObjects({
    type: 'felling-trailers-products',
    limit: 3
  });

  const doepkerProducts = doepkerRequest.objects;
  const fellingTrailerProducts = fellingTrailersRequest.objects;
  

  const columns = [
    {
      logoUrl: '/static/logo_doepker.jpg',
      logoAlt: 'Doepker Logo',
      contentText: `
        <p>
          We sell and service Doepker Trailer products.
          Learn more about Doepker product selections at <a href="http://doepker.com/" target="_blank">doepker.com</a>
        </p>
      `
    }, {
      logoUrl: '/static/logo_felling-trailers.jpg',
      logoAlt: 'Felling Trailers Logo',
      contentText: `
        <p>
          We sell and service Felling Trailers products.
          Learn more about Felling Trailers at <a href="https://www.felling.com/" target="_blank">felling.com</a>
        </p>
      `
    }
  ];

  return (
    <Subnav columns={columns} />
  );
};

export default asyncReactor(SubnavTrailers, Loader);
