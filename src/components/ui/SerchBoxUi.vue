<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {
      title: "SearchBox",
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

        // Inserisco il valore dell'indirizzo dentro il valore dell'input nascosto
        store.addressSearch.address = addressVal;
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
  <div class="search-container">
    <label for="address">Address</label>
    <div id="address-element" class="search-box"></div>
  </div>
</template>

<style lang="scss" scoped></style>
