import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, ref } from 'vue'

BScroll.use(ObserveDOM)

export function useScroll(props) {
  const scroll = ref(null)
  const rootRef = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true, // 开启 observe-dom 插件
      ...props
      // scrollX: false,
      // scrollY: true
    })
  })
  return {
    rootRef,
  }
}