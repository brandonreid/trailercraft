import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';

import Subnav from './Subnav';

function Loader() {
  return (
    <p>Loading</p>
  );
}

async function SubnavPlows() {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });

  const westernVehicleMountedRequest = await bucket.getObjects({
    type: 'western-vehicle-mounted-products',
    limit: 3
  });
  const westernIndustrialRequest = await bucket.getObjects({
    type: 'western-industrial-products',
    limit: 3
  });
  const snowexProductRequest = await bucket.getObjects({
    type: 'snowex-products',
    limit: 3
  });

  const westernVehicleMounted = westernVehicleMountedRequest.objects;
  const westernIndustrial = westernIndustrialRequest.objects;
  const snowexProducts = snowexProductRequest.objects;
  

  const columns = [
    {
      logoUrl: '/static/logo_western.png',
      logoAlt: 'Western Logo',
      contentItems: [
        {
          itemTitle: 'Standard Vehicle Mounted Plows',
          moreLink: '/western-vehicle-mounted-products',
          mobileTitle: 'Western – Standard Vehicle Mounted Plows',
          products: [
            ...westernVehicleMounted
          ]
        }, {
          itemTitle: 'Industrial Plows',
          moreLink: '/western-industrial-plows',
          mobileTitle: 'Western – Industrial Plows',
          products: [
            ...westernIndustrial
          ]
        }
      ]
    }, {
      logoUrl: '/static/logo_snowex.jpg',
      logoAlt: 'SnowEx Logo',
      contentItems: [
        {
          itemTitle: 'Plows',
          moreLink: '/snowex-plows',
          mobileTitle: 'Snowex Plows',
          products: [
            ...snowexProducts
          ]
        }
      ]
    }
  ];

  return (
    <Subnav columns={columns} />
  );
};

export default asyncReactor(SubnavPlows, Loader);
