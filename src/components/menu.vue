<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <b-link class="navbar-brand a" :to="{ name: 'home' }">
        Gerenciador</b-link
      >
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
             {{ Nome }}
            <user-icon size="1.5x" class="custom-class" />
          </template>
          <b-dropdown-item @click="efetuarLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </nav>
</template>
<script>
import { UserIcon } from "vue-feather-icons";
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
import { mapGetters} from 'vuex'
export default {
   computed: {
    ...mapGetters(["Nome"]),
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
  },
};
</script>
<style scoped>
.a {
  color: black;
}
.a:hover {
  color: blue;
}
.menucolor {
  background-color: whitesmoke;
}
.p {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #110729;
}
.aa {
  width: 100vw;
}
</style>