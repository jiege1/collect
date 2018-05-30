
export default class Utils {

  static isLocal() {
    return process.env.NODE_ENV === 'development';
  }
}