// 统一查询方法
export async function find(prefixUrl, filter) {
    filter  = Object.assign({}, {page: 1}, filter)
    let url = prefixUrl
    console.log(filter, JSON.stringify(filter));

    url += `?filter=${JSON.stringify(filter)}`
    console.log(url, "1-212")
    return request(url) 
}