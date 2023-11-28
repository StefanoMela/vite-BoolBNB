<script>
import NavbarUi from "./components/ui/NavbarUi.vue";
import { RouterView } from "vue-router";

export default {

	components: { NavbarUi, RouterView },
};
</script>

<template>
	<NavbarUi />
	<router-view></router-view>
</template>

<style></style>
