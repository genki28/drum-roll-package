<docs>
Thank you Download And Watch!!!
Here is a sample component
</docs>
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <DrumRollComponents
    v-model:yearValue="year"
    v-model:monthValue="month"
    v-model:dayValue="day"
  />
  <div>
    <p class="title">親コンポーネント側</p>
    <p>{{ year }}/{{ month }}/{{ day }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DrumRollComponents from "./lib/components/DrumRollComponents.vue";

export default defineComponent({
  name: "App",
  components: {
    DrumRollComponents,
  },
  setup() {
    const year = ref(1980);
    const month = ref(6);
    const day = ref(1);

    return {
      year,
      month,
      day,
    };
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
