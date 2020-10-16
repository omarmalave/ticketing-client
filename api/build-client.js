import axios from 'axios';

const buildClient = ({ req }) => {
  const onServer = typeof window === 'undefined';
  const baseURL = onServer ? 'http://ingress-nginx-controller.kube-system.svc.cluster.local' : '';
  return axios.create({
    baseURL,
    headers: req?.headers || {},
  });
};

export default buildClient;
