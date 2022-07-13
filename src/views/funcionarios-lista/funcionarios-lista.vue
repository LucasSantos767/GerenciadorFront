<template>
  <div class="main">
    <Menu />
    <div class="tabela">
      <b-table
        striped
        bordered
        responsive
        hover
        :items="usuarios"
        :fields="filds"
      >
      </b-table>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
export default {
  data() {
    return {
      usuarios: [],
      filds: [
        {
          key: "name",
          label: "Nome",
          thClass: "text-center",
        },
        {
          key: "email",
          label: "Email",
          thClass: "text-center",
        },
        {
          key: "role",
          label: "Cargo",
          thClass: "text-center",
        },
      ],
    };
  },
  mounted() {
    this.$http
      .get("list-all")
      .then((response) => (this.usuarios = response.data))
      .catch((erro) => console.log(erro));
  },

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
table {
  color: #110729;
}
.tabela {
  width: 90%;
  margin-top: 3%;
  margin-left: 5%;
  background-color: #dcdcdc;
  border-radius: 10px;
}
</style>