<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <b-link
        class="navbar-brand colonav"
        :to="{ name: 'home' }"
        title="Voltar a tela ínicial"
      >
        Gerenciador</b-link
      >
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="height-info">
          <template #button-content>
            <div class="div-info text-capitalize">
              {{ Nome }}
              <p class="cargo">{{ Role }}</p>
            </div>
            <user-icon size="1.7x" class="custom-class" />
          </template>
          <b-dropdown-item @click="efetuarLogout"
            ><log-out-icon
              size="1.5x"
              class="custom-class"
            />Sair</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </nav>
</template>
<script>
import { UserIcon, LogOutIcon } from "vue-feather-icons";
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavItem,
  BCollapse,
  BDropdownItem,
  BNavItemDropdown,
  BNavForm,
} from "bootstrap-vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["Nome", "Role"]),
  },
  data() {
    return {
      user: {
        name: this.$store.state.usuario,
      },
    };
  },
  methods: {
    efetuarLogout() {
      this.$store.commit("DESLOGAR_USUARIO");
      this.$router.push({ name: "login" });
    },
  },
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavItem,
    BCollapse,
    BDropdownItem,
    BNavItemDropdown,
    BNavForm,
    UserIcon,
    LogOutIcon,
  },
};
</script>
<style scoped>
.colonav {
  color: black;
}
.colonav:hover {
  color: blue;
}
.menucolor {
  background-color: whitesmoke;
}
.p {
  font-size: 14px;
}
.div-info {
  position: relative;
  top: 16px;
  font-size: 18px;
  right: 100%;
}
.cargo {
  position: absolute;
  font-size: 12px;
  right: 3px;
}
.height-info{
  top: -21px;
  height: 50px;
}
</style>