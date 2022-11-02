import { Component } from 'react';
import { toast } from 'react-toastify';

// import '../../css/styles.css';

export class Searchbar extends Component {
  state = {
    // photos: [],
    searchPhotos: '',
    page: 1,
    // per_page: 12,
    // images: 0,
    // isLoading: false,
    // error: null,
    // showModal: false,
    // largeImageURL: '',
    // tags: '',
    // isActiveBtnLoadMore: false,
  };

  handleChange = evt => {
    this.setState({ searchPhotos: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { searchPhotos, photos, page } = this.state;
    evt.preventDefault();

    if (searchPhotos.trim() === '') {
      return toast.info('Input search name please ...');
    }
    this.props.onSubmit({ ...this.state });
    // this.props.onSubmit(
    //   //   this.state.photos,
    //   this.state.searchPhotos,
    //   this.state.page,
    //   this.state.per_page
    // );
    console.log('handleSubmit... searchPhotos, ', this.state.searchPhotos);

    // try {
    //   this.feachPhotos();
    // } catch (error) {
    //   toast.error(error);
    //   // Notify.failure(error);
    // }

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
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

// export const Searchbar = ({ handleChange, handleSubmit }) => {
//   return (
//     <header class="searchbar">
//       <form class="form" onSubmit={this.handleSubmit}>
//         <button type="submit" class="button">
//           <span class="button-label">Search</span>
//         </button>

//         <input
//           class="input"
//           type="text"
//           value={this.state.searchPhotos}
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//           onChange={this.handleChange}
//         />
//       </form>
//     </header>
//   );
// };
