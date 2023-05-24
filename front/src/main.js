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
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faBars, faChevronDown, faChevronUp, faXmark, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCopyright, faGem } from '@fortawesome/free-regular-svg-icons';
import { faYoutube, faTelegram } from "@fortawesome/free-brands-svg-icons";
import Image from "primevue/image";
import "primeicons/primeicons.css";

import Editor from "primevue/editor";

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
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmationService", ConfirmationService);
app.component("Toast", Toast);
app.component("ConfirmPopup", ConfirmPopup);

app.component("Editor", Editor);

library.add(
  faCheck,
  faYoutube,
  faTelegram,
  faCopyright,
  faBars,
  faChevronDown,
  faChevronUp,
  faXmark,
  faCaretRight,
  faGem
);

app
  .use(store)
  .use(router)
  .use(ConfirmationService)
  .use(PrimeVue)
  .use(ToastService)  
  .use(Quasar, {
    plugins: {},
  })
  .mount("#app");
