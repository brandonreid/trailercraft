import Navbar from '../components/navbar/Navbar';
import Cosmic from 'cosmicjs';
import css from './index.scss';

const Index = ({data, heroWidth}) => (
  <div>
    <Navbar />
    <section
      className={css.homeHero}
      style={{
        backgroundImage: `url(${data.home_hero_image.imgix_url}?w=${heroWidth})`
      }}>
      <div className={css.homeHeroText}>
        <h2>{data.home_hero_title}</h2>
        <p>{data.home_hero_text}</p>
      </div>
    </section>
  </div>
);

Index.getInitialProps = async () => {
  const api = Cosmic();
  const bucket = api.bucket({
    slug: process.env.COSMIC_BUCKET,
    read_key: process.env.COSMIC_READ_KEY,
    write_key: process.env.COSMIC_WRITE_KEY
  });
  const request = await bucket.getObject({
    slug: 'home'
  });
  const data = request.object.metadata;

  let heroWidth = 1200;

  return {data, heroWidth};
}

export default Index;

// react error bounderies