import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PropTypes from 'prop-types';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPhotos } from 'api';
import { Loader } from './Loader/Loader';
import '../css/styles.css';

export class App extends Component {
  state = {
    photos: [],
    searchPhotos: '',
    page: 1,
    isLoading: false,
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
    const { searchPhotos, page, photos } = this.state;
    if (
      prevState.page !== this.state.page ||
      prevState.searchPhotos !== this.state.searchPhotos
    ) {
      console.log('componentDidUpdate... ');
      try {
        this.setState({ isLoading: true });
        const resultApi = await fetchPhotos({ searchPhotos, page });
        // this.setState({ photos });
        // this.setState({ photos: resultApi });
        this.setState(prevState => ({
          photos: [...prevState.photos, ...resultApi],
        }));
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

  handleFormSubmit = ({ searchPhotos, page }) => {
    this.setState({ searchPhotos, page });
  };

  loadMore = evt => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('this.state, ', this.state);
  };

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
    const { searchPhotos, page, photos, isLoading, showModal } = this.state;
    const { loadMore } = this;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {!isLoading && (
          <ImageGallery
            // searchPhotos={searchPhotos}
            // page={page}
            // loadMore={this.loadMore}
            photos={photos}
            // per_page={per_page}
            // photos={this.state.photos}
          />
        )}
        {photos.length >= 1 && <Button onClick={loadMore} />}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    searchPhotos: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
};
