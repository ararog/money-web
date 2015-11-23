import * as axios from 'axios';

export class RestService {
  constructor(base, version) {
    axios.interceptors.request.use(function (config) {
        var headers = { 'Content-Type': 'application/json', 'Accept-Version': version}
        if(localStorage.getItem('token'))
          headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        config['headers'] = headers
        return config
      },
      function (error) {
        return Promise.reject(error);
      });

    this.base = base
  }

  post(path, data) {
    return axios.post(this.base + path, data);
  }

  get(path, data) {
    return axios.get(this.base + path, data);
  }

  delete(path, data) {
    return axios.delete(this.base + path);
  }

  put(path, data) {
    return axios.put(this.base + path, data);
  }
}
