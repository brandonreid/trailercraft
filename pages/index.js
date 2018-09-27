import Navbar from '../components/navbar/Navbar';
import Cosmic from 'cosmicjs';
import css from './index.scss';

const Index = ({data, heroWidth, advantageImgWidth}) => (
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
      <svg><use xlinkHref="#chevron" /></svg>
    </section>
    <section className={css.heritage}>
      <svg><use xlinkHref="#chevron" /></svg>
      <p>
        <strong>{ data.number_of_years_in_business }</strong>
        <span>Years of business,<br /> employing over { data.apx_number_of_alaskan_employees } Alaskans.</span>
      </p>
    </section>
    <section
      className={`${css.coreValue} hero top-left-pin`}
      style={{
        backgroundImage: `url(${data.core_value_background_image.imgix_url}?w=${heroWidth})`
      }}>
      <div className={css.valueText}>
        <svg><use xlinkHref="#chevron" /></svg>
        <h2>{ data.core_value_title }</h2>
        <p>{ data.core_value_text }</p>
      </div>
    </section>
    <section
      className={`${css.advantagesIntro} hero red-gradient`}
      style={{
        backgroundImage: `url(${data.advantages_intro_background_image.imgix_url}?w=${heroWidth})`
      }}>
      <svg><use xlinkHref="#chevron" /></svg>
      <div className={css.advantageText}>
        <h2>{ data.advantages_intro_header }</h2>
        <p>{ data.advantages_intro }</p>
      </div>
    </section>
    <section className={css.advantages}>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_1_image.imgix_url}?w=${advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_1_header }</h3>
          <p>{ data.advantages.advantage_1_text }</p>
        </div>
      </div>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_2_image.imgix_url}?w=${advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_2_header }</h3>
          <p>{ data.advantages.advantage_2_text }</p>
        </div>
      </div>
      <div className={css.advantage}>
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_3_header }</h3>
          <p>{ data.advantages.advantage_3_text }</p>
        </div>
        <img src={ `${data.advantages.advantage_3_image.imgix_url}?w=${advantageImgWidth}` } alt="" />
      </div>
      <div className={css.advantage}>
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_4_header }</h3>
          <p>{ data.advantages.advantage_4_text }</p>
        </div>
        <img src={ `${data.advantages.advantage_4_image.imgix_url}?w=${advantageImgWidth}` } alt="" />
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

  // TODO: Find out how to get a better width after the view inits
  let heroWidth = 1200;
  let advantageImgWidth = 400;

  return {data, heroWidth, advantageImgWidth};
}

export default Index;
