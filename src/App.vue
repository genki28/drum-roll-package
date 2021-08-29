<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <DrumRollComponents />
  <div>
    <p>スライダーテスト</p>
    <!-- <TestSliderComponents /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DrumRollComponents from "./lib/components/DrumRollComponents.vue";
// import TestSliderComponents from "./lib/components/TestSliderComponents.vue";

export default defineComponent({
  name: "App",
  components: {
    DrumRollComponents,
    // TestSliderComponents,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
