<template>
  <div class="d-flex justify-content-between main">
    <div class="FormL d-flex align-items-center justify-content-center">
      <b-form @submit.prevent="Login">
        <b-form-group class="pb-3">
          <p class="sub">Email</p>
          <b-input
            type="email"
            class="input shadow-none"
            v-model="usuario.email"
          />
        </b-form-group>
        <b-form-group>
          <p class="sub-title2">Senha</p>
          <b-input
            class="input shadow-none"
            type="password"
            v-model="usuario.password"
          />
        </b-form-group>
        <div class="btn pt-3">
          <b-button type="submit" class="custom-class"
            ><arrow-right-icon size="1.5x"
          /></b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { ArrowRightIcon } from "vue-feather-icons";
import { BForm, BFormGroup, BButton, BCardSubTitle } from "bootstrap-vue";
import axios from "axios";
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
      axios
        .post("http://localhost:3000/login", this.usuario)
        .then((resposta) => {
          console.log(resposta);
          localStorage.setItem("token", resposta.data.access_token);
          this.$router.push({ name: "about" });
        })
        .catch((erro) => console.log(erro));
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
<style>
.sub {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #4b6a86;
  font-size: 14px;
  left: 6%;
  top: 34%;
  background-color: whitesmoke;
  position: absolute;
}
.btn {
  width: 55%;
}
.sub-title2 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #4b6a86;
  font-size: 14px;
  left: 6%;
  top: 45%;
  background-color: whitesmoke;
  position: absolute;
}
.title {
  position: absolute;
  color: white;
}
.main {
  height: 100vh;
  width: 100vw;
  background-color: #17202a;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.custom-class {
  background-color: #4b6a86;
}
.FormL {
  width: 30%;
  border-right: solid 2px #4b6a86;
  background-color: whitesmoke;
}
.input {
  display: flex;
  align-items: center;
  min-width: 200px;
  border-radius: 10px;
  border: 2px solid #4b6a86;
  margin-bottom: 20px;
  overflow: hidden;
  background: none;
  height: 35px;
  width: 20vw;
  font-size: 12px;
  outline: none;
  padding: 0 0 0 1rem;
}
.input:focus {
  font-size: 12px;
  color: black;
  background-color: whitesmoke;
  box-shadow: red;
}
@media screen and (max-width: 800px) {
  .sub,
  .sub-title2 {
    top: 25px;
    width: 22%;
    position: relative;
  }
  .FormL {
    width: 100%;
    border-right: none;
  }
}
</style>