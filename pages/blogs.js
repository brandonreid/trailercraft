import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';

import css from './blogs.scss';

// const Blogs = ({featured_image, title, content}) => (
class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroWidth: 768
    }
  }
  
  static async getInitialProps({ query: { slug }}) {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
    const {object: blog} = await bucket.getObject({
      slug
    });

    return blog;
  }

  componentDidMount() {
    if (window && window.innerWidth) {
      const windowWidth = window.innerWidth;
      let newWidth = windowWidth;

      if (windowWidth > 768) {
        newWidth = windowWidth - (windowWidth / 6);
      }

      this.setState({
        heroWidth: Math.ceil(newWidth),
      });
    }
  }

  render () {
    const {metadata, title, content} = this.props;
    const { heroWidth } = this.state;

    return (
      <div className={css.blogsContainer}>
        <div
          className='hero'
          style={{
            backgroundImage: `url(${metadata.featured_image.imgix_url}?w=${heroWidth})`
          }}
        >
          <div className={css.heroTextContainer}>
            <h1 className={css.heroText}>{ title }</h1>
          </div>
        </div>
        <div className={css.blogPage}>
          <div>{renderHTML(content)}</div>
        </div>
      </div>
    );
  }
}

export default Blogs;
