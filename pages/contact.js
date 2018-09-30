import Cosmic from 'cosmicjs';
import classNames from 'classnames';

import css from './contact.scss';

import BigContactCard from '../components/big-contact-card/BigContactCard';

const Contact = ({data, activeTab}) => (
  <div className={css.contactContainer}>
    <div className={css.containedContact}>
      <h1>Contact</h1>
      <div className={css.tabs}>
        <button
          className={classNames(
            { [css.active]: activeTab === 'anchorage' }
          )}
          onClick={() => {activeTab = 'anchorage'}}
        >Anchorage</button>
        <button
          className={classNames(
            { [css.active]: activeTab === 'fairbanks' }
          )}
          onClick={() => {activeTab = 'fairbanks';}}
        >Fairbanks</button>
      </div>
      <div className={classNames(
        css.tabContent,
        { [css.active]: activeTab === 'anchorage' }
      )}>
        <BigContactCard data={data.anchorage} locationName='Anchorage' />
      </div>

      <div className={classNames(
        css.tabContent,
        { [css.active]: activeTab === 'fairbanks' }
      )}>
        <BigContactCard data={data.fairbanks} locationName='Fairbanks' />
      </div>
    </div>
  </div>
);

Contact.getInitialProps = async () => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const request = await bucket.getObject({
    slug: 'contact'
  });
  const data = request.object.metadata;

  let activeTab = 'anchorage';

  return {data, activeTab};
}

export default Contact;