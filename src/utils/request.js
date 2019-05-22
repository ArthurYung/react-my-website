import axios from 'axios'
export default ({ url, method = 'get', data, headers = {}, cancelToken }) => {
  return axios({
    url,
    method,
    data,
    cancelToken,
    headers: {
      'Authorization': localStorage.getItem('githubToken'),
      ...headers
    }
  }).then(({ data }) => ({ data })).catch(({ error }) => ({ error }))
}
