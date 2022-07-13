<template>
  <div class="main">
    <Menu />
    <h2 class="title">Bem Vindo ao Gerenciador</h2>
    <div class="d-flex align-items-center justify-content-around conteudo">
      <b-card tag="article" class="teste" type="button" @click="func">
        <users-icon size="2x" class="custom-class"></users-icon>
        <b-card-text> Funcionários </b-card-text>
      </b-card>
      <b-card tag="article" class="teste" type="button" @click="created">
        <user-plus-icon size="2x" class="custom-class"></user-plus-icon>
        <b-card-text> Cadastro </b-card-text>
      </b-card>
      <b-card tag="article" class="teste" type="button">
        <settings-icon size="2x" class="custom-class"></settings-icon>
        <b-card-text> Editar Funcionários </b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
import { UsersIcon, UserPlusIcon, SettingsIcon } from "vue-feather-icons";
import Menu from "@/components/menu.vue";
export default {
  methods: {
    func() {
      this.$router.push({ name: "funcionarios" });
    },
      created() {
      this.$router.push({ name: "created-employee" });
    },
  },
  components: {
    Menu,
    UsersIcon,
    UserPlusIcon,
    SettingsIcon,
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
}
.conteudo {
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
}
.teste {
  width: 13vw;
}
.title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: whitesmoke;
}
</style>