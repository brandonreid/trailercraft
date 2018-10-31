import React from 'react';
import Cosmic from 'cosmicjs';
import classNames from 'classnames';
import Head from 'next/head';

import css from './parts-and-services.scss';

class PartsAndServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroWidth: 768,
      featureImgWidth: 768
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
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

  componentDidMount() {
    if (window && window.innerWidth) {
      const windowWidth = window.innerWidth;
      let majorWidth = windowWidth;
      let minorWidth = windowWidth;

      if (windowWidth > 768) {
        minorWidth = windowWidth / 3;
        majorWidth = windowWidth - (windowWidth / 6);
      }

      this.setState({
        heroWidth: Math.ceil(majorWidth),
        featureImgWidth: Math.ceil(minorWidth)
      });
    }
  }

  render() {
    const {
      heroWidth,
      featureImgWidth
    } = this.state;

    const {data: {
      top_hero_banner,
      parts_statement,
      services_statement,
      feature_1,
      feature_2,
      feature_3,
      feature_4,
      call_to_action_text
    }} = this.props;

    return (
      <div>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Parts and Services"
          />
          <title>TrailerCraft, Inc – Parts and Services</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="Factory trained technicians, state of the art facilities and the largest supply of parts in Alaska. We service all manner of commercial and residential trucks, busses, vans, plows, trailers and more."
          />
        </Head>
        <section
          className={classNames(css.topHero, 'hero red-gradient')}
          style={{
            backgroundImage: `url(${top_hero_banner.hero_image.imgix_url}?w=${heroWidth})`
          }}>
          <div className={css.topHeroText}>
            <h1>{ top_hero_banner.hero_title }</h1>
            <p>{ top_hero_banner.hero_text }</p>
          </div>
        </section>

        <section
          className={classNames(css.partsSection, 'hero')}
          style={{
            backgroundImage: `url(${parts_statement.parts_statement_image.imgix_url}?w=${heroWidth})`
          }}
        >
          <svg className={css.partsChevron}><use xlinkHref="#chevron" /></svg>
          <div className={css.partsContent}>
            <h3>{ parts_statement.parts_statement_title }</h3>
            <p>{ parts_statement.parts_statement_text }</p>
          </div>
        </section>

        <section
          className={classNames(css.servicesSection, 'hero top-pin')}
          style={{
            backgroundImage: `url(${services_statement.services_statement_image.imgix_url}?w=${heroWidth})`
          }}
        >
          <div className={css.servicesContent}>
            <h3>{ services_statement.services_statement_title }</h3>
            <p>{ services_statement.services_statement_text }</p>
          </div>
        </section>

        <section className={css.features}>
          <div className={css.feature}>
            <div
              className={css.featureImg}
              style={{
                backgroundImage: `url('${feature_1.feature_1_image.imgix_url}?w=${featureImgWidth}')`
              }}
            ></div>
            <div className={css.featureText}>
              <h3>{ feature_1.feature_1_title }</h3>
              <p>{ feature_1.feature_1_text }</p>
            </div>
          </div>
          <div className={css.feature}>
            <div
              className={css.featureImg}
              style={{
                backgroundImage: `url('${feature_2.feature_2_image.imgix_url}?w=${featureImgWidth}')`
              }}
            ></div>
            <div className={css.featureText}>
              <h3>{ feature_2.feature_2_title }</h3>
              <p>{ feature_2.feature_2_text }</p>
            </div>
          </div>
          <div className={css.feature}>
            <div
              className={css.featureImg}
              style={{
                backgroundImage: `url('${feature_3.feature_3_image.imgix_url}?w=${featureImgWidth}')`
              }}
            ></div>
            <div className={css.featureText}>
              <h3>{ feature_3.feature_3_title }</h3>
              <p>{ feature_3.feature_3_text }</p>
            </div>
          </div>
          <div className={css.feature}>
            <div
              className={css.featureImg}
              style={{
                backgroundImage: `url('${feature_4.feature_4_image.imgix_url}?w=${featureImgWidth}')`
              }}
            ></div>
            <div className={css.featureText}>
              <h3>{ feature_4.feature_4_title }</h3>
              <p>{ feature_4.feature_4_text }</p>
            </div>
          </div>
        </section>

        <section className={css.callToAction}>
          <h2>{ call_to_action_text }</h2>
        </section>
      </div>
    );
  }
};


export default PartsAndServices;
