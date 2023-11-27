<script>
export default {
	data() {
		return {};
	},

	props: { house: Object },
};
</script>

<template>
	<div class="col">
		<div class="card h-100">
			<img :src="house.cover_image" class="img-fluid" alt="..." />
			<div class="card-body">
				<h4 class="card-title">{{ house.title }}</h4>
				<p class="card-text">{{ house.description }}</p>
				<p class="card-text">{{ house.user_id }}</p>
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
