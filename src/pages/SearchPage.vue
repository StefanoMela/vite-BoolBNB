<script>
import { store, createSearchBox } from "../data/store";
import axios from "axios";
import HouseCard from "../components/houses/HouseCard.vue";

export default {
  data() {
    return {
      extras: [],
      filteredHouses: [],

      pagination: {
        links: null,
      },
      store,
    };
  },

  computed: {
    activeFilters() {
      const activeExtras = [];
      const activeAddress = store.addressSearch.address;

      this.extras.forEach((extra) => {
        if (extra.active) activeExtras.push(extra.id);
      });

      return {
        activeExtras,
      };
    },
  },

  components: { HouseCard },

  methods: {
    fetchHouses(uri = store.api.baseUrl + "get-houses-by-filters") {
      axios
        .post(uri, this.activeFilters, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
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

  mounted() {
    createSearchBox();
  },
};
</script>

<template>
  <h4>Cerca qui la tua casa dei sogni!</h4>
  <form class="d-flex my-5" role="search">
    <input
      class="form-control me-2"
      type="hidden"
      placeholder="Search"
      aria-label="Search"
    />
    <div id="address-element"></div>
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
  <div class="d-flex flex-row gap-3 justify-content-center">
    <div
      v-for="(extra, index) in extras"
      class="text-center mx-3 text-capitalize fw-bold d-flex flex-column align-items-center"
    >
      {{ extra.name }}
      <input
        :id="index"
        :class="{ disabled: !extra.active }"
        @click="toggleExtra(extra)"
        type="checkbox"
      />
      <!-- will be hidden -->
      <label :style="{ backgroundColor: extra.color }" :for="index"></label>
      <!-- toggle, will activate checkbox -->
      <div class="plate"></div>
      <!-- animating background -->
    </div>
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

input[type="checkbox"] {
  display: none;

  /* toggle in the OFF state */
  ~ label {
    position: relative;
    display: block;
    width: 72px;
    height: 32.5px;
    border-radius: 40px;
    border: 4px solid #999;
    // transition: transform 200ms cubic-bezier(0.41, -0.01, 0.63, 1.09);
    cursor: pointer;
    background: rgba(black, 0.3);
    margin-top: 1rem;

    &::before,
    &::after {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      border-radius: 36px;
      content: "";
      // transition: all 220ms cubic-bezier(0.76, 0.01, 0.15, 0.97);
    }

    &::after {
      background-color: #999;
    }
  }

  /* toggle in the ON state */
  &:checked ~ label {
    border: 4px solid #fff;
    border-color: #afa;
    background: rgba(green, 0.6);

    &::before {
      width: 60px;
    }

    &::after {
      transform: translateX(40px);
      background-color: #4c4;
      box-shadow: -4px 0 4px rgba(black, 0.1);
    }
  }

  /* This is the part that activates the background when the checkbox is checked */
  &:checked ~ div {
    // background: yellow;
    opacity: 1;
    visibility: visible;
    transition: opacity 240ms, visibility 0s;
    animation: rot 10s linear infinite;
  }
}
</style>
