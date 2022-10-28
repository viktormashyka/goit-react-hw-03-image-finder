export const Searchbar = ({ handleChange, handleSubmit }) => {
  return (
    <header class="searchbar">
      <form class="form" onSubmit={handleSubmit}>
        <button type="submit" class="button">
          <span class="button-label">Search</span>
        </button>

        <input
          class="input"
          type="text"
          //   name={searchPhotos}
          //   value={filter}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
