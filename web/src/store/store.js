// 引入 vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const arr = JSON.parse(localStorage.getItem('data'))

const store = new Vuex.Store({
  state: {
    selectFoods: arr || [],
    minFee: 0
  },
  mutations: {
    addCart (state, food) {
      let flag = false
      state.selectFoods.some(ele => {
        if (ele.spuId === food.spuId) {
          ele.count++
          flag = true
          return true
        }
      })

      if (!flag) {
        state.selectFoods.push({ ...food, count: 1 })
      }
      localStorage.setItem('data', JSON.stringify(state.selectFoods))
    },
    delCart (state, food) {
      state.selectFoods.some(ele => {
        if (ele.spuId === food.spuId) {
          ele.count--
          if (  ele.count === 0) {
            state.selectFoods = state.selectFoods.filter(item => item.spuId !== food.spuId)
          }
          return true
        }
      })

      localStorage.setItem('data', JSON.stringify(state.selectFoods))
    },
    sEmptyCart (state) {
      state.selectFoods = []
      localStorage.setItem('data', JSON.stringify(state.selectFoods))
    },
    setMinFee (state, minFee) {
      state.minFee = minFee
    }
  },

  getters: {
    // {spuId : count} 构造一个 spuId : count 的格式对象
    count1 (state) {
      let o = {}
      state.selectFoods.forEach(item => {
        o[item.spuId] = item.count
      })
      return o
    },
    // 每个类型的数量
    typeNum (state) {
      let o = {}
      state.selectFoods.forEach(item => {
        if (item.tag in o) {
          o[item.tag] += item.count
        } else {
          o[item.tag] = item.count
        }
      })
      return o
    },
    totalPrice (state) {
      let currentTotalPrice = 0
      let oldTotalPrice = 0
      if (state.selectFoods.length !== 0) {
        state.selectFoods.forEach(ele => {
          currentTotalPrice += ele.count * ele.currentPrice
          oldTotalPrice += ele.count * ele.originPrice
        })
      }
      return {
        currentTotalPrice: currentTotalPrice.toFixed(2),
        oldTotalPrice: oldTotalPrice.toFixed(2)
      }
    },
    totalCount (state) {
      let totalCount = 0
      if (state.selectFoods.length !== 0) {
        state.selectFoods.forEach(ele => {
          totalCount += ele.count
        })
      }
      return totalCount
    },
    cartBgc (state, getters) {
      let bgc
      if (getters.totalCount) {
        bgc = 'bgc'
      } else {
        bgc = ''
      }
      return bgc
    },
    payStatus (state, getters) {
      let payStatus
      let bgcColor
      if (getters.totalPrice.currentTotalPrice <= 0) {
        payStatus = `${state.minFee}起送`
        bgcColor = '#3b3b3c'
      } else if (getters.totalPrice.currentTotalPrice <= state.minFee) {
        payStatus = `差${(
          state.minFee - getters.totalPrice.currentTotalPrice
        ).toFixed(2)}元起送`
        bgcColor = '#2e2d2d'
      } else {
        payStatus = '去结算'
        bgcColor = '#f8c74e'
      }
      return { payStatus, bgcColor }
    }
  }
})

export default store
