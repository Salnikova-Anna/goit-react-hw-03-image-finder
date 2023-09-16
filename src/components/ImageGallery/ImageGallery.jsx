import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    isShowModal: false,
  };

  largeImage = '';
  imageDescription = '';

  onImageClick = evt => {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ isShowModal: true });
    this.largeImage = evt.target.closest('a').href;
    this.imageDescription = evt.target.alt;
  };

  hideModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    return (
      <>
        <ImageGalleryStyled onClick={this.onImageClick}>
          {this.props.images.map(image => (
            <ImageGalleryItem
              id={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              key={image.id}
            />
          ))}
        </ImageGalleryStyled>
        {this.state.isShowModal && (
          <Modal
            largeImageURL={this.largeImage}
            tags={this.imageDescription}
            hideModal={this.hideModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
