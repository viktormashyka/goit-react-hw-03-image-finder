import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log('toggleModal...');
  };

  render() {
    const { showModal } = this.state;
    const { photos } = this.props;
    const { toggleModal } = this;

    return photos.map(({ id, largeImageURL, webformatURL, tags }) => (
      <li className="ImageGalleryItem" key={id}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          title={tags}
          loading="lazy"
          onClick={toggleModal}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    ));
  }
}

ImageGalleryItem.propTypes = {
  state: PropTypes.shape({ showModal: PropTypes.bool.isRequired }).isRequired,
};
