import Cosmic from 'cosmicjs';

import css from './index.scss';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Index = ({data, imgWidths}) => (
  <div>
    <Navbar />
    <section
      className={`${css.homeHero} hero red-gradient`}
      style={{
        backgroundImage: `url(${data.home_hero.home_hero_image.imgix_url}?w=${imgWidths.heroWidth})`
      }}>
      <div className={css.homeHeroText}>
        <h2>{ data.home_hero.home_hero_title }</h2>
        {data.home_hero.home_hero_text
          && <p>{ data.home_hero.home_hero_text }</p>}
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
        backgroundImage: `url(${data.core_value.core_value_background_image.imgix_url}?w=${imgWidths.heroWidth})`
      }}>
      <div className={css.valueText}>
        <svg><use xlinkHref="#chevron" /></svg>
        <h2>{ data.core_value.core_value_title }</h2>
        <p>{ data.core_value.core_value_text }</p>
      </div>
    </section>
    <section
      className={`${css.advantagesIntro} hero red-gradient`}
      style={{
        backgroundImage: `url(${data.advantages_intro.advantages_intro_background_image.imgix_url}?w=${imgWidths.heroWidth})`
      }}>
      <svg><use xlinkHref="#chevron" /></svg>
      <div className={css.advantageText}>
        <h2>{ data.advantages_intro.advantages_intro_header }</h2>
        <p>{ data.advantages_intro.advantages_intro }</p>
      </div>
    </section>
    <section className={css.advantages}>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_1_image.imgix_url}?w=${imgWidths.advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_1_header }</h3>
          <p>{ data.advantages.advantage_1_text }</p>
        </div>
      </div>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_2_image.imgix_url}?w=${imgWidths.advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_2_header }</h3>
          <p>{ data.advantages.advantage_2_text }</p>
        </div>
      </div>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_3_image.imgix_url}?w=${imgWidths.advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_3_header }</h3>
          <p>{ data.advantages.advantage_3_text }</p>
        </div>
      </div>
      <div className={css.advantage}>
        <img src={ `${data.advantages.advantage_4_image.imgix_url}?w=${imgWidths.advantageImgWidth}` } alt="" />
        <div className={css.advantageText}>
          <h3>{ data.advantages.advantage_4_header }</h3>
          <p>{ data.advantages.advantage_4_text }</p>
        </div>
      </div>
    </section>
    <section className={css.callToAction}>
      <h2>{ data.call_to_action.call_to_action_header }</h2>
      <p>{ data.call_to_action.call_to_action_subtext }</p>
      <div className={css.ctaLocations}>
        <div className={css.ctaLocationContainer}>
          <p>
            <strong>Anchorage</strong>
            <a className={css.locationPhone}
               href={`tel: ${data.call_to_action.anchorage_phone_number}`}
               title="Click to call Anchorage location.">
              { data.call_to_action.anchorage_phone_number }
            </a>
            <a className={css.locationMap}
               href={data.call_to_action.anchorage_google_maps_link}>
              <img
                src={`${data.call_to_action.anchorage_map_image.imgix_url}?w=${imgWidths.mapImgWidth}`}
                alt="Map to Anchorage Location"
                target="_blank"
                rel="noopener"
                title="Click to open Google Maps directions to Anchorage location."
              />
            </a>
          </p>
        </div>
        <div className={css.ctaLocationContainer}>
          <p>
            <strong>Fairbanks</strong>
            <a className={css.locationPhone}
               href={`tel: ${data.call_to_action.fairbanks_phone_number}`}
               title="Click to call Fairbanks location.">
              { data.call_to_action.fairbanks_phone_number }
            </a>
            <a className={css.locationMap}
               href={data.call_to_action.fairbanks_google_maps_link}>
              <img
                src={`${data.call_to_action.fairbanks_map_image.imgix_url}?w=${imgWidths.mapImgWidth}`}
                alt="Map to Anchorage Location"
                target="_blank"
                rel="noopener"
                title="Click to open Google Maps directions to Fairbanks location."
              />
            </a>
          </p>
        </div>
      </div>
    </section>
    <section
      className={`${css.specialFeature} hero red-gradient`}
      style={{
        backgroundImage: `url(${data.special_feature.special_feature_background.imgix_url}?w=${imgWidths.heroWidth})`
      }}>
      <svg><use xlinkHref="#chevron" /></svg>
      <div className={css.specialFeatureText}>
        <h2>{ data.special_feature.special_feature_header }</h2>
        <p>
          { data.special_feature.special_feature_text }
          <a href={data.special_feature.special_feature_learn_more_link}>Learn More</a>
        </p>
      </div>
    </section>
    <Footer />
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
  let imgWidths = {
    heroWidth: 1200,
    advantageImgWidth: 400,
    mapImgWidth: 800
  };

  return {data, imgWidths};
}

export default Index;
