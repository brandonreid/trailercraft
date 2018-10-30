import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';
import Head from 'next/head';

import css from './product.scss';

const Product = ({title, data, slug}) => (
  <div>
    <Head>
      {/* Title must be 60 to 120 characters. */}
      <meta
        name="title"
        content={`TrailerCraft, Inc – Product – ${title}`}
      />
      <title>TrailerCraft, Inc – Product – {title}</title>
      {/* Description must not exceed 300 characters. */}
      <meta
        name="description"
        content="Available at TrailerCraft Inc. in Anchorage or Fairbanks."
      />
    </Head>
    <div className={css.productContainer}>
      <div className={css.product}>
        <div
          className={css.productImgContainer}
          style={{
            backgroundImage: `url(${data.product_image.imgix_url}?w=500)`
          }}
        >
          <h1>{ title }</h1>
        </div>
        <div className={css.productDescription}>
          { renderHTML(data.product_description) }
          {data.manufacturers_product_link_url && (
            <p>
              <a
                href={data.manufacturers_product_link_url}
                target="_blank"
              >Learn more from the manufacturer.</a>
            </p>
          )}
        </div>
      </div>
    </div>
    <div className={css.callToAction}>
      <div className={css.ctaContent}>
        <h2>Call or stop by to learn more.</h2>
      </div>
    </div>
  </div>
);

Product.getInitialProps = async ({ query: { slug }}) => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const request = await bucket.getObject({
    slug
  });

  const title = request.object.title;
  const data = request.object.metadata;

  return {title, data, slug};
}

export default Product;
