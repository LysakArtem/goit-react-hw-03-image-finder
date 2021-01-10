import { Component } from 'react';
import PropTypes from 'prop-types';
class Searchbar extends Component {
  state = {
    search: '',
  };
  handlerInputChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
  };
  handlerSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form onSubmit={this.handlerSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handlerInputChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={search}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  Searchbar: PropTypes.func,
};
