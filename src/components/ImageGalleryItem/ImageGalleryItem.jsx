// import * as basicLightbox from 'basiclightbox';

import React, { Component } from 'react';

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

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.showModal) {
  //     this.openModal();
  //   } else {
  //     this.closeModal();
  //   }
  // }

  // openModal = (evt, { largeImageURL, tags }) => {
  //   if (evt.target === 'IMG') {
  //     this.setState(({ url, alt }) => ({
  //       url: largeImageURL,
  //       alt: tags,
  //     }));
  //   }
  //   console.log('largeImageURL, tags', this.state.url, this.state.alt);
  // };

  // closeModal = evt => {
  //   this.setState(({ url, alt }) => ({
  //     url: '',
  //     alt: '',
  //   }));
  //   console.log('largeImageURL, tags', this.state.url, this.state.alt);
  // };

  render() {
    const { photos } = this.props;
    const { showModal } = this.state;
    return photos.map(({ id, largeImageURL, webformatURL, tags }) => (
      <li className="ImageGalleryItem" key={id}>
        <a className="gallery__item" href={largeImageURL}>
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tags}
            title={tags}
            loading="lazy"
            onClick={this.toggleModal}
          />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </a>
      </li>
    ));
  }
}
// export const ImageGalleryItem = ({ photos, onClick }) => {
//   return photos.map(({ id, largeImageURL, webformatURL, tags }) => (
//     <li className="ImageGalleryItem" key={id}>
//       <a className="gallery__item" href={largeImageURL}>
//         <img
//           className="ImageGalleryItem-image"
//           src={webformatURL}
//           alt={tags}
//           title={tags}
//           loading="lazy"
//           //   onClick={onClick({ largeImageURL, tags })}
//         />
//       </a>
//     </li>
//   ));
// };
