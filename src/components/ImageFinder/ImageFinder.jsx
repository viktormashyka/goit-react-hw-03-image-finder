import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import { Notify } from 'notiflix';
import axios from 'axios';

// import { nanoid } from 'nanoid';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { feachPhotos } from 'components/feach-photo';
// import { feachPhotos } from 'components/feach-photo';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ImageFinder extends Component {
  static propTypes = {};

  state = {
    photos: [],
    searchPhotos: '',
    page: 1,
    per_page: 12,
    isLoading: true,
  };

  handleChange = evt => {
    this.setState({ searchPhotos: evt.currentTarget.value.toLowerCase() });
    console.log('handleChange... evt.target.value, ', evt.target.value);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { searchPhotos } = this.state;

    if (searchPhotos.trim() === '') {
      Notify.failure('Input search name...');
      return;
    }
    this.props.onSubmit({ ...this.state });
    console.log('handleSubmit... searchPhotos, ', searchPhotos);
    // feachPhotos({ searchPhotos });
    this.setState({ searchPhotos: '' });
  };

  // reset = () => {
  //   this.setState({ searchPhotos: '' });
  // };

  async componentDidMount() {
    const { searchPhotos, photos, page, per_page } = this.state;
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
    const url = `${BASE_URL}?key=${API_KEY}&q=${searchPhotos}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
    const response = await axios.get(url);
    console.log('componentDidMount... response.data.hits, ', response);
    this.setState({ photos: response.data.hits });
  }

  render() {
    // const { searchPhotos, photoes } = this.state;
    // const { handleChange, handleSubmit } = this;
    console.log('render ... photos, ', this.state.photos);
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
                />
              </a>
            </li>
          ))}
        </ul>
        {/* <ImageGalleryItem /> */}
        <Button />
        <Loader />
        <Modal />
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
