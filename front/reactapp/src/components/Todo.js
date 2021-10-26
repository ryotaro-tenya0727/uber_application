import axios from 'axios';
import { apiURL } from '../config';

export const fetch = () => {
  return axios
    .get(`${apiURL}/issues`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
