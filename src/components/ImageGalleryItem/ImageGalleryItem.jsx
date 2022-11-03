import * as basicLightbox from 'basiclightbox';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ photos, toggleModal }) => {
  return photos.map(({ id, largeImageURL, webformatURL, tags }) => (
    <li className="ImageGalleryItem" key={id}>
      <a className="gallery__item" href={largeImageURL}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          title={tags}
          loading="lazy"
          onClick={() => toggleModal(largeImageURL, tags)}
        />
      </a>
    </li>
  ));
};
