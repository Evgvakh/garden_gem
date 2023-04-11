import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import ProgressSpinner from "primevue/progressspinner";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Slider from "primevue/slider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faBars, faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faYoutube, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Image from "primevue/image";

const app = createApp(App);

app.component("Button", Button);
app.component("Carousel", Carousel);
app.component("Tag", Tag);
app.component("ProgressSpinner", ProgressSpinner);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Divider", Divider);
app.component("InputText", InputText);
app.component("Slider", Slider);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("Image", Image);

library.add(
  faCheck,
  faYoutube,
  faTelegram,
  faCopyright,
  faBars,
  faChevronDown,
  faChevronUp,
  faXmark
);

app.use(store).use(router).use(PrimeVue).use(Quasar, {
    plugins: {},
}).mount('#app');
