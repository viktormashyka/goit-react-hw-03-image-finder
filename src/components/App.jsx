import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PropTypes from 'prop-types';

import ImageFinder from '../components/ImageFinder/ImageFinder';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPhotos } from 'api';
import { Loader } from './Loader/Loader';
import '../css/styles.css';
export class App extends Component {
  state = {
    // photos: [],
    searchPhotos: '',
    page: 1,
    // per_page: 12,
  };

  handleFormSubmit = ({ searchPhotos, page }) => {
    this.setState({ searchPhotos, page });
  };

  loadMore = evt => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('this.state, ', this.state);
  };

  render() {
    const { searchPhotos, page } = this.state;
    return (
      <div className="App">
        {/* <ImageFinder onSubmit={this.handleFormSubmit} /> */}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchPhotos={searchPhotos}
          page={page}
          loadMore={this.loadMore}
          // per_page={per_page}
          // photos={this.state.photos}
        />
        {/* <Button onClick={this.loadMore} /> */}
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
