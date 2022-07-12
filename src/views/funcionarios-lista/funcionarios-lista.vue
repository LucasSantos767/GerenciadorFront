<template>
  <div class="main">
    <Menu />
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
export default {
  components: {
    Menu,
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
}
</style>