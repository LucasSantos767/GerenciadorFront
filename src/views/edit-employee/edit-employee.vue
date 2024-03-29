<template>
  <div class="main">
    <Menu />
    <div class="divtable">
      <div
        class="
          d-flex
          align-items-center
          justify-content-start
          mb-1 mb-md-0
          infoTable
        "
      >
        <p class="listagem">
          <users-icon size="1.5x" class="icon-users" /> Lista de Usuários
        </p>
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          :clearable="false"
          class="per-page-selector d-inline-block mx-50 input inputselect"
        />
        <b-form-input
          v-model="search"
          class="pesquisa h-75 input shadow-none"
          placeholder="Pesquisar"
        />
      </div>
      <b-table
        show-empty
        outlined
        striped
        borderless
        bordered
        responsive
        hover
        class="tabela"
        :per-page="perPage"
        :current-page="currentPage"
        :items="usuarios"
        :fields="fields"
        :filter="search"
        empty-text="Nenhum dado encontrado."
        empty-filtered-text="Nenhum dado encontrado."
      >
        <template v-slot:cell(actions)="data">
          <b-dropdown variant="link" no-caret class="iconp">
            <template #button-content>
              <more-vertical-icon size="1x" class="morei" />
            </template>
            <b-dropdown-item @click.prevent="ModalEdit(data.item)">
              <edit-icon icon="EditIcon" size="1x" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>

            <b-dropdown-item @click.prevent="ModalConfirm(data.item)">
              <trash-2-icon icon="TrashIcon" size="1x" />
              <span class="align-middle ml-50">Deletar</span>
            </b-dropdown-item>
          </b-dropdown>
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
          <arrow-left-icon size="1x" />
        </template>
        <template #next-text>
          <arrow-right-icon size="1x" />
        </template>
      </b-pagination>
      <b-modal
        id="modal-login"
        centered
        hide-footer
        hide-header-close
        header-text-variant="light"
        header-bg-variant="dark"
        title="Editar Funcionário"
      >
        <b-form>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Nome</p>
            <b-input
              type="text"
              class="inputEdit shadow-none"
              v-model="conteudotable.name"
            />
          </b-form-group>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Email</p>
            <b-input
              type="email"
              id="email"
              class="inputEdit shadow-none"
              v-model="conteudotable.email"
            />
          </b-form-group>
          <b-form-group class="pb-3 InputPosition">
            <p class="sub">Senha</p>
            <b-input
              type="password"
              class="inputEdit shadow-none"
              v-model="conteudotable.password"
            />
          </b-form-group>
          <b-form-group class="InputPosition">
            <p class="sub-title2">Cargo</p>
            <b-form-select
              class="inputEdit shadow-none"
              type="selected"
              v-model="conteudotable.role"
              :options="options"
            />
          </b-form-group>
          <div class="d-flex justify-content-between btn-size">
            <b-button @click.prevent="Editar()" variant="outline-success">
              Atualizar
            </b-button>
            <b-button @click.prevent="hideModal()" variant="outline-danger">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal
        id="modal-danger"
        centered
        hide-footer
        hide-header-close
        header-bg-variant="dark"
        header-text-variant="light"
        title="Deletar Funcionário"
        ref="modal-fechar"
      >
        <b-card-text> Deseja excluir este usuário? </b-card-text>
        <div class="d-flex justify-content-between btn-size">
          <b-button @click.prevent="Deletar()" variant="outline-danger">
            Excluir
          </b-button>
          <b-button @click.prevent="hideModal()" variant="outline-dark">
            Cancelar
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/menu.vue";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MoreVerticalIcon,
  EditIcon,
  Trash2Icon,
} from "vue-feather-icons";
import { SocketModule } from "@/services/socket";
import { UsersIcon } from "vue-feather-icons";
export default {
  data() {
    return {
      usuarios: [],
      socketService: SocketModule.connect(),
      perPage: 5,
      currentPage: 1,
      pageOptions: [3, 5, 10],
      search: null,
      conteudotable: {},
      options: [
        { value: "user", text: "Usuário" },
        { value: "admin", text: "Admin" },
      ],
      fields: [
        {
          key: "_id",
          label: "ID",
          Class: "text-center",
        },
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
        {
          key: "actions",
          label: "AÇÕES",
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
  created() {
    this.Lista();
  },
  async updated() {
    this.socketService.registerListener("update", "update", (data) => {
      this.usuarios = [];
      this.Lista();
    });
    this.socketService.registerListener(
      "removed-user",
      "removed-user",
      (data) => {
        this.usuarios = [];
        this.Lista();
      }
    );
    this.socketService.registerListener("new-user", "new-user", (data) => {
      this.usuarios = [];
      this.Lista();
    });
  },
  methods: {
    async Lista() {
     this.$http
        .get("list-all")
        .then((response) => (this.usuarios = response.data))
        .catch((erro) => {
          if (erro.request.status == 401) {
            this.$store.commit("DESLOGAR_USUARIO");
            this.$toast(`token expirado.`, {
              type: "info",
            });
          }
        })
        .finally(() => {});
    },
    Editar() {
      this.$http
        .patch(`update/${this.conteudotable._id}`, this.conteudotable)
        .then((response) => {
          this.$bvModal.hide("modal-login");
          this.usuarios = [];
          this.Lista();
          this.$toast(`Usuário atualizado com sucesso.`, {
            type: "success",
          });
        })
        .catch((erro) => {
          if (erro.request.status == 500) {
            this.$toast(`falta dados na requisição.`, {
              type: "info",
            });
          }
        });
    },
    Deletar() {
      this.$http
        .delete(`delete/${this.conteudotable._id}`)
        .then((response) => {
          this.$toast(`Usuário deletado com sucesso.`, {
            type: "success",
          });
          this.$bvModal.hide("modal-danger");
          this.usuarios = [];
          this.Lista();
        })
        .catch((erro) => console.log(erro));
    },
    hideModal() {
      this.$bvModal.hide("modal-login");
      this.$bvModal.hide("modal-danger");
    },
    ModalEdit(usuarios) {
      this.conteudotable = {
        ...usuarios,
        password: undefined,
      };
      this.$bvModal.show("modal-login");
    },
    ModalConfirm(usuarios) {
      this.conteudotable = {
        ...usuarios,
      };
      this.$bvModal.show("modal-danger");
    },
  },
  components: {
    Menu,
    ArrowLeftIcon,
    ArrowRightIcon,
    MoreVerticalIcon,
    EditIcon,
    Trash2Icon,
    UsersIcon,
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #110729;
}
.morei {
  color: #110729;
}
.tabela {
  background-color: #dcdcdc;
  border-radius: 15px;
}
.divtable {
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
.InputPosition {
  position: relative;
}
.sub {
  width: 44px;
  height: 12px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -13%;
  background-color: white;
  position: absolute;
}
.sub-title2 {
  width: 44px;
  height: 12px;
  color: #110729;
  font-size: 14px;
  left: 7%;
  top: -18%;
  background-color: white;
  position: absolute;
}
.inputEdit {
  display: flex;
  border-radius: 10px;
  border: 2px solid #110729;
  margin-bottom: 20px;
  background: none;
  height: 35px;
  width: 100%;
  font-size: 12px;
  outline: none;
}
.inputEdit:focus {
  font-size: 12px;
  color: black;
  background-color: whitesmoke;
  border: solid 2px #07cbf5;
}
.custom-class {
  width: 20%;
  background-color: #110729;
}
.custom-class:hover {
  background-color: #07cbf5;
}
.iconp {
  margin-top: -15px;
  margin-bottom: -15px;
}
.inputselect {
  height: 27px;
  margin-left: 0.5%;
  margin-top: 0.5%;
}
.icon-users {
  margin-right: 5px;
}
.btn-size {
  margin-left: 26%;
  width: 50%;
}
@media screen and (max-width: 800px) {
  .input {
    width: 100%;
  }
  .inputselect {
    width: 30%;
  }
  .pesquisa {
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>