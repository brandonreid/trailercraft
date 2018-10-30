import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';

import css from './product-list.scss';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroWidth: 768
    }
  }

  static async getInitialProps({ query: {slug} }) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const pageRequest = await bucket.getObject({
      slug
    });
    const productListRequest = await bucket.getObjects({
      type: slug
    });

    const pageData = pageRequest.object.metadata;
    const products = productListRequest.objects;
  
    return {pageData, products};
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
        hero_text,
        manufacturer_logo
      },
      products
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
            <img src={manufacturer_logo.imgix_url} alt="Manufacturer Logo"/>
            <p>{ hero_text }</p>
          </div>
        </div>
        <div className={css.productList}>
          {products && products.length > 0 && products.map(({title, metadata}, i) => (
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
                { renderHTML(metadata.product_description) }
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
          <div className={css.ctaContent}>
            <h2>Call or stop by to learn more.</h2>

          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
