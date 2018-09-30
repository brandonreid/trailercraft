import Cosmic from 'cosmicjs';

import css from './parts-and-services.scss';

const PartsAndServices = ({data}) => (
  <div>
    <h1>Parts &amp; Services</h1>
    <p>{ JSON.stringify(data) }</p>
  </div>
);

PartsAndServices.getInitialProps = async () => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const request = await bucket.getObject({
    slug: 'parts-and-services'
  });
  const data = request.object.metadata;

  return {data};
}

export default PartsAndServices;
