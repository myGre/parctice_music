import { computed } from "vue";
import { useStore } from "vuex";
import { setLocal } from "./storage-api";

export default function useMode() {
  const store = useStore()
  // vuex
  const playmode = computed(() => store.state.playmode)

  const modeStyle = computed(() => {
    if (playmode.value === 0) {
      return "icon-sequence"
    }
    if (playmode.value === 1) {
      return "icon-loop"
    }
    if (playmode.value === 2) {
      return "icon-random"
    }
  })
  function modeCode() {
    let mode = (playmode.value + 1) % 3
    store.dispatch("updateMode", mode)
    setLocal("__mode__", mode)
  }
  return {
    modeStyle,
    modeCode
  }
}