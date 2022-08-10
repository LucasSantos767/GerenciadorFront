<template>
  <div class="main">
    <Menu />
    <div class="HomeCab">
      <h2 class="title">Bem Vindo {{ Nome }}, ao Gerenciador</h2>
      <img class="HomeImg" src="../../assets/Group275.png" title="Home gerenciador imagem"/>
    </div>
    <b-row class="d-flex align-items-center justify-content-center conteudo">
      <div class="widhtdiv">
        <b-col class="pt-5">
          <b-card tag="article" type="button" @click="func">
            <users-icon size="2x" class="custom-class"></users-icon>
            <b-card-text> Funcionários </b-card-text>
          </b-card>
        </b-col>
      </div>
      <b-col class="pt-5" v-if="IsAdmin">
        <b-card class="button" tag="article" type="button" @click="created">
          <user-plus-icon size="2x" class="custom-class"></user-plus-icon>
          <b-card-text> Cadastro </b-card-text>
        </b-card>
      </b-col>
      <b-col class="pt-5" v-if="IsAdmin">
        <b-card tag="article" type="button" @click="edit">
          <settings-icon size="2x" class="custom-class"></settings-icon>
          <b-card-text> Editar Funcionários </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { UsersIcon, UserPlusIcon, SettingsIcon } from "vue-feather-icons";
import { mapGetters } from "vuex";
import Menu from "@/components/menu.vue";

export default {
  computed: {
    ...mapGetters(["IsAdmin", "Nome"]),
  },
  methods: {
    func() {
      this.$router.push({ name: "employees" });
    },
    created() {
      this.$router.push({ name: "created-employee" });
    },
    edit() {
      this.$router.push({ name: "edit-employee" });
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
  width: 60%;
  margin-left: 20%;
}
.HomeImg {
  width: 19vw;
}
.HomeCab {
  margin-top: 4%;
}
.title {
  color: whitesmoke;
}
.widhtdiv {
  width: 20vw !important;
}
@media screen and (max-width: 800px) {
  .widhtdiv {
    width: 100% !important;
  }
  .HomeImg {
    width: 30vw;
  }
}
</style>