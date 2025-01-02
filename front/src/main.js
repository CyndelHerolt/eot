import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'

import Button from "primevue/button"
import InputText from "primevue/inputtext"
import {InputNumber} from "primevue";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import ColumnGroup from "primevue/columngroup"
import Dialog from "primevue/dialog"
import {SelectButton} from "primevue";
import {Dock} from "primevue";
import {Menubar} from "primevue";
import {ProgressBar} from "primevue";

const components = [
    Button,
    InputText,
    InputNumber,
    DataTable,
    Column,
    ColumnGroup,
    Dialog,
    SelectButton,
    Dock,
    Menubar,
    ProgressBar
]

const pinia = createPinia();
const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

app.use(router)

app.use(pinia);
app.mount('#app')
