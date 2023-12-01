<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      showDetails: false,
      extras: [],
    };
  },
  props: { house: Object },
  components: { RouterLink },
};
</script>

<template>
  <div class="col">
    <div
      class="card h-100 position-relative"
      @mouseover="showDetails = true"
      @mouseleave="showDetails = false"
    >
      <img :src="house.cover_image" class="card-img-top" alt="..." />
      <h4 class="card-title">{{ house.title }}</h4>
      <ul class="d-flex">
        <li class="mx-2">
          <font-awesome-icon icon="fa-solid fa-bed" />:{{ house.beds }}
        </li>
        <li class="mx-2">
          <font-awesome-icon icon="fa-solid fa-couch" />:{{ house.rooms }}
        </li>
        <li class="mx-2">
          <font-awesome-icon :icon="['fas', 'toilet']" />:{{ house.bathrooms }}
        </li>
      </ul>

      <ul class="d-flex">
        <li v-for="extra in extras">
          <font-awesome-icon :icon="extra.icon_vue" />
        </li>
      </ul>
      <div class="card-overlay" v-show="showDetails">
        <transition name="fade">
          <p class="card-text">{{ house.description }}</p>
        </transition>
        <transition name="slide-fade">
          <router-link
            :to="{ name: 'house-detail', params: { id: house.id } }"
            class="btn btn-success"
          >
            Vedi il dettaglio
          </router-link>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
.card-overlay {
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  opacity: 0;
  width: 100%;
}

.card-overlay h4 {
  margin-bottom: 10px;
}

.card-overlay p {
  margin-bottom: 15px;
}

.card-overlay:hover {
  opacity: 0.7;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
