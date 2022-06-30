import { createLogger, createStore } from 'vuex'

import getters from './getters'
import state from './state'
import actions from './actions'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== "production" //生产模式下debug为FALSE
export default createStore({
  strict: debug, // 严格模式， 除mutations，谁都不能操作state
  plugins: debug ? [createLogger()] : [], // 自带日志插件，追踪数据变化
  state,
  getters,
  mutations,
  actions,
})
