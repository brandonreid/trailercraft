import React from 'react';
import Cosmic from 'cosmicjs';

import css from './freightliner-highway.scss';

class FreightlinerHighway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroWidth: 768
    }
  }

  static async getInitialProps() {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const pageRequest = await bucket.getObject({
      slug: 'freightliner-highway-products'
    });
    const trucksListRequest = await bucket.getObjects({
      type: 'freightliner-highway-products'
    });

    const pageData = pageRequest.object.metadata;
    const trucks = trucksListRequest.objects;
  
    return {pageData, trucks};
  }

  componentDidMount() {
    if (window && window.innerWidth) {
      const windowWidth = window.innerWidth;
      let majorWidth = windowWidth;

      if (windowWidth > 768) {
        majorWidth = windowWidth - (windowWidth / 6);
      }

      this.setState({
        heroWidth: Math.ceil(majorWidth)
      });
    }
  }

  render() {
    const {heroWidth} = this.state;
    const {
      pageData: {
        hero_image,
        hero_text
      },
      trucks
    } = this.props;
    return (
      <div>
        <div
          className={`${css.heroContainer} hero`}
          style={{
            backgroundImage: `url(${hero_image.imgix_url}?w=${heroWidth})`
          }}
        >
          <div className={css.heroContent}>
            <img src="/static/logo_freightliner.svg" alt="Freightliner Logo"/>
            <p>{ hero_text }</p>
          </div>
        </div>
        <div className={css.productList}>
          {trucks.map(({title, metadata}, i) => (
            <div className={css.product} key={i}>
              <div
                className={css.productImgContainer}
                style={{
                  backgroundImage: `url(${metadata.product_image.imgix_url}?w=500)`
                }}
              >
                <h3>{ title }</h3>
              </div>
              <div className={css.productDescription}>
                <p>{ metadata.product_description }</p>
                {metadata.manufacturers_product_link_url && (
                  <p>
                    <a
                      href={metadata.manufacturers_product_link_url}
                      target="_blank"
                    >Learn more from the manufacturer.</a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={css.callToAction}>
          <h2>ADD CALL TO ACTION</h2>
        </div>
      </div>
    );
  }
}

export default FreightlinerHighway;
