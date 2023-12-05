<script>
import HouseFeaturedList from "../components/houses/HouseFeaturedList.vue";

export default {
  components: { HouseFeaturedList },
};
</script>

<template>
  <h1>Cerca qui la tua casa dei sogni!</h1>
  <h3>Case in evidenza</h3>
 
  <div class="search-bar">
    <div class="search-container border">
      <form role="search">
        <input
          type="text"
          name="address"
          id="address"
          class="mt-2"
          v-model="searchAddress"
          placeholder="Enter an address..."
        />

        <router-link :to="{ name: 'search' }">
          <button @click="fetchHouses()" class="btn btn-success" type="button">
            Search
          </button>
        </router-link>
      </form>
    </div>
  </div>
  <HouseFeaturedList />
</template>

<style lang="scss" scoped>

h3{
  margin: 1.5rem 0;
}

.search-bar {
  align-items: center;
}
.search-container {
  background-color: white;
  padding: 4px 7px;
  border-radius: 25px;
}

input {
  border: none;
  outline: none;
  flex: 1;
  margin-right: 10px;
}

.btn {
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 20px;
}
</style>
