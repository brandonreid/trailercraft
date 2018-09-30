import Cosmic from 'cosmicjs';
import Link from 'next/link';

import css from './blog.scss';

const Blog = ({blog, heroImageWidth, posts, thumbnailWidth}) => (
  <div className={css.blogContainer}>
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
      {posts.map(({title, metadata}) => (
        // TODO: Figure out best way to route this...
        // Ideally the route will be /blog/the-slug
        <Link href="#0">
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
);

Blog.getInitialProps = async () => {
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
    limit: 25,
    sort: '-created_at'
  });
  const posts = postsData.objects;

  let heroImageWidth = 1200;
  let thumbnailWidth = 600;

  return {blog, heroImageWidth, posts, thumbnailWidth};
}

export default Blog;
