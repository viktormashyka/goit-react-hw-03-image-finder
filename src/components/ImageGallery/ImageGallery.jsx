import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

// import * as basicLightbox from 'basiclightbox';

// import { fetchPhotos } from 'api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from 'components/Loader/Loader';
// import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  render() {
    const { photos } = this.props;
    return (
      <div>
        <ul className="ImageGallery">
          <ImageGalleryItem photos={photos} />
        </ul>
      </div>
    );
  }
}
