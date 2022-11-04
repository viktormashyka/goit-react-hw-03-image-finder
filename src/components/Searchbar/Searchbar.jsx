import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchPhotos: '',
    page: 1,
  };

  handleChange = evt => {
    this.setState({ searchPhotos: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { searchPhotos, page } = this.state;
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

    this.reset({ searchPhotos, page });
    // this.setState({ searchPhotos: '' });
  };

  reset = () => {
    this.setState({ searchPhotos: '', page: 1 });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.searchPhotos}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  state: PropTypes.shape({
    searchPhotos: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
};
