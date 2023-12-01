<script>
import HouseCard from "./HouseCard.vue";
import MessageForm from "./MessageForm.vue";
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      house: {},
      extras: {},
    };
  },

  components: { HouseCard, MessageForm },

  methods: {
    fetchDetail(uri = store.api.baseUrl + "houses/") {
      axios.get(uri + this.$route.params.id).then((response) => {
        console.log(response);
        this.house = response.data;
        this.extras = response.data.extras;
      });
    },

    // fetchExtras(uri = store.api.baseUrl + "extras/") {
    //   axios.get(uri + "?house_id=" + this.$route.params.id).then((response) => {
    //     this.extras = response.data;
    //   });
    // },
  },

  created() {
    this.fetchDetail();
  },
};
</script>

<template>
  <div class="container fluid">
    <div class="card border rounded-4 p-4 mt-2">
      <h1 class="my-4">{{ house.title }}</h1>
      <div class="row">
        <div class="col-6">
          <img :src="house.cover_image" alt="" class="img-fluid rounded-4" />
        </div>
      </div>
      <div class="col-4 mt-3 border rounded-4 p-2">
        <MessageForm :houseId="house.id" />
      </div>
    </div>

      <div class="d-flex justify-content-between">
        <div class="">
          <div class="fs-4 my-3 description text-truncate">
            <p class="description">{{ house.description }}</p>
          </div>
          <div class="fs-5">
            <b>Proprietario:</b>
            {{ house.user && house.user.name }}
            {{ house.user && house.user.last_name }}
          </div>
          <div class="fs-5"><b>Indirizzo:</b> {{ house.address }}</div>
        </div>
      </div>

      <div class="row mt-5">
        <h3>Dettaglio appartamento</h3>
        <div class="col-6">
          <div class="fs-5"><b>Numero di stanze:</b> {{ house.rooms }}</div>
          <div class="fs-5"><b>Metri quadri:</b> {{ house.sq_meters }}</div>
          <div class="fs-5"><b>Numero di letti:</b> {{ house.beds }}</div>
          <div class="fs-5"><b>Numero di bagni:</b> {{ house.bathrooms }}</div>
        </div>
      </div>

      <div class="row my-5">
        <h3>Servizi Aggiuntivi</h3>
        <div class="col-6 d-flex mt-3">
          <div
            v-for="extra in extras"
            class="d-flex flex-column align-items-center"
          >
            <div class=""><font-awesome-icon :icon="extra.icon_vue" /></div>
            <div class="col-12 mx-4 text-center">
              <span class="badge" :style="{ backgroundColor: extra.color }">{{
                extra.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>

  <div class="mt-3 border rounded-4 p-4 m-2">
    <form action="#" method="post">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Messaggio</label>
        <textarea
          class="form-control"
          id="message"
          name="message"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Invia</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.description {
  max-width: 100%;
  white-space: pre-line;
}
</style>
