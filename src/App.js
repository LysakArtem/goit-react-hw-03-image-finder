import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    searchImages: '',
    showModal: false,
    largeImg: '',
    altImg: '',
  };

  toggleModal = (img, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg: img,
      altImg: alt,
    }));
  };

  formSubmitHandler = (img) => {
    this.setState({ searchImages: img });
  };
  render() {
    const { searchImages, showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImg} alt={this.state.altImg} />
          </Modal>
        )}
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          searchImages={searchImages}
          openModal={this.toggleModal}
        />
      </>
    );
  }
}
export default App;
