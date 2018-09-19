import Navbar from '../components/navbar/Navbar';
import Cosmic from 'cosmicjs';
import css from './index.scss';

const Index = ({data, heroWidth}) => (
  <div>
    <Navbar />
    <section
      className={`${css.homeHero} hero red-gradient`}
      style={{
        backgroundImage: `url(${data.home_hero_image.imgix_url}?w=${heroWidth})`
      }}>
      <div className={css.homeHeroText}>
        <h2>{ data.home_hero_title }</h2>
        <p>{ data.home_hero_text }</p>
      </div>
      <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
    </section>
    <section className={css.heritage}>
      <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
      <p>
        <strong>{ data.number_of_years_in_business }</strong>
        <span>Years of business,<br /> employing over { data.apx_number_of_alaskan_employees } Alaskans.</span>
      </p>
    </section>
    <section
      className={`${css.coreValue} hero top-left-pin`}
      style={{
        backgroundImage: `url(${data.core_value_background_image.imgix_url}?w={heroWidth})`
      }}>
      <div className={css.valueText}>
        <svg className={css.chevron}><use xlinkHref="#chevron" /></svg>
        <h2>{ data.core_value_title }</h2>
        <p>{ data.core_value_text }</p>
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
  // TODO: Find out how to get a better width after the view inits

  return {data, heroWidth};
}

export default Index;

// react error bounderies