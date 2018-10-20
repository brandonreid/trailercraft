import Cosmic from 'cosmicjs';

import css from './inventory.scss';

const Inventory = ({data}) => (
  <div>
    <h1>Current Inventory</h1>
    <p>{ JSON.stringify(data) }</p>
  </div>
);

Inventory.getInitialProps = async () => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const request = await bucket.getObjects({
    type: 'current-inventories'
  });
  const data = request.objects;

  return {data};
}

export default Inventory;
