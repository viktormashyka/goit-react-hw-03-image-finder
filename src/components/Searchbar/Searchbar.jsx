import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchPhotos: '',
  };

  handleChange = evt => {
    this.setState({ searchPhotos: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { searchPhotos } = this.state;
    evt.preventDefault();

    if (searchPhotos.trim() === '') {
      return toast.info('Input search name please ...');
    }
    this.props.onSubmit({ ...this.state });
    // this.props.onSubmit(
    //   this.state.photos,
    //   this.state.searchPhotos,
    //   this.state.page,
    //   this.state.per_page
    // );
    console.log('handleSubmit... searchPhotos, ', this.state.searchPhotos);

    this.reset({ searchPhotos });
    // this.setState({ searchPhotos: '' });
  };

  reset = () => {
    this.setState({ searchPhotos: '' });
  };

  render() {
    const { searchPhotos } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={searchPhotos}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  state: PropTypes.shape({
    searchPhotos: PropTypes.string.isRequired,
  }).isRequired,
};
