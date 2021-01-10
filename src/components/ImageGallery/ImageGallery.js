import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    totalPage: null,
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImages !== this.props.searchImages) {
      this.setState({ images: [], totalPage: null, page: 1 });
      this.fetchData();
    } else if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const API_KEY = '18602896-269905921176f8eb36b1925d1';
    const BASE_URL = 'https://pixabay.com/api';
    const url = `${BASE_URL}/?q=${this.props.searchImages}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    this.setState({ loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((res) =>
        this.setState(({ images }) => ({
          images: [...images, ...res.hits],
          totalPage: res.total,
        }))
      )
      .finally(() => this.setState({ loading: false }));
  };

  handlerLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, loading, totalPage, page } = this.state;
    const remainingPages = totalPage - page * 12;
    return (
      <>
        <ul className="ImageGallery">
          {totalPage !== 0 ? (
            images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                image={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
                onClick={this.props.openModal}
              />
            ))
          ) : (
            <div>По вашему запросу ничего не найдено!</div>
          )}
        </ul>
        {!loading && remainingPages > 0 && (
          <Button onClick={this.handlerLoadMoreClick} />
        )}
        <div className="spiner">
          {loading && (
            <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
          )}
        </div>
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchImages: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
