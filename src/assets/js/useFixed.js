import { computed, nextTick, onMounted, ref, watch } from "vue";

export default function useFixed(props){
  // 位移
  const scrollY = ref(0)
  // 节点元素
  const groupRef = ref(null)
  // 装li的集合
  const listHeight = ref([])
  // 当前li
  const currentIndex = ref(0)
  // 两两li顶部之间的距离
  const instance = ref(0)
  const fixedStyle = computed(()=> {
    let diff = 0
    if (instance.value > 0 && instance.value < 30) {
      // diff为两两li顶部之间的距离差，为负数代表以重叠
      diff = instance.value -30
      console.log(diff);
    }
    return {
      transform: `translate(0, ${diff}px)`
    }
  })
  // 每次滚动的距离
  const onScroll = (pos) => {
    scrollY.value = -pos.y // 正数
    // console.log(scrollY.value);
  }
  // 计算li的高度, 总高度ul
  const caculate = ()=>{
    const list = groupRef.value.children
    let listHeightVal = listHeight.value
    listHeightVal.length = 0
    let height = 0
    listHeightVal.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightVal.push(height)
    }
    // console.log(listHeightVal);
  }
  const fixedTag = computed(()=> {
    if (scrollY.value < 0) {
      return ""
    }
    // 非空校验
    return props.singers[currentIndex.value] ? props.singers[currentIndex.value].tag : ""
  })
  watch(()=> props.singers, async () => {
    await nextTick() // 等页面渲染完成后调用
    caculate()
  })
  watch( scrollY, (newVal) =>{
    const listHeightVal = listHeight.value
    for (let i = 0; i < listHeightVal.length; i++) {
      let tagTop = listHeightVal[i] // 顶部
      let tagBottom = listHeightVal[i+1] // 底部
      if (newVal >= tagTop && newVal < tagBottom) {
        currentIndex.value = i 
        instance.value = tagBottom - newVal
      }
    }
  })

  onMounted(()=>{
    caculate()
  })
  return {
    onScroll,
    groupRef,
    fixedTag,
    fixedStyle,
    currentIndex
  }
}

