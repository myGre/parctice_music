
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