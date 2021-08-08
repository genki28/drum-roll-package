import plugin, * as component from "@/entry.esm";

type NamedExports = Exclude<typeof component, "default">;
type ExtendedPlugin = typeof plugin & NamedExports;
Object.entries(component).forEach(([componentName, component]) => {
  if (componentName !== "default") {
    const key = componentName as Exclude<keyof NamedExports, "default">;
    const val = component as Exclude<ExtendedPlugin, typeof plugin>;
    (plugin as ExtendedPlugin)[key] = val;
  }
});

export default plugin;
