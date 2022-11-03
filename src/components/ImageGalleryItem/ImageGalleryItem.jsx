import * as basicLightbox from 'basiclightbox';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ photos, onClick }) => {
  return photos.map(({ id, largeImageURL, webformatURL, tags }) => (
    <li className="ImageGalleryItem" key={id}>
      <a className="gallery__item" href={largeImageURL}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          title={tags}
          loading="lazy"
          //   onClick={onClick({ largeImageURL, tags })}
        />
      </a>
    </li>
  ));
};
