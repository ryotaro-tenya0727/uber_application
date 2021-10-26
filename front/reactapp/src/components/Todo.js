import axios from 'axios';

export const fetch = () => {
  return axios
    .get('http://localhost/issues')
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
