<script>
import HouseFeaturedList from "../components/houses/HouseFeaturedList.vue";

export default {
  components: { HouseFeaturedList },
};
</script>

<template>
  <h1>Case in evidenza</h1>

  <h4>Cerca qui la tua casa dei sogni!</h4>
  <!-- <form class="d-flex my-5" role="search"> -->
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
          <button @click="fetchHouses()" class="btn" type="button">
            Search
          </button>
        </router-link>
      </form>
    </div>
  </div>
  <HouseFeaturedList />
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.search-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-container {
  background-color: white;
  padding: 4px 7px;
  border-radius: 25px;
}

.search-form {
  display: flex;
  flex: 1;
  justify-content: space-between;
}

input {
  border: none;
  outline: none;
  flex: 1;
  margin-right: 10px;
}

.btn {
  background-color: green;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 20px;
}
</style>
