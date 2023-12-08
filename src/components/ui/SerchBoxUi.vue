<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {
      title: "SearchBox",
      searchAddress: "",
      filteredHouses: [],

      store,
    };
  },

  // components: {
  //   MyComponent,
  // },
  methods: {
    createSearchBox() {
      // Inserisco le opzioni del construttore di SearchBox
      var options = {
        // Opzioni di ricerca
        searchOptions: {
          key: "5uNY3BSE9gSMXl2atJSMJJrZAbfvhazZ",
          language: "it-IT",
          limit: 5,
        },
        // Autocomplete
        autocompleteOptions: {
          key: "5uNY3BSE9gSMXl2atJSMJJrZAbfvhazZ",
          language: "it-IT",
        },
        // placeholder
        placeholder: "Cerca: Via Roma...",
      };
      // Prendo un elemento
      let addressElement = document.getElementById("address-element");
      // Elemento SearchBox
      let ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
      // SearchBox in HTML
      let searchBoxHTML = ttSearchBox.getSearchBoxHTML();
      // inserisco il searchBox HTML dentro l'elemento selezionato
      addressElement.append(searchBoxHTML);

      // Chiamo l'evento tomtom.searchbox.resultselected
      ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
        console.log(data);
        // Inserisco il valore dell'indirizzo dall'oggetto data in una variabile
        let addressVal = data.data.result.address.freeformAddress;
        let longitudeVal = data.data.result.position.lng;
        let latitude = data.data.result.position.lat;

        // Inserisco il valore dell'indirizzo dentro il valore dell'input nascosto
        store.addressSearch.address = addressVal;
        store.addressSearch.latitude = longitudeVal;
        store.addressSearch.longitude = latitude;
        console.log(store.addressSearch.address);
      });
    },
  },

  mounted() {
    this.createSearchBox();
  },
};
</script>

<template>
  <!-- SearchBox -->
  <div class="search-container d-flex align-items-center">
    <div id="address-element" class="search-box"></div>

    <RouterLink class="nav-link btn-cerca" :to="{ name: 'search' }"
      >Cerca
    </RouterLink>
    <!-- <button class="btn btn-success" type="submit">
      <a href="http://localhost:5173/search">ciao</a>
    </button> -->
  </div>

  <!-- <form class="d-flex search-container">
    <div id="address-element" class="search-box d-flex search-container"></div>

    <button class="btn btn-success" type="submit">Search</button>
  </form> -->
</template>

<style lang="scss" scoped>
.search-container {
  margin-left: auto;
  margin-right: 15px; /* Aggiusta il margine a tuo piacimento */
  border-radius: 10px; /* Aggiusta il raggio del bordo a tuo piacimento */
}

/* Personalizza lo stile del box di ricerca */
.search-box {
  width: 300px; /* Aggiusta la larghezza a tuo piacimento */
  border-radius: 15px; /* Aggiusta il raggio del bordo a tuo piacimento */
  color: #f8f9fa;
}

/* Personalizza lo stile del bottone "Search" */
.btn-cerca {
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  background-color: rgb(198, 103, 210);
  padding: 8px 15px;
  border-radius: 20px;
}
</style>
