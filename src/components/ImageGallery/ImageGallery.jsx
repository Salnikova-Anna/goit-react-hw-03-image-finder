import { ImageGalleryStyled } from './ImageGallery.styled';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <>
        <ImageGalleryStyled>
          {this.props.images.map(image => (
            <ImageGalleryItem
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              key={image.id}
            />
          ))}
        </ImageGalleryStyled>
      </>
    );
  }
}

export default ImageGallery;
