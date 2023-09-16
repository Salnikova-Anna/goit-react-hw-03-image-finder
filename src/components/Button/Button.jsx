import { LoadMoreButton } from './Button.styled';

export const Button = ({ handleLoadMoreBtn }) => {
  return (
    <LoadMoreButton type="button" onClick={handleLoadMoreBtn}>
      Load more
    </LoadMoreButton>
  );
};
