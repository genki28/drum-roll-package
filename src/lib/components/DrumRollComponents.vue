<template>
  <div class="">
    <div class="input">
      <input type="text" v-model="text" @click="openModal" />
    </div>
    <transition name="modal">
      <div v-if="isActive" class="modal">
        <div class="modal-content">
          <div class="roll-flex">
            <div class="year-container">
              <div v-for="(year, key) in years" :key="key">
                <p class="year">{{ year }}</p>
              </div>
            </div>
            <div class="year-container">
              <div v-for="(month, key) in months" :key="key">
                <p class="year">{{ month }}</p>
              </div>
            </div>
            <div class="year-container">
              <div v-for="(day, key) in days" :key="key">
                <p class="year">{{ day }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import _ from "lodash";

export default defineComponent({
  setup() {
    const text = ref<string>("");
    const isActive = ref<boolean>(false);
    const years = _.range(1970, new Date().getFullYear() + 1); // 配列作成時に最後のものがなくなってしまうため
    const months = _.range(1, 13); // rangeの性質上12が消えてしまうため
    const days = _.range(1, 32); // rangeの性質上31が消えてしまうため

    const openModal = () => {
      isActive.value = !isActive.value;
    };

    return {
      text,
      years,
      months,
      days,
      openModal,
      isActive,
    };
  },
});
</script>

<style lang="scss" scoped>
// TODO:まずはスマホ向け
.input {
  position: relative;
}
.modal {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: black;
  // animation-name: fadeup;
  animation-iteration-count: infinite;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave {
  opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 1s;
}

.modal-content {
  > .text {
    color: white;
  }
}

.roll-flex {
  display: flex;
  justify-content: space-between;
}

.year-container {
  overflow: scroll;
  height: 145px;
  width: calc(100% / 3);
}

.year {
  color: white;
}

// @keyframes fadeup {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
</style>
