<script>
import SearchBox from "./SerchBoxUi.vue";

export default {
  data() {
    return {};
  },
  components: { SearchBox },
};
</script>

<template>
  <nav class="navbar bg-light py-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="http://localhost:5173/">Navbar</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <SearchBox />
        </li>
      </ul>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Sposta il dropdown sotto al bottone del toggle -->
        <ul class="navbar-nav text-end">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Utente
            </a>
            <div
              class="dropdown-menu text-end"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item" href="http://localhost:8000/login"
                >Login</a
              >
              <a class="dropdown-item" href="http://localhost:8000/register"
                >Register</a
              >
              <!-- <a class="dropdown-item" href="http://localhost:5173/search"
                >Filtra Case</a
              > -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
