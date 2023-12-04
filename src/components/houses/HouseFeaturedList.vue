<script>
import HouseCard from "./HouseCard.vue";
import axios from "axios";
import { store } from "../../data/store";

export default {
  data() {
    return {
      houses: [],
      extras: [],

      pagination: {
        links: null,
      },
    };
  },

  components: { HouseCard },

  methods: {
    fetchCards(uri = store.api.baseUrl + "houses") {
      axios.get(uri).then((response) => {
        this.houses = response.data.data;
        this.pagination.links = response.data.links;
        console.log(response.data.data);
      });
    },
  },
  created() {
    this.fetchCards();
  },
};
</script>

<template>
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
