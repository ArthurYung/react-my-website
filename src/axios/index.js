import axios from 'axios';

// your http
const myUrl = 'https://www.vanoc.top/node/'

axios.defaults.baseURL = myUrl;
axios.create({
  timeout: 5000
});

export default axios;