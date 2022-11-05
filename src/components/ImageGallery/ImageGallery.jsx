import React, { Component } from 'react';

// import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

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
