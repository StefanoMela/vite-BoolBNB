<script>
import { store } from "../data/store";
import axios from "axios";
import HouseCard from "../components/houses/HouseCard.vue";

export default {
  data() {
    return {
      houses: [],

      pagination: {
        links: null,
      },
      store,
      searchField: "",
    };
  },

  components: { HouseCard },

  methods: {
    fetchCards(uri = store.api.baseUrl + "search") {
      axios.get(uri).then((response) => {
        console.log(response);
        this.houses = response.data;
        this.pagination.links = response.data.links;
      });
    },

    postSearch() {
      if (!this.searchField) return;
      const data = this.searchField;
      axios.post(store.api.baseUrl + "search", data).then((response) => {
        console.log(response);
      });
    },
  },

  created() {
    this.fetchCards();
  },
};
</script>

<template>
  <h4>Cerca qui la tua casa dei sogni!</h4>
  <form class="d-flex my-5" role="search">
    <input
      class="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      v-model="searchField"
    />
    <button @click="postSearch()" class="btn btn-outline-success" type="submit">
      Search
    </button>
  </form>
  <h4>Risultati ricerca:</h4>
  <div class="row row-cols-3 g-4">
    <HouseCard v-for="house in houses" :house="house" />
  </div>
  <nav class="my-4" aria-label="Page navigation example">
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
</template>

<style lang="scss" scoped>
h4 {
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
