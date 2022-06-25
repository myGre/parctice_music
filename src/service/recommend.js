import { get } from "./base";

// 轮播数据接口
export function getBanners() {
  return get('/banner', {
    type: 2
  })
}