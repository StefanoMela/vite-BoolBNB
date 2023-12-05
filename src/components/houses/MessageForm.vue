<script>
import { RouterLink } from "vue-router";
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      store,
      banner: false,
      formErrors: {},

      formField: {
        house_id: "",
        email: "",
        name: "",
        text: "",
      },

      messageSent: false,
      success: false,
      loading: false,
      error: {
        message: "",
        state: false,
      },
    };
  },
  props: { houseId: Number },

  methods: {
    sendMessage() {
      //   if (!this.formField.email || !this.formField.name || !this.formField.text)
      //     return;

      this.messageSent = true;
      this.loading = true;
      this.success = false;
      this.error.status = false;

      const data = {
        house_id: this.houseId,
        email: this.formField.email,
        name: this.formField.name,
        text: this.formField.text,
      };

      console.log(data);

      axios
        .post("http://localhost:8000/api/message", {
          params: data,
        })
        .then((response) => {
          console.log(response);
          if (response.data.errors) {
            this.banner = true;
            this.formErrors = response.data.errors;
            console.log(this.formErrors);
          } else {
            this.success = true;
            this.banner = false;
          }
        })
        .catch((error) => {
          this.error.state = true;
          this.error.message = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <!-- {{ console.log(houseId) }} -->
  <div v-if="messageSent && success" class="alert alert-success">
    Messaggio inviato !
  </div>

  <div v-if="messageSent && loading" class="alert alert-warning">
    Invio in corso
  </div>

  <div v-if="messageSent && error.status" class="alert alert-danger">
    {{ error.message }}
  </div>

  <form @submit.prevent="submitForm">
    <div>
      <div v-if="banner" class="alert alert-danger" role="alert">
        <ul>
          <li v-for="error in formErrors">{{ error[0] }}</li>
        </ul>
      </div>

      <div class="row row-cols-4 flex-column">
        <div class="w-50">
          <label for="formfield-email" class="form-label">E-mail</label>
          <input
            v-model="formField.email"
            type="email"
            class="form-control"
            id="formfield-email"
            placeholder="E-mail"
          />
        </div>
        <div class="my-3 w-50">
          <label for="formfield-name" class="form-label">Nome</label>
          <input
            v-model="formField.name"
            type="text"
            class="form-control"
            id="formfield-name"
            placeholder="Nome"
          />
        </div>
        <div class="w-50">
          <label for="formfield-message" class="form-label">Messaggio</label>
          <textarea
            v-model="formField.text"
            class="form-control"
            id="formfield-message"
            rows="3"
          ></textarea>
        </div>
      </div>

      <button class="btn btn-success" @click="sendMessage()">
        Invia Messaggio
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
