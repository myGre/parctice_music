import { ref } from "vue";

export default function useShortcut(groupRef) {
  const scrollRef =ref(null)
  // 记录触摸数据
  const tcuth = {}
  // 触摸时触发事件
  function onShortcutTargeEl(e) {
    const shortcutIndex = e.target.dataset.index;
    tcuth.y1 = e.touches[0].pageY // 初始化pageY
    tcuth.index1 = shortcutIndex // 初始化位置
    scrollTo(shortcutIndex)
  }
  // 触摸移动时触发事件
  function onShortcutTargeElMove(e) {
    tcuth.y2 = e.touches[0].pageY
    const deletaIndex = Math.floor((tcuth.y2 - tcuth.y1)/18)
    const index =  tcuth.index1/1 + deletaIndex/1
    scrollTo(index)
  }
  function scrollTo(index){
    // 限制长度
    index = Math.max(0, Math.min(index, groupRef.value.children.length -1))
    const scroll = scrollRef.value.scroll;
    const shortcutEl = groupRef.value.children;
    scroll.scrollToElement(shortcutEl[index])

  }
  return {
    scrollRef,
    onShortcutTargeEl,
    onShortcutTargeElMove
  }
}