import { URLSearchParams } from  "url"

// 转换一个json 对象为url
export function parseObj2Url(obj={}){
    const params = new URLSearchParams();
    Object.keys(obj).forEach(k => {
      params.set(k, obj[k])
    })
    return params.toString()
}