import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import Head from 'next/head';
import Modal from 'react-modal';
import Slider from "react-slick";
import renderHTML from 'react-render-html';
import classNames from 'classnames';

import css from './inventory-item.scss';

Modal.setAppElement('#__next')

class InventoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {
      title,
      metadata: {
        description,
        detailed_specs,
        featured_image,
        list_price,
        new_or_used,
        product_images,
        location_of_item
      }
    } = this.props.product;

    const sliderSettings = {
      centerMode: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      dotsClass: `${css.sliderDots} slick-dots`,
      adaptiveHeight: true
    };
    
    return (
      <div className={css.productItem}>
        <Head>
          {/* Title must be 60 to 120 characters. */}
          <meta
            name="title"
            content={`TrailerCraft, Inc – Inventory Item – ${title}`}
          />
          <title>TrailerCraft, Inc – Inventory Item – {title}</title>
          {/* Description must not exceed 300 characters. */}
          <meta
            name="description"
            content={`${title} – Available now in ${location_of_item} at Trailercraft, Inc.`}
          />
        </Head>
        <div
          className={css.productImg}
          style={{
            backgroundImage: `url(${featured_image.imgix_url.replace(/ /g, "%20")}?w=600)`
          }}
        >
          {list_price !== "" ? (
            <p>${ list_price }</p>
          ) : (
            <p>Call for Price</p>
          )}
        </div>
        <div className={css.productInfo}>
          <h3>
            { title }
            {new_or_used === "Used" && (
              <span> (Preowned)</span>
            )}
          </h3>
          <p className={css.productLocation}>
            Current Location: { location_of_item }
          </p>
          <div className={css.productDescription}>
            { renderHTML(description) }
            <button onClick={this.openModal}>View Details</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel={`${title} Details`}
              style={{
                bodyOpen: {
                  overflow: 'hidden'
                },
                overlay: {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  zIndex: 1000
                },
                content: {
                  padding: 0,
                  border: 'none',
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  maxWidth: '98vw',
                  width: '70em',
                  maxHeight: '98vh',
                  overflow: 'scroll'
                }
              }}
            >
              <button
                className={classNames('symbol', css.closeBtn)}
                onClick={this.closeModal}
              >
                <svg><use xlinkHref="#close" /></svg>
              </button>
              <div className={css.topModalContent}>
                <div className={css.topContentText}>
                  <h2>{ title }</h2>
                  <p>Current Location: { location_of_item }</p>
                  <p>
                    List Price:
                    {list_price !== '' ? (
                      <span> ${ list_price }</span>
                    ) : (
                      <span> Call for Price</span>
                    )}
                  </p>
                  { renderHTML(description) }
                  <p>
                    <Link href="/contact"><a>Call or stop by to learn more!</a></Link>
                  </p>
                </div>
                <div className={css.sliderContainer}>
                  <Slider {...sliderSettings}>
                    <div>
                      <img
                        src={`${featured_image.imgix_url.replace(/ /g, "%20")}?w=600`}
                        alt={`${title} Image 1`}
                      />
                    </div>
                    {product_images.map((img, i) => (
                      <div key={i}>
                        <img
                          src={`${img.product_image.imgix_url.replace(/ /g, "%20")}?w=600`}
                          alt={`${title} Image ${i + 2}`}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className={css.modalSpecs}>
                { renderHTML(detailed_specs) }
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
};

export default InventoryItem;
