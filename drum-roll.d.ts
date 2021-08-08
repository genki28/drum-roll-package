import { DefineComponent, Plugin } from "vue";

declare const DrumRoll: Exclude<Plugin['install'], undefined>;
export default DrumRoll;

export const DrumRollComponent: DefineComponent<{}, {}, any>;
