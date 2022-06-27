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
    console.log(listHeightVal);
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
      }
    }
  })

  onMounted(()=>{
    caculate()
  })
  return {
    onScroll,
    groupRef,
    fixedTag
  }
}

