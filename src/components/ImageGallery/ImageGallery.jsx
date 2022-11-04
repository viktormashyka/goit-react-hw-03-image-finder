import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// import * as basicLightbox from 'basiclightbox';

import { fetchPhotos } from 'api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    // photos: [],
    // isLoading: false,
    // showModal: false,
    // url: '',
    // alt: '',
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

  // async componentDidUpdate(prevProps, prevState) {
  //   const { searchPhotos, page } = this.props;
  //   if (
  //     prevProps.page !== this.props.page ||
  //     prevProps.searchPhotos !== this.props.searchPhotos
  //   ) {
  //     console.log('componentDidUpdate... ');
  //     try {
  //       this.setState({ isLoading: true });
  //       const photos = await fetchPhotos({ searchPhotos, page });
  //       this.setState({ photos });
  //       if (photos.length === 0) {
  //         toast.info(
  //           'Sorry, there are no images matching your search query. Please try again.'
  //         );
  //       }
  //       console.log('componentDidUpdate...');
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
  //   // if (prevState.showModal !== this.state.showModal) {
  //   //   this.state.showModal ? this.openModal : this.closeModal;
  //   // }
  // }

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  //   console.log('toggleModal...');
  // };

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
    // const { photos, isLoading, showModal, url, alt } = this.state;
    // const { loadMore } = this.props;
    const { photos } = this.props;
    //   const { url, alt } = this.props;
    return (
      <div>
        {/* {isLoading && <Loader />} */}

        <ul className="ImageGallery">
          <ImageGalleryItem photos={photos} />
        </ul>

        {/* {photos.length >= 1 && <Button onClick={loadMore} />} */}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  state: PropTypes.shape({
    photos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
