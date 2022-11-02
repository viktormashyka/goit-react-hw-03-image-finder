import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
        {/* <Loader /> */}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

// export const App = () => {
//   return (
//     <div>
//       <ImageFinder onSubmit={values => console.log('values, ', values)} />
//     </div>
//   );
// };

//   style={{
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 40,
//     color: '#010101'
//   }}
// >
//   React homework template
