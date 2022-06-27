
import { get } from "./base";

// 歌手列表
export function getSingerList(arrSingerCharCode) {
  let singerList = []
  let promiseArr = []
  for (let i = 0; i < arrSingerCharCode.length; i++) {
    promiseArr.push(
      new Promise((resolve, reject) => {
        change(arrSingerCharCode[i], singerList, resolve)
      })
    )
  }
  return Promise.all(promiseArr).then(() =>{
    // 排序歌手列表
    singerList.sort((a, b)=> {
      return a.tag.charCodeAt() - b.tag.charCodeAt()
    })
    singerList.unshift(singerList.pop())
    return singerList
  })

}
function change(item, singerList, resolve) {
  if (item === "热") {
    // 热门歌手
    get('/top/artists').then(result => {
      singerList.push({
        tag: item,
        artists: result.artists
      })
      resolve()
    }).catch(err => {
      throw err
    })
  } else {
    get('/artist/list', {
      initial: item,
      type: 1,
      area: 7
    }).then(result => {
      singerList.push({
        tag: item,
        artists: result.artists
      })
      resolve()
    }).catch(err => {
      throw err
    })
  }
}