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
      rooms: "",
      beds: "",
      bathrooms: "",

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
        beds: this.beds === "5+" ? "5" : this.beds,
        bathrooms: this.bathrooms === "5+" ? "5" : this.bathrooms,
        rooms: this.rooms === "5+" ? "5" : this.rooms,
      };
      activeFilters.activeAddress = this.searchAddress;

      this.extras.forEach((extra) => {
        if (extra.active) activeFilters.activeExtras.push(extra.id);
      });

      return {
        activeFilters,
      };
    },

    bedIconColor (){
      return this.beds ? "#FF385C" : "";
    },
    bathIconColor (){
      return this.bathrooms ? "#FF385C" : "";
    },
    roomIconColor (){
      return this.rooms ? "#FF385C" : "";
    }
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
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-bath"
          size="2xl"
          :style="{color: bathIconColor}"
        />
        <label :style="{color: bathIconColor}" for="bathrooms">Bagni</label>
        <select v-model="bathrooms" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-couch"
          size="2xl"
          :style="{color: roomIconColor}"
        />
        <label :style="{color: roomIconColor}" for="rooms">Stanze</label>
        <select v-model="rooms" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-bed"
          size="2xl"
          :style="{color: bedIconColor}"
        />
        <label :style="{color: bedIconColor}" for="beds">Letti</label>
        <select v-model="beds" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
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
.icons-container {
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

      cursor: pointer;
    }
  }
}
.filter-container {
  top: 100;
  padding: 1rem;
}
</style>
