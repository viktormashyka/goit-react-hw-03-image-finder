import * as basicLightbox from 'basiclightbox';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ photos, openModal }) => {
  //   const instance = basicLightbox.create(`
  //     <div class="overlay">
  //       <div class="modal">
  //         Modalka...
  //         <img src={photo.largeImageURL} alt={photo.tags} />
  //       </div>
  //     </div>
  // `);

  return photos.map(photo => (
    <li className="ImageGalleryItem" key={photo.id}>
      <a className="gallery__item" href={photo.largeImageURL}>
        <img
          className="ImageGalleryItem-image"
          src={photo.webformatURL}
          alt={photo.tags}
          title={photo.tags}
          loading="lazy"
          //   onClick={() => {
          //     openModal(photo.largeImageURL, photo.tags);
          //   }}
        />
      </a>
    </li>
  ));
};
