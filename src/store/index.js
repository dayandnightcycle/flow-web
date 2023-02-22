import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

// import createPersistedState from "vuex-persistedstate"
// import createLogger from 'vuex/dist/logger'
// // 判断环境 vuex提示生产环境中不使用
// const debug = process.env.NODE_ENV !== 'production'
// const createPersisted = createPersistedState({
//     storage: window.sessionStorage
// })

// plugins要是一个一维数组不然会解析错误



// 创建一个新的 store 实例
const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 只储存state中的assessmentData
                lc: val.lc
            }
        }

    })],
    state() {
        return {
            lc: ''
        }
    },
    mutations: {
        gblc2(state, bl) {
            state.lc = bl
        }
    },
    actions: {
        gblc(context, bl) {
            context.commit('gblc2', bl)
        }
    }
})

// export default new Vuex.Store({
//     // ...
//     plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
// })
export default store