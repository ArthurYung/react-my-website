import axios from 'axios';

const myUrl = '//www.vanoc.top/node/'
//const myUrl = 'http://localhost:3005/'

axios.defaults.baseURL = myUrl;
axios.create({
  timeout: 5000
});

export default axios;