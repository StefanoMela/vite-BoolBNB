<script>
import { store } from "../data/store";
import axios from "axios";
import HouseCard from "../components/houses/HouseCard.vue";

export default {
  data() {
    return {
      extras: [],

      // Filters
      searchAddress: "",
      searchRange: 20,
      beds: "",
      baths: "",
      rooms: "",

      // Filtered Results
      filteredHouses: [],

      pagination: { links: null },

      store,
    };
  },

  computed: {
    activeFilters() {
      const activeFilters = {
        activeExtras: [],
        activeAddress: this.searchAddress,
        activeRange: this.searchRange,
        // beds: this.,
        // baths: this.,
        // rooms: this.,
      };
      activeFilters.activeAddress = this.searchAddress;

      this.extras.forEach((extra) => {
        if (extra.active) activeFilters.activeExtras.push(extra.id);
      });

      return {
        activeFilters,
      };
    },
  },

  components: { HouseCard },

  methods: {
    fetchHouses(uri = store.api.baseUrl + "get-houses-by-filters") {
      console.log(this.activeFilters);
      axios
        .post(uri, this.activeFilters, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.filteredHouses = response.data.data;
          this.pagination.links = response.data.links;
        });
    },

    fetchExtras() {
      axios.get(store.api.baseUrl + "extras").then((response) => {
        this.extras = response.data.map((extra) => {
          return {
            ...extra,
            active: false,
          };
        });
      });
    },

    toggleExtra(extra) {
      extra.active = !extra.active;
      this.fetchHouses();
    },
  },

  created() {
    this.fetchHouses();
    this.fetchExtras();
  },
};
</script>

<template>
  <div class="container-fluid filter-container">
    <div class="icons-container">
      <div
        v-for="(extra, index) in extras"
        class="icons-wrapper"
        :style="{ color: extra.active ? '#FF385C' : '' }"
      >
        <font-awesome-icon
          class="icons"
          :icon="extra.icon_vue"
          :id="index"
          :class="{ disabled: !extra.active }"
          :style="{ color: extra.active ? '#FF385C' : '' }"
          @click="toggleExtra(extra)"
          type="checkbox"
        />
        {{ extra.name }}
      </div>
    </div>
  </div>
  <h4>Cerca qui la tua casa dei sogni!</h4>
  <div class="search-container">
    <div class="address-container">
      <label for="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        class="mt-2"
        v-model="searchAddress"
      />
    </div>
    <div class="radius-container my-4">
      <label for="radius" class="form-label">Radius</label>
      <input
        type="range"
        class="form-range px-2"
        id="radius"
        min="20"
        max="100"
        step="5"
        v-model="searchRange"
        @click.left="fetchHouses()"
      />
      <span> {{ this.searchRange ? this.searchRange : 20 }} KM</span>
    </div>
    <button
      @click="fetchHouses()"
      class="btn btn-outline-success"
      type="submit"
    >
      Search
    </button>
  </div>
  <h4>Risultati ricerca:</h4>
  <div class="row row-cols-3 g-4">
    <HouseCard v-for="house in filteredHouses" :house="house" />
  </div>
  <nav class="my-4" aria-label="Page navigation example">
    <ul class="pagination">
      <li
        v-for="link in this.pagination.links"
        :key="link.label"
        @click="fetchHouses(link.url)"
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


.icons-container{

  display: flex;

  .icons-wrapper {
  text-align: center;
  text-transform: capitalize;
  margin-inline: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icons {
    font-size: 1.5rem;
    margin-inline: 2.5rem;

    cursor: pointer;
  }
}
}

.filter-container {
  top: 100;
  left: 0;
  padding: 1rem;
}
</style>
