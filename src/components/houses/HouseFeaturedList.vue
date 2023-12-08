<script>
import HouseCard from "./HouseCard.vue";
import axios from "axios";
import { store } from "../../data/store";
import AppLoader from "../AppLoader.vue";

export default {
  data() {
    return {
      houses: [],
      extras: [],

      pagination: {
        links: null,
      },
      isLoading: false,
    };
  },

  components: { HouseCard, AppLoader },

  methods: {
    fetchCards(uri = store.api.baseUrl + "houses") {
      this.isLoading = true;
      axios
        .get(uri)
        .then((response) => {
          console.log(response);
          this.houses = response.data.data.map((house) => {
            // Limita la lunghezza della descrizione a 100 caratteri
            house.description =
              house.description.length > 100
                ? house.description.substring(0, 100) + "..."
                : house.description;
            return house;
          });

          this.pagination.links = response.data.links;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.fetchCards();
  },
};
</script>

<template>
  <AppLoader v-if="isLoading" />
  <div class="container my-4">
    <div class="row row-cols-3 g-4">
      <HouseCard v-for="house in houses" :house="house" />
    </div>
    <nav
      class="my-4"
      aria-label="Page navigation example"
      v-if="pagination.links && pagination.links.length > 3"
    >
      <ul class="pagination">
        <li
          v-for="link in this.pagination.links"
          @click="fetchCards(link.url)"
          class="page-item"
        >
          <a class="page-link" href="#" v-html="link.label"></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped></style>
