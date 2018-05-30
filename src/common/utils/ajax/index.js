import axios from 'axios';
import Utils from 'common/utils';

/**
 * Ajax.query({url, params, method = 'get'})
 *
 */
export default class Ajax {

  // static getApi(url) {
  //   console.log(Utils.isLocal());
  //   let api = CFG.api[url];
  // }

  static query({url, params, method = 'get'}) {

    const api = CFG.api[url];

    if (method === 'get') {
      params = {params};
    }

    return axios[method](api, params).then(res => {
      console.log('res', res);
      return new Promise((resolve, reject) => {
        if (res) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
    });
  }
}