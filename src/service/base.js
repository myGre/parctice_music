import axios from "axios";

// get请求
export function get(url, params) {
  return axios.get(url, params ).then(res => {
    return res.data
  })
  .catch(err => {
    throw err
  })
}