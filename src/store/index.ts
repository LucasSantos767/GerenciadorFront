import { http } from '@/services/api';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null,
    role: null
  },
  getters: {
    IsAdmin: (state) => state.role === 'admin'
  },
  mutations: {
    USUARIO_LOGADO(state, { token, usuario }) {
      state.token = token
      state.usuario = usuario
    },
    DESLOGAR_USUARIO(state) {
      state.token = null
      state.usuario = null
      state.role = null
    },
    SALVAR_ROLE(state, { role }) {
      state.role = role
    }
  },
  actions: {
    Login({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        http.post('login', usuario)
          .then(response => {
            commit('USUARIO_LOGADO', {
              token: response.data.access_token,
              usuario: usuario.email,
              role: usuario.role
            })
            resolve(response.data)
          })
          .catch(erro => {
            console.log(erro)
            reject(erro)
          })
      })
    },
    Role({ commit }, usuario) {
      http.get(`search/${usuario.email}`)
        .then(response => {
          commit('SALVAR_ROLE', {
            role: response.data.role
          })
        })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
