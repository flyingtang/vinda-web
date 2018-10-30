import fetch from 'dva/fetch';
import {message} from "antd"
import cookie from 'react-cookies'
import router from 'umi/router';
const prefixUrl = "/api/v1"
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options={}) {
  try {
      url = prefixUrl + url 
        console.log(url, "url")
        
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "authorization": cookie.load("token")
        };
        const response = await fetch(url, options);
        const status = response.status;
      
        const res = await response.json()
        if (status >= 200 && status < 300) {
          return res;
        }else if(status==401){
          router.push("/login")
        }else{
            message.error(res["message"]);
        }
  }catch(err) {
    message.error("数据请求出错啦");
  }
}

