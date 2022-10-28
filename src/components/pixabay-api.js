export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '29782836-0cb6e5c5167e525a8102df66c';
  #searchQuery = '';
  //   getTrandPhotos(searchQuery) {
  //     const url = `${this.#BASE_URL}?key=${tiis.#API_KEY}&q=${
  //       this.#searchQuery
  //     }&image_type=photo&orientation=horizontal&safesearch=true`;
  //     fetch(url).then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     });
  //   }
  getSearchPhotos() {
    const url = `${this.#BASE_URL}?key=${tiis.#API_KEY}&q=${
      this.#searchQuery
    }&image_type=photo&orientation=horizontal&safesearch=true`;
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
