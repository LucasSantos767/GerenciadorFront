<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em class="p">User</em>
          </template>
          <b-dropdown-item class="p">Profile</b-dropdown-item>
          <b-dropdown-item @click="efetuarLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </nav>
</template>
<script>
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
export default {
  methods: {
    efetuarLogout() {
      localStorage.clear("token");
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
  },
};
</script>
<style>
.menucolor {
  background-color: whitesmoke;
}
.p {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #110729;;
}
.aa {
  width: 100vw;
}
</style>