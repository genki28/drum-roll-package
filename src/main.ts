import { createApp } from "vue";
import App from "./App.vue";
import { scrollDirective } from "./lib/directive/scroll";

const app = createApp(App);
app.directive("drum-scroll", {
  created: scrollDirective, // TODO: createdでOK???
});
app.mount("#app");
