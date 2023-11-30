<script>
export default {
	data() {
		return {};
	},
};
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="http://localhost:5173/">Navbar</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li>
						<a class="nav-link" href="http://localhost:5173/">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="http://localhost:8000/login">Login</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="http://localhost:8000/register">Register</a>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'search' }">Cerca </RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style lang="scss" scoped></style>
