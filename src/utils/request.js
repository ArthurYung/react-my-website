import axios from 'axios'
export default ({ url, method = 'get', data, headers = {} }) => {
  return axios({
    url,
    method,
    data,
    headers: {
      'Authorization': localStorage.getItem('githubToken'),
      ...headers
    }
  }).then(({ data }) => ({ data })).catch(({ error }) => ({ error }))
}
