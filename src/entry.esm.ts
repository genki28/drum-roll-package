import { App, Plugin } from "vue";

import * as component from "@/lib/index";

const install: Exclude<Plugin["install"], undefined> =
  function installDrumRollPackage(app: App) {
    Object.entries(component).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  };

export default install;

export * from "@/lib/index";
