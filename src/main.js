import App from "./App.vue";
import "./assets/scss/style.scss";

// IMPORT ROUTER
import { router } from "./router";

// IMPORT BOOTSTRAP
import * as bootstrap from "bootstrap";

// IMPORT FONTAWSOME
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { createApp } from "vue";

library.add(faUserSecret, faKitchenSet, faWifi, faSeedling, faSquareParking, faTv, faPersonSwimming, faWind, faWater);

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
