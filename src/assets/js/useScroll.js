import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, ref, onUnmounted, onActivated, onDeactivated } from 'vue'

BScroll.use(ObserveDOM)

export function useScroll(props, emit) {
  const scroll = ref(null)
  const rootRef = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true, // 开启 observe-dom 插件
      ...props
    })
    if (props.probeType) {
      scroll.value.on("scroll", pos => {
        emit("scroll", pos)
      })
    }
  })
  // 销毁时
  onUnmounted(() => {
    scroll.value.destroy()
  })
  // 激活时
  onActivated(() => {
    scroll.value.enable
    scroll.value.refresh
  })
  // 失活时
  onDeactivated(()=>{
    scroll.value.enable
  })
  return {
    rootRef,
  }
}