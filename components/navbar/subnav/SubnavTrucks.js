import React from 'react';
import { asyncReactor } from 'async-reactor';
import Cosmic from 'cosmicjs';
import Link from 'next/link';

import css from './Subnav.scss';

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

  return (
    <div className={css.componentContainer}>
      <div className={css.column}>
        <div className={css.logoContainer}>
          <div className={css.logo}>
            <img src="/static/logo_freightliner.svg" alt="Freightliner Logo"/>
          </div>
        </div>
        <div className={css.colContent}>
          <div className={css.subContentItem}>
            <div className={css.sciHeader}>
              <p>Highway</p>
              <Link href="#0"><a>More</a></Link>
            </div>
            <div className={css.sciItems}>
              {freightHighway.map(({title, metadata}, i) => (
                <Link href="#0" key={i}>
                  <a
                    className={css.sciItem}
                    style={{
                      backgroundImage: `url(${metadata.product_image.imgix_url}?w=300)`
                    }}
                  >
                    <span>{ title }</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className={css.subContentItem}>
            <div className={css.sciHeader}>
              <p>Vocational</p>
              <Link href="#0"><a>More</a></Link>
            </div>
            <div className={css.sciItems}>
              {freightVocational.map(({title, metadata}, i) => (
                <Link href="#0" key={i}>
                  <a
                    className={css.sciItem}
                    style={{
                      backgroundImage: `url(${metadata.product_image.imgix_url}?w=300)`
                    }}
                  >
                    <span>{ title }</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={css.column}>
        <div className={css.logoContainer}>
          <div className={css.logo}>
            <img src="/static/logo_western-star.png" alt="Western Star Logo"/>
          </div>
        </div>
        <div className={css.colContent}>
          <div className={css.subContentItem}>
            <div className={css.sciHeader}>
              <p>Highway</p>
              <Link href="#0"><a>More</a></Link>
            </div>
            <div className={css.sciItems}>
              {wsHighway.map(({title, metadata}, i) => (
                <Link href="#0" key={i}>
                  <a
                    className={css.sciItem}
                    style={{
                      backgroundImage: `url(${metadata.product_image.imgix_url}?w=300)`
                    }}
                  >
                    <span>{ title }</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className={css.subContentItem}>
            <div className={css.sciHeader}>
              <p>Vocational</p>
              <Link href="#0"><a>More</a></Link>
            </div>
            <div className={css.sciItems}>
              {wsVocational.map(({title, metadata}, i) => (
                <Link href="#0" key={i}>
                  <a
                    className={css.sciItem}
                    style={{
                      backgroundImage: `url(${metadata.product_image.imgix_url}?w=300)`
                    }}
                  >
                    <span>{ title }</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default asyncReactor(SubnavTrucks, Loader);
