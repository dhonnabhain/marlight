import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faArrowRight,
  faBook,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

// config.autoAddCss = false

library.add(
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faArrowRight,
  faWikipediaW,
  faBook,
  faArrowUpRightFromSquare
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
