import { get } from "./base";

// 获取歌曲详情
export function getSong(id) {
  return get(`/song/url?id=${id}`)
}