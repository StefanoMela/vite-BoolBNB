<script>
import NavbarUi from "./components/ui/NavbarUi.vue";
import { RouterView } from "vue-router";

export default {
	components: { NavbarUi, routerView },
};
</script>

<template>
	<NavbarUi />
	<div class="container">
		<router-view></router-view>
	</div>
</template>

<style></style>
