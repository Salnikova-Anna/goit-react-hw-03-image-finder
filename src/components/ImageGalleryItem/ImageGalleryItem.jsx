import { Component } from 'react';
import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  showModal = () => {
    this.setState({ isShowModal: true });
  };

  hideModal = () => {
    this.setState({ isShowModal: false });
  };

  onImageClick = evt => {
    evt.preventDefault();
    this.showModal();
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <ImageGalleryItemStyled onClick={this.onImageClick}>
          <ImageGalleryItemImage src={webformatURL} alt={tags} />
        </ImageGalleryItemStyled>
        {this.state.isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            hideModal={this.hideModal}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
