<template>
  <div class="main">
    <Menu />
    <div class="FormL d-flex align-items-center justify-content-center">
      <b-form @submit.prevent="Cadastro">
        <h2 class="CadastroTitle">Cadastro</h2>
        <b-form-group class="pb-3 inputPosition">
          <p class="sub">Nome</p>
          <b-input
            type="text"
            placeholder="exemple: Sávio"
            class="input shadow-none"
            v-model="usuario.name"
          />
        </b-form-group>
        <b-form-group class="pb-3 inputPosition">
          <p class="sub">Email</p>
          <b-input
            type="email"
            placeholder="exemple: Sávio@gmail.com"
            class="input shadow-none"
            v-model="usuario.email"
          />
        </b-form-group>
        <b-form-group class="pb-3 inputPosition">
          <p class="sub-title2">Senha</p>
          <b-input
            v-if="showPassword"
            class="input shadow-none"
            type="text"
            placeholder="exemple: senha123@"
            v-model="usuario.password"
          />
          <b-input
            v-else
            class="input shadow-none"
            type="password"
            placeholder="exemple: senha123@"
            v-model="usuario.password"
          />
          <i type="button" @click="toggleShow">
            <eye-off-icon size="1.3x" v-if="showPassword" />
            <eye-icon size="1.3x" v-else />
          </i>
        </b-form-group>
        <b-form-group class="inputPosition">
          <p class="sub-title2">Cargo</p>
          <b-form-select
            class="input shadow-none"
            type="selected"
            :options="options"
            v-model="usuario.role"
          />
        </b-form-group>

        <b-button type="submit" class="custom-class">Criar</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
import { EyeIcon, EyeOffIcon } from "vue-feather-icons";
export default {
  data() {
    return {
      showPassword: false,
      usuario: {
        name: "",
        email: "",
        password: "",
        role: null,
      },
      selected: null,
      options: [
        { value: null, text: "-- Selecione um cargo --", disabled: true },
        { value: "user", text: "Usuário" },
        { value: "admin", text: "Admin" },
      ],
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    async Cadastro() {
      this.$http
        .post("register", this.usuario)
        .then((response) => {
          this.$toast(`Usuário cadastrado com sucesso.`, {
            type: "success",
          });
          this.usuario.name = null;
          this.usuario.email = null;
          this.usuario.password = null;
          this.usuario.role = null;
        })
        .catch((erro) => {
          if (erro.request.status == 400) {
            this.$toast(`Dados precisam ser preenchidos.`, {
              type: "info",
            });
          }
          if (erro.request.status == 500) {
            this.$toast(`Email já cadastrado.`, {
              type: "error",
            });
          }
          if (erro.request.status == 403) {
            this.$toast(`Você não tem permissão.`, {
              type: "error",
            });
          }
          if (erro.request.status == 401) {
            this.$store.commit("DESLOGAR_USUARIO");
            this.$toast(`Token expirado.`, {
              type: "error",
            });
          }
        });
    },
  },
  components: {
    Menu,
    EyeIcon,
    EyeOffIcon,
  },
};
</script>
<style scoped>
i {
  position: absolute;
  margin-top: -25%;
  right: 4%;
  color: #110729;
  background-color: whitesmoke;
}
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
}
.inputPosition {
  position: relative;
}
.CadastroTitle {
  padding-bottom: 20%;
}
.sub {
  width: 43px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -13%;
  background-color: whitesmoke;
  position: absolute;
}
.sub-title2 {
  width: 44px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -18%;
  background-color: whitesmoke;
  position: absolute;
}
.FormL {
  height: 70%;
  width: 50%;
  border-right: solid 2px #4b6a86;
  background-color: whitesmoke;
  margin-left: 25%;
  margin-top: 3%;
  border-radius: 10px;
}
.input {
  display: flex;
  border-radius: 10px;
  border: 2px solid #110729;
  margin-bottom: 20px;
  background: none;
  height: 35px;
  width: 100%;
  font-size: 12px;
  outline: none;
}
.input:focus {
  font-size: 12px;
  color: black;
  background-color: whitesmoke;
  border: solid 2px #07cbf5;
}
.custom-class {
  width: 100%;
  margin-top: 4%;
  background-color: #110729;
}
.custom-class:hover {
  background-color: #07cbf5;
}
@media screen and (max-width: 800px) {
  .FormL {
    width: 70%;
    margin-left: 15%;
  }
}
</style>