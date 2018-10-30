import React from 'react';
import Cosmic from 'cosmicjs';
import Link from 'next/link';
import MetaTags from 'react-meta-tags';

import css from './blog.scss';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroImageWidth: 1200,
      thumbnailWidth: 600
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
  
    const blogData = await bucket.getObject({
      slug: 'blog'
    });
    const blog = blogData.object.metadata;
  
    const postsData = await bucket.getObjects({
      type: 'blog-posts',
      limit: 200,
      sort: '-created_at'
    });
    const posts = postsData.objects;

    return {blog, posts};
  }

  componentDidMount() {
    if (window && window.innerWidth) {
      const windowWidth = window.innerWidth;
      let majorWidth = windowWidth;
      let minorWidth = windowWidth;

      if (windowWidth > 535) {
        minorWidth = 400;
      }

      if (windowWidth > 768) {
        majorWidth = windowWidth - (windowWidth / 6);
      }

      this.setState({
        heroImageWidth: Math.ceil(majorWidth),
        thumbnailWidth: Math.ceil(minorWidth)
      });
    }
  }

  render() {
    const {heroImageWidth, thumbnailWidth} = this.state;
    const {blog, posts} = this.props;
    return (
      <div className={css.blogContainer}>
        <MetaTags id="blog">
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content="TrailerCraft, Inc – Blog"
          />
          <title>TrailerCraft, Inc – Blog</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content="The Trailercraft blog. Where we comment on the latest industry news, best practices and equipment around Alaskan trucking, plowing, towing and more."
          />
        </MetaTags>
        <section
          className={`${css.blogHero} hero`}
          style={{
            backgroundImage: `url(${blog.hero_image.imgix_url}?w=${heroImageWidth})`
          }}
        >
          <div className={css.blogHeroContentContainer}>
            <div className={css.blogHeroContent}>
              <h1>{ blog.hero_title }</h1>
              <p>{ blog.hero_text }</p>
            </div>
          </div>
        </section>
        <section className={css.blogListContainer}>
          {posts.map(({title, metadata, slug}, i) => (
            // TODO: Figure out best way to route this...
            // Ideally the route will be /blog/the-slug
            <Link key={i} href={`/blogs/${slug}`}>
              <a className={css.post}>
                <div className={css.postImage}>
                  <img
                    src={`${metadata.featured_image.imgix_url}?w=${thumbnailWidth}`}
                    alt=""
                  />
                </div>
                <div className={css.postText}>
                  <h3>{ title }</h3>
                  <p>{ metadata.excerpt }</p>
                  <p className={css.readMoreLink}>Read More</p>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    )
  }
};

export default Blog;
