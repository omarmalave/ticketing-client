import axios from 'axios';

const buildClient = ({ req }) => {
  const onServer = typeof window === 'undefined';
  const baseURL = onServer ? 'http://www.ticketing-app.cloud' : '';
  return axios.create({
    baseURL,
    headers: req?.headers || {},
  });
};

export default buildClient;
