import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <ImageGalleryItemStyled>
      <a href={largeImageURL}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </a>
    </ImageGalleryItemStyled>
  );
};
