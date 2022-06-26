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