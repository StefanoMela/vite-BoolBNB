<script>
import NavbarUi from "./components/ui/NavbarUi.vue";
import { RouterView } from "vue-router";

export default {
  components: { NavbarUi, RouterView },
};
</script>

<template>
  <NavbarUi />
  <div class="container my-4 d-flex flex-column align-items-center">
    <RouterView />
  </div>
</template>

<style></style>
