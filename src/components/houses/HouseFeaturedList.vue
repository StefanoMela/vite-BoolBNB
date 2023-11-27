<script>
import HouseCard from "./HouseCard.vue";
import axios from "axios";
import { store } from "../../data/store";

export default {
	data() {
		return {
			houses: [],
		};
	},

	components: { HouseCard },

	methods: {
		fetchCards(uri = store.api.baseUrl + "houses") {
			axios.get(uri).then((response) => {
				console.log(response);
				this.houses = response.data;
			});
		},
		created() {
			this.fetchCards();
		},
	},
};
</script>

<template>
	<HouseCard v-for="house in houses" :house="house" />
</template>

<style lang="scss" scoped></style>
