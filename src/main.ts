import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Antd from "ant-design-vue"
import FORM from "@/components/form/form.vue"
import CITY from "@/components/city/city.vue"
import "ant-design-vue/dist/reset.css"
const app = createApp(App)
app.use(Antd)
app.component("FORM", FORM)
app.component("CITY", CITY)
app.use(store)
app.use(router)
app.mount("#app")
