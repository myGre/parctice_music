import { computed } from "vue";
import { useStore } from "vuex";
import { setLocal } from "./storage-api";

export default function useFavorite() {
  const store = useStore()

  const favoriteList = computed(()=> store.state.favoriteList)

  const currentSong = computed(()=> store.getters.currentSong)
  const currentIndex = computed(()=> store.state.currentIndex)
  const favoriteIcon = computed(()=>{
    return isFavorite(currentSong.value) < 0 ? "icon-not-favorite" : "icon-favorite"
  })
function isFavorite(currentSong) {
  return favoriteList.value.findIndex(item => item.id === currentSong.id)
}
// 收藏
function addOrremoveFavorite() {
  const favorite = favoriteList.value.slice()
  if (isFavorite(currentSong.value) < 0) {
    favorite.push(currentSong.value)
  } else {
    favorite.splice(currentIndex.value, 1)
  }
  console.log(favorite);
  store.commit("setFavoriteList", favorite)
  setLocal("___favoriteList__", favorite)
}
  return {
    favoriteIcon,
    addOrremoveFavorite
  }
}