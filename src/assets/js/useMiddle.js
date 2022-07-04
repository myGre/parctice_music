import { ref } from "vue"

export default function useMiddle() {

  const currentShow = ref("cd") // 当前所显示的页面
  const middleLStyle = ref(null) // cd样式
  const middleRStyle = ref(null) //lyric
  const touch = {} // 记录触摸移动


  function onTouchStart(e) {
    touch.x1 = e.touches[0].pageX // 初始位置

  }
  function onTouchMove(e) {
    const duratX1 = e.touches[0].pageX - touch.x1 // 偏移量
    let proportional = 0 // 比例
    // 左滑
    if (duratX1 < 0) {
      touch.proportional = -duratX1 / window.innerWidth
      touch.offset = duratX1
      currentShow.value = touch.proportional > 0.2 ? "lyric" : "cd"
      middleLStyle.value = {
        opacity: `1 - ${touch.proportional}`
      }
      middleRStyle.value = {
        transform: `translate(${touch.offset}px, 0)`
      }
    }
    // 右滑
    if (duratX1 > 0) {
      touch.proportional = duratX1 / window.innerWidth
      touch.offset = -window.innerWidth + duratX1
      currentShow.value = touch.proportional > 0.2 ? "cd" : "lyric"
      middleLStyle.value = {
        opacity: `${touch.proportional}`
      }
      middleRStyle.value = {
        transform: `translate(${touch.offset}px, 0)`
      }
    }

  }
  function onTouchEnd(e) {
    if(currentShow.value === "cd"){
      middleLStyle.value = {
        opacity: 1,
        transtion: `opacity .3s`
      }
      middleRStyle.value = {
        transform: `translate(0, 0)`,
        transtion: `transform .3s`
      }
    } else {
      middleLStyle.value = {
        opacity: 0,
        transtion: `opacity .3s`
      }
      middleRStyle.value = {
        transform: `translate(${-window.innerWidth}px, 0)`,
        transtion: `transform .3s`
      }
    }
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}