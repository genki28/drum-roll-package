<template>
  <div class="">
    <div class="">
      <input type="text" v-model="text" @click="openModal" />
      <div v-if="isActive" class="modal-background">
        <p class="text">モーダル</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const text = ref<string>("");
    const isActive = ref<boolean>(false);

    const openModal = () => {
      isActive.value = true;
    };

    return {
      text,
      openModal,
      isActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-background {
  background-color: black;
  height: 30%;

  > .text {
    color: white;
  }
}
</style>
