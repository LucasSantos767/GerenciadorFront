<template>
  <div class="main">
    <meu-menu/>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
export default {
  components: {
    "meu-menu": Menu,
  },
};
</script>
<style>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
}
</style>