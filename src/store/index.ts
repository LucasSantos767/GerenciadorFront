import jwtDecode from 'jwt-decode';
import { http } from '@/services/api';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
  },
  mutations: {
    USUARIO_LOGADO(state, {token}) {
      state.token = token
    },
    DESLOGAR_USUARIO(state) {
      state.token = null
    }
  },
  actions: {
    Login({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        http.post('login', usuario)
          .then(response => {
            commit('USUARIO_LOGADO', {
              token: response.data.access_token
            })
            resolve(response.data)
            var decodedHeader = jwtDecode('token', { header: true });
            console.log(decodedHeader);
          })
          .catch(erro => {
            console.log(erro)
            reject(erro)
          })
      })
    }
  },
  modules: {
  }
})
