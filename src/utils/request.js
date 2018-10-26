import fetch from 'dva/fetch';
import {message} from "antd"


const prefixUrl = "/api/v1"
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options={}) {
  url = prefixUrl + url 
  console.log(url, "url")
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const response = await fetch(url, options);
  const status = response.status;
  console.log(status, "status")
  const res = await response.json()
  if (status >= 200 && status < 300) {
    return res;
  }else{
      message.error(res["message"]);
  }
}

