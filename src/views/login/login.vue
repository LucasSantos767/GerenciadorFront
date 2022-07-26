<template>
  <div class="d-flex justify-content-between main">
    <div class="FormL d-flex align-items-center justify-content-center">
      <b-form @submit.prevent="Login">
        <h2 class="LoginTitle">LOGIN</h2>
        <b-form-group class="pb-3 inputPosition">
          <p class="sub">Email</p>
          <b-input
            type="email"
            class="input shadow-none"
            v-model="usuario.email"
          />
        </b-form-group>
        <b-form-group class="inputPosition">
          <p class="sub-title2">Senha</p>
          <b-input
            class="input shadow-none"
            type="password"
            v-model="usuario.password"
          />
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
export default {
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    Login() {  
      if(this.usuario.email !== this.$store.state.usuario){
      this.$store
        .dispatch("Login", this.usuario)
        .then(() => {
          this.$router.push({ name: "home" });
          this.$toast(`Login efetuado com sucesso`, {
            type: "success",
          });
        this.$store.dispatch("Role",this.usuario)
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
        }else{
         this.$toast(`Usuário já esta logado.`, {
              type: "error",
            });
        }
    },
  },
  components: {
    ArrowRightIcon,
    BForm,
    BFormGroup,
    BButton,
    BCardSubTitle,
  },
};
</script>
<style scoped>
.inputPosition {
  position: relative;
}
.LoginTitle {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-bottom: 43%;
}
.sub {
  width: 43px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -13%;
  background-color: whitesmoke;
  position: absolute;
}
.sub-title2 {
  width: 44px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -18%;
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