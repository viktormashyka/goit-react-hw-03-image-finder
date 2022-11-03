import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import { Notify } from 'notiflix';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { nanoid } from 'nanoid';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

// var lightbox = new SimpleLightbox('.gallery a', {
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

export default class ImageFinder extends Component {
  static propTypes = {};

  state = {
    photos: [],
    searchPhotos: '',
    page: 1,
    per_page: 12,
    images: 0,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    tags: '',
    isActiveBtnLoadMore: false,
  };

  // notify = () => toast('Input search name please ...');

  handleChange = evt => {
    this.setState({ searchPhotos: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { searchPhotos, photos, page, per_page } = this.state;
    evt.preventDefault();

    if (searchPhotos.trim() === '') {
      return toast.info('Input search name please ...');
    }
    // this.props.onSubmit({ ...this.state });
    this.props.onSubmit(this.state.searchPhotos);
    console.log('handleSubmit... searchPhotos, ', this.state.searchPhotos);
    try {
      this.feachPhotos();
    } catch (error) {
      toast.error(error);
      // Notify.failure(error);
    }
    this.reset({ photos, page, per_page });
    this.setState({ searchPhotos: '' });
  };

  reset = () => {
    this.setState({ photos: [], page: 1, per_page: 12 });
  };

  // reset = () => {
  //   this.setState({ searchPhotos: '' });
  // };

  // async componentDidMount() {
  //   const { searchPhotos, photos, page, per_page } = this.state;
  //   const BASE_URL = 'https://pixabay.com/api/';
  //   const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
  //   const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
  //   const response = await axios.get(url);
  //   console.log('componentDidMount... response.data.hits, ', response);
  //   this.setState({ photos: response.data.hits });
  // }

  // async componentDidUpdate() {
  //   try {
  //     // this.feachPhotos({ searchPhotos, page, per_page });
  //     this.feachPhotos();
  //     // images = Math.ceil((page * per_page) / result.totalHits);
  //     // images = (page * per_page) / result.totalHits;
  //     // if (images >= 1) {
  //     //   Notify.info(
  //     //     "We're sorry, but you've reached the end of search results."
  //     //   );
  //     // }
  //   } catch (error) {
  //     Notify.failure(error);
  //   }
  // }

  async feachPhotos() {
    const { searchPhotos, photos, page, per_page } = this.state;
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
    const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
    const response = await axios.get(url);
    console.log('feachPhotos... response.data.hits, ', response);
    if (response.status !== 200) {
      throw new Error(response.status);
      // Notify.failure(Error);
      toast.error(Error);
    }
    this.setState({ photos: response.data.hits });
  }

  onPagination = evt => {
    const { searchPhotos, photos, page, per_page } = this.state;
    this.setState(prevState => ({ page: prevState.page + 1 }));
    // this.setState(prevState => ({ per_page: prevState.per_page + 12 }));
    // this.setState(prevState => ({ photos: [...prevState.photos], photos }));

    try {
      // this.feachPhotos({ searchPhotos, page, per_page });
      this.feachPhotos();
      // images = Math.ceil((page * per_page) / result.totalHits);
      // images = (page * per_page) / result.totalHits;
      // if (images >= 1) {
      //   Notify.info(
      //     "We're sorry, but you've reached the end of search results."
      //   );
      // }
    } catch (error) {
      toast.error(error);
      // Notify.failure(error);
    }
    // return;
  };

  onToggelModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (evt, url, alt) => {
    evt.preventDefault();
    console.log('openModal...');
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      // largeImageURL: largeImageURL,
      // tags: tags,
    }));
  };

  onOpenModal = evt => {
    const currentImgUrl = evt.target.dataset.large;
    const currentImgDescription = evt.targe.alt;

    if (evt.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImgUrl: currentImgUrl,
        currentImgDescription: currentImgDescription,
      }));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.props.searchPhotos !== this.props.searchPhotos) {
      console.log(
        'prevProps.props.searchPhotos, ',
        prevProps.props.searchPhotos
      );
      console.log('this.props.searchPhotos, ', this.props.searchPhotos);
    }
  }

  render() {
    // const { searchPhotos, photoes } = this.state;
    // const { handleChange, handleSubmit } = this;
    console.log('render ... this.state, ', this.state);
    return (
      <div>
        {/* <Searchbar onSubmit={handleSubmit} onChange={handleChange} /> */}
        <header class="searchbar">
          <form class="form" onSubmit={this.handleSubmit}>
            <button type="submit" class="button">
              <span class="button-label">Search</span>
            </button>

            <input
              class="input"
              type="text"
              value={this.state.searchPhotos}
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>
        {/* {photos.length > 0 ? <ImageGallery photos={photos} /> : null} */}
        <ul class="gallery">
          {this.state.photos.map(photo => (
            <li class="gallery-item" key={photo.id}>
              <a class="gallery__item" href={photo.largeImageURL}>
                <img
                  class="gallery__image"
                  src={photo.webformatURL}
                  alt={photo.tags}
                  title={photo.tags}
                  loading="lazy"
                  onClick={() => {
                    this.openModal(photo.largeImageURL, photo.tags);
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
        {/* <ImageGalleryItem /> */}
        {/* <Button onClick={this.onPagination} page={this.state.page} /> */}
        <button
          type="button"
          onClick={() => {
            this.onPagination();
            console.log(
              'click button load more..., onPagination..., page #',
              this.state.page
            );
          }}
        >
          Load more
        </button>
        <Loader />;{/* <Modal /> */}
        <div class="overlay">
          <div class="modal">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

// ImageFinder.propTypes = {
//   state: PropTypes.shape({
//     good: PropTypes.number.isRequired,
//     neutral: PropTypes.number.isRequired,
//     bad: PropTypes.number.isRequired,
//   }),
// };

//******************************************* */

// var lightbox = new SimpleLightbox('.gallery a', {
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

// const formRef = document.querySelector('form#search-form');
// const divGalleryRef = document.querySelector('.gallery');
// const buttonBtnRef = document.querySelector('.load-more');

// formRef.addEventListener('submit', onSearch);
// buttonBtnRef.addEventListener('click', onPagination);

// let page = 1;
// let per_page = 40;
// let images = 0;
// let searchPhotos;
// let photos;
// // let totalHits = 1;

// async function onSearch(event) {
//   page = 1;

//   event.preventDefault();
//   const {
//     elements: { searchQuery },
//   } = event.currentTarget;
//   searchPhotos = searchQuery.value;
//   if (!searchQuery.value) {
//     Notify.failure('Enter data');
//     return;
//   }
//   event.currentTarget.reset();
//   try {
//     divGalleryRef.innerHTML = '';
//     const result = await feachPhotos(searchPhotos, page, per_page);
//     buttonBtnRef.classList.remove('visibility_hidden');
//     createPhotos(result);
//     Notify.info(`Hooray! We found ${result.totalHits} images.`);
//     images = (page * per_page) / result.totalHits;
//     if (images >= 1) {
//       buttonBtnRef.classList.add('visibility_hidden');
//       Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//   } catch (error) {
//     Notify.failure(error);
//   }
//   return;
// }

// async function onPagination(event, data) {
//   event.preventDefault();
//   page += 1;

//   // console.log('page', page);
//   // console.log('per_page', per_page);
//   try {
//     const result = await feachPhotos(searchPhotos, page, per_page);
//     buttonBtnRef.classList.remove('visibility_hidden');
//     createPhotos(result);
//     // images = Math.ceil((page * per_page) / result.totalHits);
//     images = (page * per_page) / result.totalHits;
//     if (images >= 1) {
//       buttonBtnRef.classList.add('visibility_hidden');
//       Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//   } catch (error) {
//     Notify.failure(error);
//   }
//   return;
// }

// function createPhotos(data) {
//   photos = data.hits;
//   // if (photos.length < per_page) {
//   //   buttonBtnRef.classList.add('visibility_hidden');
//   //   Notify.info("We're sorry, but you've reached the end of search results.");
//   // }
//   if (photos.length === 0) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return data;
//   }
//   if (photos.length > 0) {
//     const markup = photos
//       .map(
//         ({
//           largeImageURL,
//           webformatURL,
//           tags,
//           likes,
//           views,
//           comments,
//           downloads,
//         }) => {
//           return `<div class="photo-card">
//           <a class="gallery__item" href="${largeImageURL}">
//           <img class="gallery__image"
//         src="${webformatURL}"
//         alt="${tags}"
//         title="${tags}"
//         loading="lazy"
//       /></a>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes: ${likes}</b>
//         </p>
//         <p class="info-item">
//           <b>Views: ${views}</b>
//         </p>
//         <p class="info-item">
//           <b>Comments: ${comments}</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads: ${downloads}</b>
//         </p>
//       </div>
//     </div>`;
//         }
//       )
//       .join('');
//     divGalleryRef.insertAdjacentHTML('beforeend', markup);
//   }
//   lightbox.refresh();
//   return data;
// }
