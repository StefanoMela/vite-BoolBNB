import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: "http://localhost:8000/api/",
  },
  addressSearch: {
    longitude: "",
    latitude: "",
    address: '',
  },
});

export function createSearchBox() {
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
    placeholder: "Es. Via Roma...",
  };
  // Elemento SearchBox
  var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
  // SearchBox in HTML
  var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
  // Prendo un elemento
  let addressElement = document.getElementById("address-element");
  // inserisco il searchBox HTML dentro l'elemento selezionato
  addressElement.append(searchBoxHTML);

  // Chiamo l'evento tomtom.searchbox.resultselected
  ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
    console.log(data);
    // console.log(this);

    store.addressSearch.latitude = data.data.result.position.lat;
    store.addressSearch.longitude = data.data.result.position.lng;

    console.log(store.addressSearch.longitude);
    console.log(store.addressSearch.latitude);

    // // Inserisco il valore dell'indirizzo dentro il valore dell'input nascosto
    // address.value = addressVal;
  });
}
