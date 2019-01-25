import axios from 'axios';

export function dsFile(posts, headers) {
  return axios.post(`http://localhost:8080/deepspeech`, posts, headers);
}
