import React from 'react';
import Cosmic from 'cosmicjs';
import renderHTML from 'react-render-html';
import Head from 'next/head';
import Lightbox from 'react-image-lightbox';

import css from './gallery.scss';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  static async getInitialProps() {
    const api = Cosmic();
    const bucket = api.bucket({
      slug: process.env.COSMIC_BUCKET,
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    });
  
    const request = await bucket.getObject({
      slug: 'gallery'
    });
    const data = request.object.metadata;
  
    const imagesRequest = await bucket.getMedia({
      folder: 'gallery-images'
    });
    const images = imagesRequest.media;

    let lightboxImgs = [];

    images.map(({key, value}, i) => {
      lightboxImgs.push(`${images[i].imgix_url}?w=1200`);
    });
  
    return {data, images, lightboxImgs};
  }

  render() {
    const {data, images, lightboxImgs} = this.props;

    const { photoIndex, isOpen } = this.state;

    return (
      <div className={css.gallery}>
        <div className={css.galleryContainer}>
          <Head>
            {/* Title must be 60 to 120 characters. */}
            <meta
              name="title"
              content="TrailerCraft, Gallery"
            />
            <title>TrailerCraft, Inc – Gallery</title>
            {/* Description must not exceed 300 characters. */}
            <meta
              name="description"
              content="Images of trucks and other vehicles we've sold in the past."
            />
          </Head>
          <h1>{ data.gallery_title }</h1>
          { renderHTML(data.gallery_description) }
          <div className={css.galleryTiles}>
            {images.length > 0 && images.map(({key, value}, i) => (
              <div
                key={i}
                className={css.galleryItem}
                style={{
                  backgroundImage: `url(${images[i].imgix_url}?w=500)`
                }}
              >
                <img
                  src={`${images[i].imgix_url}?w=500`}
                  onClick={() => {
                    this.setState({
                      photoIndex: i,
                      isOpen: true
                    });
                  }}
                />
              </div>
            ))}
          </div>
          {isOpen && (
            <Lightbox
              mainSrc={lightboxImgs[photoIndex]}
              nextSrc={lightboxImgs[(photoIndex + 1) % lightboxImgs.length]}
              prevSrc={lightboxImgs[(photoIndex + lightboxImgs.length - 1) % lightboxImgs.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + lightboxImgs.length - 1) % lightboxImgs.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % lightboxImgs.length,
                })
              }
            />
          )}
        </div>
      </div>
    )
  }
}

export default Gallery;
