import { DefineComponent, Plugin } from "vue";

declare const DrumRoll: Exclude<Plugin['install'], undefined>;
export default DrumRoll;

// eslint-disable-next-line @typescript-eslint/ban-types
export const DrumRollComponent: DefineComponent<{}, {}, any>;
