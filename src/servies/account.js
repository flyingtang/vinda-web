
import path from "path";
import request from '../utils/request';
const prefixUrl = "/account"

export async function login(data){
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    }
    const url = path.join(prefixUrl, "login")
    return request(url, options)
}