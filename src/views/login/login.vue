<template>
  <div class="d-flex justify-content-between main">
    <div class="FormL d-flex align-items-center justify-content-center">
      <b-form @submit.prevent="Login">
        <h2 class="LoginTitle">LOGIN</h2>
        <b-form-group class="pb-3 inputPosition">
          <p class="sub">Email</p>
          <b-input
            type="email"
            placeholder="exemplo: admin@gmail.com"
            class="input shadow-none"
            v-model="usuario.email"
          />
        </b-form-group>
        <b-form-group class="inputPosition">
          <p class="sub-title2">Senha</p>
          <b-input
            v-if="showPassword"
            class="input shadow-none"
            type="text"
            placeholder="exemplo: senha123@"
            v-model="usuario.password"
          />
          <b-input
            v-else
            class="input shadow-none"
            type="password"
            placeholder="exemplo: senha123@"
            v-model="usuario.password"
          />
          <i type="button" @click="toggleShow">
            <eye-icon size="1.3x" v-if="showPassword" />
            <eye-off-icon size="1.3x" v-else />
          </i>
        </b-form-group>
        <div class="btn pt-4">
          <b-button type="submit" class="custom-class"
            ><arrow-right-icon size="1.5x"
          /></b-button>
        </div>
        <footer class="footer1">
          <div class="d-flex justify-content-center my-2 border-bottom pb-1">
            <span>desafio@teste.com.br</span>
          </div>
          <div class="d-flex justify-content-center">
            <label>Desafio Gerenciador Teste © Copyright 2022</label>
          </div>
        </footer>
      </b-form>
    </div>
  </div>
</template>
<script>
import { ArrowRightIcon } from "vue-feather-icons";
import { BForm, BFormGroup, BButton, BCardSubTitle } from "bootstrap-vue";
import { EyeIcon, EyeOffIcon } from "vue-feather-icons";

export default {
  data() {
    return {
      showPassword: false,
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    Login() {
      this.$store
        .dispatch("Login", this.usuario)
        .then(() => {
          this.$router.push({ name: "home" });
          this.$toast(`Login efetuado com sucesso`, {
            type: "success",
          });
          this.$store.dispatch("Role", this.usuario)
          .then((response)=>{

          })
          localStorage.setItem("sessionLogin", this.usuario.email);
          localStorage.setItem('sessionId',)
        })
        .catch((erro) => {
          if (erro.request.status == 400) {
            this.$toast(`Email e senha precisam ser preenchidos.`, {
              type: "info",
            });
          }
          if (erro.request.status == 401) {
            this.$toast(`Email ou senha inválidos.`, {
              type: "error",
            });
          }
        });
    },
  },
  components: {
    ArrowRightIcon,
    BForm,
    BFormGroup,
    BButton,
    BCardSubTitle,
    EyeIcon,
    EyeOffIcon,
  },
};
</script>
<style scoped>
i {
  position: absolute;
  margin-top: -17%;
  right: 2%;
  color: #110729;
  background-color: whitesmoke;
  width: 12%;
}
.inputPosition {
  position: relative;
}
.LoginTitle {
  padding-bottom: 27%;
}
.sub {
  width: 43px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -16%;
  background-color: whitesmoke;
  position: absolute;
}
.sub-title2 {
  width: 44px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -20%;
  background-color: whitesmoke;
  position: absolute;
}
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
  background-repeat: no-repeat;
  background-image: url("../../assets/reuniao.jpg");
  background-size: 60%;
  background-position-x: 89%;
  background-position-y: 48%;
}
.btn {
  width: 40%;
}
.custom-class {
  width: 100%;
  background-color: #110729;
}
.custom-class:hover {
  background-color: #07cbf5;
}
.FormL {
  width: 30%;
  border-right: solid 2px #4b6a86;
  background-color: whitesmoke;
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
.footer1 {
  color: #110729;
  padding-top: 30%;
  left: 3.4%;
  font-size: 15px;
}
@media screen and (max-width: 800px) {
  .sub,
  .sub-title2 {
    top: 25px;
    width: 15%;
    position: relative;
  }
  .FormL {
    width: 100%;
    border-right: none;
  }
  .footer1 {
    left: 8%;
  }
}
</style>