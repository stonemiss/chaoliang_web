import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    num:sessionStorage.getItem('num')?sessionStorage.getItem('num'):'1',
    secondNum:sessionStorage.getItem('secondNum')?sessionStorage.getItem('secondNum'):'',
    searchText:sessionStorage.getItem('searchText')?sessionStorage.getItem('searchText'):'',
    eduActiveId:sessionStorage.getItem('eduActiveId')?sessionStorage.getItem('eduActiveId'):'',
    newActiveId:sessionStorage.getItem('newActiveId')?sessionStorage.getItem('newActiveId'):'',
  },
  mutations: {
    //改变数字
    changeNum(state,val) {
      state.num = val
      window.sessionStorage.setItem('num',val)
    },
    changeSecondNum(state,val) {
      state.secondNum = val
      window.sessionStorage.setItem('secondNum',val)
    },
    changeSearchText(state,val) {
      state.searchText = val
      window.sessionStorage.setItem('searchText',val)
    },
    changeEduActiveId(state,val) {
      state.eduActiveId = val
      window.sessionStorage.setItem('eduActiveId',val)
    },
    changeNewActiveId(state,val) {
      state.newActiveId = val
      window.sessionStorage.setItem('newActiveId',val)
    },
  },
  actions: {},
  modules: {},
});
