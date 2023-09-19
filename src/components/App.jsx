import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import { getImagesBySearchQuery } from 'api/images';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    images: [],
    searchQuery: '',
    isShowLoadMoreBtn: false,
    page: 0,
  };

  perPage = 12;

  handleSubmitBtn = value => {
    this.setState({ searchQuery: value, page: 1, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      const { searchQuery, page } = this.state;

      this.setState({ isLoading: true });

      const data = await getImagesBySearchQuery(
        searchQuery,
        page,
        this.perPage
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isShowLoadMoreBtn: this.state.page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitBtn} />
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onImageClick={this.onImageClick}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isShowLoadMoreBtn && (
          <Button handleLoadMoreBtn={this.handleLoadMoreBtn} />
        )}
      </div>
    );
  }
}

export default App;
