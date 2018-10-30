import request from '../utils/request';
import path from "path"


const prefixUrl = "/article"


export async function find(){
    return request(prefixUrl) 
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