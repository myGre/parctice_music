import { get } from "./base";

// 轮播数据接口
export function getBanners() {
  return get('/banner', {
    type: 2
  })
}

// 推荐歌单列表
export function getPlaylist() {
  return get('/top/playlist', {
    limit: 50
  })
}
// 歌单详情
export function getPlayDetail(id) {
  return get(`/playlist/detail?id=${id}`)
}
// 歌曲信息
export function getSongDetail(id) {
  return get(`/song/detail?id=${id}`)
}