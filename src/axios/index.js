import axios from 'axios';

const myUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3005' : 'https://www.vanoc.top/node/'

axios.defaults.baseURL = myUrl;
axios.create({
  timeout: 5000
});

export default axios;