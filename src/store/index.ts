import { http } from '@/services/api';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null,
    role: null,
    id: localStorage.getItem('id') || null, 
    email: localStorage.getItem('email') || null 
  },
  getters: {
    IsAdmin: (state) => state.role === 'admin',
    Nome: (state) => state.usuario,
    Email: (state)=> state.email,
    Role: (state)=> state.role
  },
  mutations: {
    USUARIO_LOGADO(state, { token }) {
      state.token = token
    },
    DESLOGAR_USUARIO(state) {
      state.token = null
      state.usuario = null
      state.role = null
      state.email = null
      localStorage.clear()
    },
    SALVAR_ROLE(state, { role, usuario,email,id }) {
      state.role = role
      state.usuario = usuario
      state.email = email
      state.id = id
    }
  },
  actions: {
    Login({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        http.post('login', usuario)
          .then(response => {
            commit('USUARIO_LOGADO', {
              token: response.data.access_token,
              role: usuario.role,
            })
            resolve(response.data)
          })
          .catch(erro => {
            reject(erro)
          })
      })
    },
    Role({ commit }, usuario) {
      http.get(`search/${usuario.email}`)
        .then(response => {
          localStorage.setItem('sessionId',response.data._id)
          commit('SALVAR_ROLE', {
            role: response.data.role,
            usuario: response.data.name,
            email: response.data.email,
            id: response.data._id
          })
        })
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
