const axios = require('axios');

const URL = 'https://pixabay.com/api';
const KEY = '27967151-ab8cfc2615dc84471ea9a640f';

export function fetchImages(keyword, page) {
  return axios
    .get(
      `${URL}/?q=${keyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=15`
    )
    .then(r => r.data);
}
