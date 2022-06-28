import { ref } from "vue";

export default function useShortcut(groupRef) {
  const scrollRef =ref(null)
  
  function onShortcutTargeEl(e) {
    const shortcutIndex = e.target.dataset.index;
    scrollTo(shortcutIndex)
  }
  function scrollTo(index){
    const scroll = scrollRef.value.scroll;
    const shortcutEl = groupRef.value.children;
    scroll.scrollToElement(shortcutEl[index])

  }
  return {
    scrollRef,
    onShortcutTargeEl
  }
}