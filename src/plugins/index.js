// 加载动画指令
import loading from "@/components/base/Loading.vue"
import { createApp } from "vue"
import { useIntersectionObserver } from "@vueuse/core"
import defaultImg from "@/assets/images/lazy.png"
export default {
  install(app) {
    // 自定义加载指令
    app.directive("loading", {
      mounted(el, binding) {
        // console.log(el, binding);
        // loading组件应用对象
        const app = createApp(loading)
        // loading组件实例对象
        const instance = app.mount(document.createElement("div"))
        el.instance = instance
        if (binding.value) {
          appendEl(el)
        }
      },
      updated(el, binding) {
        if (binding.value !== binding.oldValue) {
          remove(el)
        }
      }
    })
    // 图片懒加载指令
    app.directive("img-lazy", {
      mounted(el, binding) {
        // 设为默认图片
        el.src = defaultImg
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // isIntersecting为TRUE时进入视图区
          if (isIntersecting) {
            el.onerror = function() {
              el.src = defaultImg
            }
            el.src = binding.value
            // 停止监听
            stop()
          }
        })
      }
    })
  }
}

function appendEl(el) {
  const style = getComputedStyle(el)
  const arr = ["fixed", "absolute", "relative"]
  if (arr.indexOf(style.position)) {
    el.classList.add("g-relative")
  }
  el.appendChild(el.instance.$el)
}
function remove(el) {
  el.classList.remove("g-relative")
  el.removeChild(el.instance.$el)
}
