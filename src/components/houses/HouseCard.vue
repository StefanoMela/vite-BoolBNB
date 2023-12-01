<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {};
  },
  props: { house: Object },
  components: { RouterLink },
};
</script>

<template>
  <div class="col">
    <div class="card h-100">
      <img :src="house.cover_image" class="card-img-top" alt="..." />
      <div class="card-body">
        <h4 class="card-title">{{ house.title }}</h4>
        <p class="card-text">{{ house.description }}</p>
        <p class="card-text">{{ house.user_id }}</p>
        <RouterLink
          :to="{ name: 'house-detail', params: { id: house.id } }"
          class="btn btn-primary"
          >Vedi il dettaglio
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
