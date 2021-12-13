import axios from '../utils/axiosInstance';

const apis = (modelPath) => ({
  getAll: ({ limit, offset }) => axios.get(`${modelPath}/?limit=${limit}&offset=${offset}`),
  getById: (id) => axios.get(`${modelPath}/${id}`),
  create: (doc) => axios.post(`${modelPath}`, doc),
  getCommentsById: ({ limit, offset, blogId }) => axios.get(`${modelPath}/${blogId}?limit=${limit}&offset=${offset}`),
});

export default apis;
