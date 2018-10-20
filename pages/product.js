import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';

import css from './product.scss';

const Product = ({title, data}) => (
  <div className={css.productContainer}>
    <h1>{ title }</h1>
    <img
      src={`${data.product_image.imgix_url}`}
      alt={`${title} Image`}
    />
    { renderHTML(data.product_description) }
    {data.manufacturers_product_link_url && (
      <p>
        <a href={data.manufacturers_product_link_url} target="_blank">
          Learn More from the Manufacturer
        </a>
      </p>
    )}
    <p>Call or stop by to learn more.</p>
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

  return {title, data};
}

export default Product;
