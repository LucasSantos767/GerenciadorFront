<template>
  <div class="d-flex justify-content-between main">
    <div class="w-25 FormL d-flex align-items-center justify-content-center">
      <b-form>
        <b-form-group class="pb-5">
          <b-input
            type="email"
            class="input"
            placeholder="Email:exemple@gmail.com"
          />
        </b-form-group>
        <b-form-group>
          <b-input
            class="input d-block"
            type="password"
            placeholder="Senha: Exemple123@"
          />
        </b-form-group>
        <div class="btn pt-5">
          <b-button
            ><arrow-right-icon size="1.5x" class="custom-class"
          /></b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import { ArrowRightIcon } from "vue-feather-icons";
import { BForm, BFormGroup } from "bootstrap-vue";
export default {
  components: {
    ArrowRightIcon,
    BForm,
    BFormGroup,
  },
};
</script>
<style>
.title {
  position: absolute;
  color: white;
}
.main {
  height: 100vh;
  width: 100vw;
  background-color: #17202a;
  background-image: url(../../assets/teste.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.FormL {
  border-right: solid 2px #273746;
  background-color: #1c2833cb;
}
.input {
  height: 10%;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border-color: #7b7d7d;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #979a9a;
}
.input::placeholder {
  color: #f0f3f4;
}
</style>