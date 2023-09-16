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
    images: null,
    searchQuery: '',
    isShowLoadMoreBtn: false,
  };

  page = 1;
  perPage = 12;

  handleSubmitBtn = value => {
    this.page = 1;
    this.setState({ searchQuery: value, images: null });
  };

  componentDidUpdate(_, prevState) {
    prevState.searchQuery !== this.state.searchQuery && this.fetchImages();
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await getImagesBySearchQuery(
        this.state.searchQuery,
        this.page,
        this.perPage
      );

      this.state.images
        ? this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }))
        : this.setState({ images: data.hits });

      data.totalHits - this.perPage * this.page > this.perPage ||
      data.totalHits - this.perPage * this.page > 0
        ? this.setState({ isShowLoadMoreBtn: true })
        : this.setState({ isShowLoadMoreBtn: false });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMoreBtn = () => {
    this.page += 1;
    this.fetchImages();
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitBtn} />
        {this.state.images && (
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
