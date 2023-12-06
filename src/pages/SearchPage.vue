<script>
import { store } from "../data/store";
import axios from "axios";
import HouseCard from "../components/houses/HouseCard.vue";
import SearchBox from "../components/ui/SerchBoxUi.vue";

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
    // Filtri attivi
    activeFilters() {
      const activeFilters = {
        activeExtras: [],
        activeAddress: store.addressSearch.address,
        activeRange: this.searchRange,
        beds: this.beds === "5+" ? "5" : this.beds,
        bathrooms: this.bathrooms === "5+" ? "5" : this.bathrooms,
        rooms: this.rooms === "5+" ? "5" : this.rooms,
      };

      this.extras.forEach((extra) => {
        if (extra.active) activeFilters.activeExtras.push(extra.id);
      });

      return {
        activeFilters,
      };
    },

    bedIconColor() {
      return this.beds ? "#FF385C" : "";
    },
    bathIconColor() {
      return this.bathrooms ? "#FF385C" : "";
    },
    roomIconColor() {
      return this.rooms ? "#FF385C" : "";
    },
  },

  components: { HouseCard, SearchBox },

  methods: {
    // Chiamata per appartamenti filtrati
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
          console.log(response);
          console.log(response.data.links);
        });
    },

    // Chiamata extras
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

    // Attivazione extra e chiamata della casa filtrata
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
  <!-- Filtri  -->
  <div class="container-fluid filter-container">
    <div class="icons-container">
      <!-- Filtri service extra -->
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
      <!-- Filtro bagni -->
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-bath"
          size="2xl"
          :style="{ color: bathIconColor }"
        />
        <label :style="{ color: bathIconColor }" for="bathrooms">Bagni</label>
        <select v-model="bathrooms" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <!-- Filtro camere -->
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-couch"
          size="2xl"
          :style="{ color: roomIconColor }"
        />
        <label :style="{ color: roomIconColor }" for="rooms">Stanze</label>
        <select v-model="rooms" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
      </div>
      <!-- Filtro letti -->
      <div class="icons-wrapper">
        <font-awesome-icon
          class="icons mx-4"
          icon="fa-solid fa-bed"
          size="2xl"
          :style="{ color: bedIconColor }"
        />
        <label :style="{ color: bedIconColor }" for="beds">Letti</label>
        <select v-model="beds" @change="fetchHouses()">
          <option value=""></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5+">5+</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Titolo -->
  <h4>Cerca qui la tua casa dei sogni!</h4>

  <!-- SearchBox -->
  <!-- <SearchBox /> -->

  <!-- Raggio -->
  <div>
    <label for="radius" class="form-label">Radius</label>
    <input
      type="range"
      class="form-range w-50 px-2"
      id="radius"
      min="20"
      max="100"
      step="5"
      v-model="searchRange"
      @click.left="fetchHouses()"
    />
    <span> {{ this.searchRange ? this.searchRange : 20 }} KM</span>
  </div>
  <!-- Bottone Cerca -->
  <!-- <button @click="fetchHouses()" class="btn btn-outline-success" type="submit">
    Search
  </button> -->

  <!-- Risultati -->
  <h4>Risultati ricerca:</h4>

  <!-- Griglia card appartamenti -->
  <div class="row row-cols-3 g-4">
    <HouseCard v-for="house in filteredHouses" :house="house" />
  </div>

  <!-- Paginazione -->
  <nav
    v-if="pagination.links && pagination.links.length > 3"
    class="my-4"
    aria-label="Page navigation example"
  >
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
.search-container {
  display: flex;
  align-items: center;

  .search-box {
    width: calc(100% / 3);
  }
}
</style>
