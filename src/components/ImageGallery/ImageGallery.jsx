import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import * as basicLightbox from 'basiclightbox';

import { fetchPhotos } from 'api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `);

// const instance = basicLightbox.create(`
//     <div class="modal">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//     </div>
// `);

// var lightbox = new SimpleLightbox('.gallery a', {
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

export class ImageGallery extends Component {
  state = {
    photos: [],
    isLoading: false,
    showModal: false,
    url: '',
    alt: '',
  };

  //   async componentDidMount() {
  //     const { searchPhotos, page, per_page } = this.props;
  //     try {
  //       this.setState({ isLoading: true });
  //       const photos = await fetchPhotos({ searchPhotos, page, per_page });
  //       this.setState({ photos });
  //       console.log('componentDidMount...');
  //       console.log('this.state, ', this.state);
  //       console.log('this.props, ', this.props);
  //       // images = Math.ceil((page * per_page) / result.totalHits);
  //       // images = (page * per_page) / result.totalHits;
  //       // if (images >= 1) {
  //       //   Notify.info(
  //       //     "We're sorry, but you've reached the end of search results."
  //       //   );
  //       // }
  //     } catch (error) {
  //       toast.error(error);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }

  async componentDidUpdate(prevProps, prevState) {
    const { searchPhotos, page } = this.props;
    if (
      prevProps.page !== this.props.page ||
      prevProps.searchPhotos !== this.props.searchPhotos
    ) {
      console.log('componentDidUpdate... ');
      try {
        this.setState({ isLoading: true });
        const photos = await fetchPhotos({ searchPhotos, page });
        this.setState({ photos });
        if (photos.length === 0) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        console.log('componentDidUpdate...');
        console.log('this.state, ', this.state);
        console.log('this.props, ', this.props);
        // images = Math.ceil((page * per_page) / result.totalHits);
        // images = (page * per_page) / result.totalHits;
        // if (images >= 1) {
        //   Notify.info(
        //     "We're sorry, but you've reached the end of search results."
        //   );
        // }
      } catch (error) {
        toast.error(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  toggleModal = (evt, { largeImageURL, tags }) => {
    evt.preventDefault();
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log('toggleModal...');
    this.openModal(evt, { largeImageURL, tags });
  };

  openModal = (evt, { largeImageURL, tags }) => {
    if (evt.target === 'IMG') {
      this.setState(({ largeImageURL, tags }) => ({
        url: largeImageURL,
        alt: tags,
      }));
    }
    console.log('largeImageURL, tags', this.state.url, this.state.alt);
  };

  render() {
    const { photos, isLoading, showModal, url, alt } = this.state;
    const { loadMore } = this.props;
    return (
      <div>
        {isLoading && <Loader />}
        {!isLoading && (
          <ul className="ImageGallery">
            <ImageGalleryItem photos={photos} onClick={this.toggleModal} />
          </ul>
        )}
        {photos.length >= 1 && <Button onClick={loadMore} />}
        {showModal && (
          <Modal>
            <div>Here must be a picture</div>
            <img src={url} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
