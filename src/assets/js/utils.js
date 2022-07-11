
// 设置时间格式
export function formatTime(interval) {
  // mm:ss
  interval = interval | 0 // 取整
  // 分钟 padStart不足两位补0
  const m = ((interval / 60 | 0) + '').padStart(2, '0')  
  // 秒
  const s = ((interval % 60 | 0) + '').padStart(2, "0")
  
  return `${m}:${s}`
}

// 处理歌词
export function formatLyaic(currentSong) {
  // console.log(currentSong);
  /* 
    reduce((total, currentValue, currentIndex, arr) =>{}, initialValue)
    @params:
      total        必填项，初始值，或计算后返回的值
      currentValue 必填项，当前元素
      currentIndex 可选项，当前元素索引
      arr          可选项，当前元素所在的数组对象
      initialValue 可选项，传递函数的初始值
  */
  let arr = currentSong.split('[').filter(item => item != "").reduce((total, currentValue)=>{
    let obj = {}
    let time = currentValue.split("]")[0] // 01:20.32
    // 处理时间格式
    let timeArr = time.split(":") 
    obj.time = timeArr[0] * 60 + timeArr[1] * 1
    obj.currentSong = currentValue.split("]")[1]
    total.push(obj)
    return total
  }, [])
  return arr.filter(item => item.currentSong.trim() !== "")
}