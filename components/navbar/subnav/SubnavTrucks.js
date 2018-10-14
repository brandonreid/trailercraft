import React from 'react';
import Cosmic from 'cosmicjs';
import Link from 'next/link';
import classNames from 'classnames';

import css from './Subnav.scss';

class SubnavTrucks extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {open, freightHighway} = this.props;
    return (
      <div className={classNames(css.subnavWrapper, {
        [css.show]: open
      })}>
        <div className={css.subnavContainer}>
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
      <p>{ JSON.stringify(freightHighway) }</p>
              </div>
              <div className={css.subContentItem}>
                <div className={css.sciHeader}>
                  <p>Vocational</p>
                  <Link href="#0"><a>More</a></Link>
                </div>
      <p>data</p>
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
      <p>{ JSON.stringify(freightHighway) }</p>
              </div>
              <div className={css.subContentItem}>
                <div className={css.sciHeader}>
                  <p>Vocational</p>
                  <Link href="#0"><a>More</a></Link>
                </div>
      <p>data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

SubnavTrucks.getInitialProps = async () => {
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
  const freightHighway = freightlinerHighwayRequest.objects;

  return {freightHighway};
}

export default SubnavTrucks;
