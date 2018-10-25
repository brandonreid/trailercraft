import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import renderHTML from 'react-render-html';

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
    
    return (
      <div className={css.productItem}>
        <div
          className={css.productImg}
          style={{
            backgroundImage: `url(${featured_image.imgix_url}?w=600)`
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
                overlay: {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  zIndex: 1000
                }
              }}
            >
              <h1>YO</h1>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
};

export default InventoryItem;
