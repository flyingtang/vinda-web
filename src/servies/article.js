import request from '../utils/request';
import path from "path"


const prefixUrl = "/article"


export async function find(filter={}){
  console.log(filter, "333")
  filter  = Object.assign({}, {page: 1}, filter)
    let url = prefixUrl
    console.log(filter, JSON.stringify(filter));

    url += `?filter=${JSON.stringify(filter)}`
    console.log(url, "1-212")
    return request(url) 
}

export async function update(id, values){
  return request(`${prefixUrl}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export async function create(values){
  const options = {
     method: "POST",
     body: JSON.stringify(values)
  }
  return request(prefixUrl, options)
}


export async function deleteAll(ids){
  const options = {
    method: "delete",
    body: JSON.stringify({ids: ids})
  }
  return request(prefixUrl, options)
}

export async function deleteOne(id){
 
  const url = `${prefixUrl}/${id}`;

  const options = {
    method: "delete",
  }
  return request(url, options)
}

export async function findById(id){
  const url = `${prefixUrl}/${id}`;
  return request(url)
}