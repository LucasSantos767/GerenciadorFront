<template>
  <div class="main">
    <Menu />
    <div>
      <b-table
        class="tabela"
        striped
        borderless
        responsive
        hover
        fixed
        :items="usuarios"
        :fields="filds"
      >
        <template #cell(name)="data">
          <b-card-text class="info">{{ data.value }}</b-card-text>
        </template>
        <template #cell(email)="data">
          <b-card-text class="info">{{ data.value }}</b-card-text>
        </template>
        <template #cell(role)="data">
          <b-card-text class="info">{{ data.value }}</b-card-text>
        </template>
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
      .catch((erro) => console.log(erro))
      .finally(() => console.log(this.usuarios));
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
.tabela {
  width: 60%;
  margin-top: 3%;
  margin-left: 20%;
  background-color: #dcdcdc;
  border-radius: 15px;
}
.info {
  color: #110729;
}
</style>