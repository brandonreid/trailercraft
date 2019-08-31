import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';
import Head from 'next/head';

import css from './about-us.scss';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static async getInitialProps() {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const request = await bucket.getObject({
      slug: 'about-us'
    });
    const data = request.object.metadata;
  
    return {data};
  }

  render () {
    const {youtube_embed_code, content} = this.props.data;
    
    return (
      <div className={css.AboutUsContainer}>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content={`TrailerCraft, Inc – About Us`}
          />
          <title>TrailerCraft, Inc – About Us</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="About TrailerCraft, Inc. Over 50 years of history serving Alaska."
          />
        </Head>
        {youtube_embed_code && (
          <div className={css.videoWrapper}>
            <div className={css.videoContainer}>
              <h2>About TrailerCraft, Inc.</h2>
              <div className={css.responsiveVideo}>{renderHTML(youtube_embed_code)}</div>
            </div>
          </div>
        )}
        <div className={css.storyContent}>
          <div>{renderHTML(content)}</div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
