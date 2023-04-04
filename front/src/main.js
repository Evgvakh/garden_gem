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



const app = createApp(App);

app.component("Button", Button);
app.component("Carousel", Carousel);
app.component("Tag", Tag);
app.component("ProgressSpinner", ProgressSpinner);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Divider", Divider);
app.component("InputText", InputText);

app.use(store).use(router).use(PrimeVue).use(Quasar, {
    plugins: {},
}).mount('#app');
