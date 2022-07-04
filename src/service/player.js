import { get } from "./base";

// 获取歌曲详情
export function getSong(id) {
  return get(`/song/url?id=${id}`)
}

// 获取歌词lyric

export function getLyric(id) {

  return get(`/lyric?id=${id}`)
}