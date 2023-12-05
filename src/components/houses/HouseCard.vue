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
      class="card border-0 h-100 position-relative"
      @mouseover="showDetails = true"
      @mouseleave="showDetails = false"
    >
      <router-link
        :to="{ name: 'house-detail', params: { id: house.id } }"
        class="to-detail"
      >
        <img
          :src="house.cover_image"
          class="card-img-top rounded-4"
          alt="..."
        />
        <h4 class="card-title">{{ house.title }}</h4>
        <div class="filters d-lg-flex">
          <ul class="d-flex fs-5">
            <li class="mx-2 extras">
              <div>
                <font-awesome-icon icon="fa-solid fa-bed" />
              </div>
              <div>
                {{ house.beds }}
              </div>
            </li>
            <li class="mx-2 extras">
              <font-awesome-icon icon="fa-solid fa-couch" /> {{ house.rooms }}
            </li>
            <li class="mx-2 extras">
              <font-awesome-icon :icon="['fas', 'bath']" />
              {{ house.bathrooms }}
            </li>
          </ul>

          <ul
            class="d-flex flex-wrap extra-list justify-content-end align-items-start"
          >
            <li
              class="mx-1 badge my-2 extras"
              v-for="extra in house.extras"
              :style="{ backgroundColor: extra.color }"
            >
              <font-awesome-icon :icon="extra.icon_vue" />
            </li>
            <!-- <li
              class="mx-1 badge"
              v-for="extra in house.extras"
              :style="{ color: extra.color }"
            >
              <font-awesome-icon :icon="extra.icon_vue" />
            </li> -->
          </ul>
        </div>
        <div class="card-overlay" v-show="showDetails">
          <transition name="fade">
            <p class="card-text">{{ house.description }}</p>
          </transition>
          <!-- codice per aggiungere bottone -->
          <!-- <transition name="slide-fade">
            <router-link
              :to="{ name: 'house-detail', params: { id: house.id } }"
              class="btn"
            >
              Vedi il dettaglio
            </router-link>
          </transition> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.to-detail {
  color: black;
  text-decoration: none;
}

.btn {
  background-color: #ff385c;
  color: white;
}

.extras {
  width: 20%;
}

.extra-list {
  width: 50%;
}

.filters {
  display: none;
  justify-content: space-between;
}
.card-overlay {
  max-height: 100%;
  position: absolute;
  top: 35%;
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
  opacity: 1;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
