import React from 'react';
import Cosmic from 'cosmicjs';
import Head from 'next/head';
import renderHTML from 'react-render-html';

import css from './career.scss';

class Career extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   heroImageWidth: 1200,
    //   thumbnailWidth: 600
    // }
  }

  static async getInitialProps({ query: { slug }}) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });

    const post = await bucket.getObject({
      slug
    });

    return {post};
  }

  // componentDidMount() {
  //   if (window && window.innerWidth) {
  //     const windowWidth = window.innerWidth;
  //     let majorWidth = windowWidth;
  //     let minorWidth = windowWidth;

  //     if (windowWidth > 535) {
  //       minorWidth = 400;
  //     }

  //     if (windowWidth > 768) {
  //       majorWidth = windowWidth - (windowWidth / 6);
  //     }

  //     this.setState({
  //       heroImageWidth: Math.ceil(majorWidth),
  //       thumbnailWidth: Math.ceil(minorWidth)
  //     });
  //   }
  // }

  render() {
    // const {heroImageWidth, thumbnailWidth} = this.state;
    const {
      post: {
        object: {
          title,
          metadata: {
            location,
            job_role_image,
            job_description
          }
        }
      }
    } = this.props;
    return (
      <div className={css.careersList}>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Career – ${title}"
          />
          <title>TrailerCraft, Inc – Careers</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="Careers at Trailercraft, Inc. Join our team and help keep Alaska moving."
          />
        </Head>
        <section className={css.careerPost}>
          <h1>{ title }</h1>
          {location && (<p className={css.location}>{ location }</p>)}
          <div>
            {job_role_image.imgix_url && (
              <img
                className={css.careerImg}
                src={`${job_role_image.imgix_url}?w=600`}
              />
            )}
            { renderHTML(job_description) }
          </div>
        </section>
      </div>
    )
  }
};

export default Career;
