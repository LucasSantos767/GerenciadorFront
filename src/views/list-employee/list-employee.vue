<template>
  <div class="main">
    <Menu />
    <div class="divTable">
      <div
        class="
          d-flex
          align-items-center
          justify-content-start
          mb-1 mb-md-0
          infoTable
        "
      >
        <p class="listagem">Lista de Usuários</p>
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          :clearable="false"
          class="per-page-selector d-inline-block mx-50 input"
        />
        <b-form-input
          v-model="search"
          class="pesquisa h-75 input shadow-none"
          placeholder="Pesquisar"
        />
      </div>
      <b-table
        class="tabela"
        outlined
        striped
        borderless
        bordered
        responsive
        hover
        :items="usuarios"
        :fields="filds"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="search"
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
      <b-pagination
        v-model="currentPage"
        :total-rows="totalrows"
        :per-page="perPage"
        pills
        hide-goto-end-buttons
        first-number
        last-number
        class="mb-0 mt-1 mt-sm-0 infoTable"
        prev-class="prev-item"
        next-class="next-item"
      >
        <template #prev-text>
          <arrow-left-icon size="1x" class="custom-class" />
        </template>
        <template #next-text>
          <arrow-right-icon size="1x" class="custom-class" />
        </template>
      </b-pagination>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
import { ArrowLeftIcon, ArrowRightIcon } from "vue-feather-icons";
import { SocketModule } from "@/services/socket";
export default {
  data() {
    return {
      usuarios: [],
      socketService: SocketModule.connect(),
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      search: null,
      filds: [
        {
          key: "name",
          label: "NOME",
          thClass: "text-center",
        },
        {
          key: "email",
          label: "EMAIL",
          thClass: "text-center",
        },
        {
          key: "role",
          label: "CARGO",
          thClass: "text-center",
        },
      ],
    };
  },
  computed: {
    totalrows() {
      return this.usuarios.length;
    },
  },
  async mounted() {
    await this.$http
      .get("list-all")
      .then((response) => (this.usuarios = response.data))
      .catch((erro) => console.log(erro))
      .finally(() => {});
    this.socketService.registerListener(
      "update",
      "update",
      ({ email: string }) => {
        this.$http
          .get("list-all")
          .then((response) => (this.usuarios = response.data));
      }
    );
    this.socketService.registerListener(
      "removed-user",
      "removed-user",
      ({ email: string }) => {
        this.$http
          .get("list-all")
          .then((response) => (this.usuarios = response.data));
      }
    );
    this.socketService.registerListener(
      "new-user",
      "new-user",
      ({ email: string }) => {
        this.$http
          .get("list-all")
          .then((response) => (this.usuarios = response.data));
      }
    );
  },

  components: {
    Menu,
    ArrowLeftIcon,
    ArrowRightIcon,
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
  background-color: #dcdcdc;
  border-radius: 15px;
}
.info {
  color: #110729;
}
.divTable {
  width: 90%;
  margin-left: 4%;
  margin-top: 1%;
  border-radius: 10px;
  background-color: whitesmoke;
}
.input {
  display: flex;
  border-radius: 10px;
  border: 2px solid #110729;
  margin-bottom: 10px;
  margin-top: 10px;
  background: none;
  height: 30px;
  width: 4%;
  outline: none;
}
.listagem {
  margin-top: 10px;
  padding-right: 6px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #110729;
}
.infoTable {
  margin-left: 4%;
  padding-bottom: 10px;
}
.pesquisa {
  width: 20%;
  margin-left: 57%;
}
@media screen and (max-width: 800px) {
  .input {
    width: 100%;
  }
  .pesquisa {
    margin-left: 15%;
  }
}
</style>