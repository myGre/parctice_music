// 加载动画指令
import loading from "@/components/base/Loading.vue"
import { createApp } from "vue"

export default {
  install(app){
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
