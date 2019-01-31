import React from 'react';
import Cosmic from 'cosmicjs';
import Link from 'next/link';
import Head from 'next/head';

import css from './careers.scss';

class Careers extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ Component, router, ctx }) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
  
    const postsData = await bucket.getObjects({
      type: 'job-postings',
      limit: 200,
      sort: '-created_at'
    });
    const posts = postsData.objects;

    return {posts};
  }

  render() {
    const {posts} = this.props;
    return (
      <div className={css.careersList}>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Careers"
          />
          <title>TrailerCraft, Inc – Careers</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="Careers at TrailerCraft, Inc. Join our team and help keep Alaska moving."
          />
        </Head>
        <section className={css.careersContainer}>
          <h1>Careers at TrailerCraft, Inc.</h1>
          <p className={css.emailTo}>
            <a
              href="https://cosmic-s3.imgix.net/ac2880a0-2342-11e9-931e-19c0e1e6c59d-Application-for-Employment-VS-3.pdf"
              target="_blank"
            >Click here to download the application.</a><br />
            Please email your resume and application to <a href="mailto:anno@trailercraft.com">anno@trailercraft.com</a>.
          </p>
          {!posts && (
            <p className={css.noJobs}>There are currently no listed career opportunities available</p>
          )}
          {posts && posts.map(({
            title,
            slug,
            metadata: {
              location,
              job_role_image,
              brief_description
            }
          }, i) => (
            <Link key={i} href={`/careers/${slug}`}>
              <a className={css.post}>
                {job_role_image.imgix_url && (
                  <div
                    className={css.postImage}
                    style={{
                      backgroundImage: `url(${job_role_image.imgix_url}?w=400)`
                    }}
                  ></div>
                )}
                <div className={css.postContent}>
                  <div className={css.postTitle}>
                    <h3>{ title }</h3>
                    {location && (<span>{ location }</span>)}
                  </div>
                  <p className={css.briefDescription}>{ brief_description }</p>
                  <p>Read More</p>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    )
  }
};

export default Careers;
