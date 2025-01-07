import axios, { type AxiosPromise } from 'axios'
export class DogService {
  constructor(readonly url: string) {}

  public async getDogs(breed: string): AxiosPromise {
    return axios.request({
      baseURL: this.url,
      params: { breed },
      headers: { Accept: 'application/json' },
      method: 'GET',
      url: '/dogs',
      validateStatus: function (status) {
        return status == 200 || status == 404
      }
    })
  }
}
