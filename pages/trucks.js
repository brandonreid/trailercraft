import Cosmic from 'cosmicjs';

import Textarea from '../components/textarea-filter';

import css from './trucks.scss';

const Trucks = ({title, data}) => (
  <div className={css.trucksContainer}>
    <h1>{ title }</h1>
    <img
      src={`${data.product_image.imgix_url}`}
      alt={`${title} Image`}
    />
    <p>
      <Textarea text={data.product_description} />
    </p>
    {console.log(data)}
    {data.manufacturers_product_link_url && (
      <p>
        <a href={data.manufacturers_product_link_url} target="_blank">
          Learn More from the Manufacturer
        </a>
      </p>
    )}
  </div>
);

Trucks.getInitialProps = async ({ query: { slug }}) => {
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

export default Trucks;
