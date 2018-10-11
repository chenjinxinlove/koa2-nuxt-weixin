import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      baseUrl: 'http://veyuxb.natappfree.cc'
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
