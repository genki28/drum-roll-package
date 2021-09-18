<docs>
備忘録：TODO: @click残しておく？？
</docs>
<template>
  <div class="">
    <div class="input">
      <input
        type="text"
        :value="`${year}-${month}-${day}`"
        @click="openModal"
      />
    </div>
    <transition name="modal" appear>
      <div v-show="isActive" class="modal">
        <div class="modal-content">
          <div class="roll-flex">
            <div
              @scroll="yearHandler"
              class="year-container slider"
              ref="yearScroller"
            >
              <div class="year" v-for="(y, key) in years" :key="key">
                <p class="text" @click="year = y.toString()">{{ y }}</p>
              </div>
            </div>
            <div
              @scroll="monthHandler"
              class="year-container slider"
              ref="monthScroller"
            >
              <div class="year" v-for="(m, key) in months" :key="key">
                <p class="text" @click="month = m.toString()">{{ m }}</p>
              </div>
            </div>
            <div
              @scroll="dayHandler"
              class="year-container slider"
              ref="dayScroller"
            >
              <div class="year" v-for="(d, key) in days" :key="key">
                <p class="text" @click="day = d.toString()">{{ d }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import _ from "lodash";

type Props = {
  yearValue?: number;
  monthValue?: number;
  dayValue?: number;
};

export default defineComponent({
  props: {
    yearValue: {
      type: Number,
      required: false,
      default: 1995,
    },
    monthValue: {
      type: Number,
      required: false,
      default: 6,
    },
    dayValue: {
      type: Number,
      required: false,
      default: 15,
    },
  },
  setup(props: Props) {
    const text = ref<string>("");
    const isActive = ref<boolean>(false);
    const years: (number | string)[] = _.range(
      1900,
      new Date().getFullYear() + 1
    ); // 配列作成時に最後のものがなくなってしまうため
    // 見た目上、ダミーデータを入れる
    // TODO: pushの方は入れてしまうと最後までスクロールできちゃうから考えないといけない。
    years.unshift("");
    years.push("");
    const months: (number | string)[] = _.range(1, 13); // rangeの性質上12が消えてしまうため
    months.unshift("");
    months.push("");
    const days: (number | string)[] = _.range(1, 32); // rangeの性質上31が消えてしまうため
    days.unshift("");
    days.push("");
    // TODO: 初期値はとりあえずテキトー
    const year = ref<string | number>(props.yearValue ?? years[1].toString());
    const month = ref<string | number>(
      props.monthValue ?? months[1].toString()
    );
    const day = ref<string | number>(props.dayValue ?? days[1].toString());
    const openModal = () => {
      isActive.value = !isActive.value;
      if (!isActive.value) return;
      // こんな分岐入れなきゃいけないの嫌だなぁ（なんかsetTimeOutを入れなきゃいけない・・・？）
      // TODO: リッチなスクロールにしたい！
      setTimeout(() => {
        if (!yearScroller.value || !monthScroller.value || !dayScroller.value)
          return;
        const yearPixel = (Number(year.value) - 1900) * 81;
        const monthPixel = (Number(month.value) - 1) * 81;
        const dayPixel = (Number(day.value) - 1) * 81;
        yearScroller.value.scrollTo(0, yearPixel);
        monthScroller.value.scrollTo(0, monthPixel);
        dayScroller.value.scrollTo(0, dayPixel);
      }, 1);
    };
    // TODO: 初期値はテキトー。というようりもこの変数いる？？
    const cellHeight = ref<number>(81); // TODO: とりあえずマジックナンバーで81を設定しておく
    const yearScrollNumber = ref<number>(0); // TODO: 将来的には初期値を挿入する予定
    const monthScrollNumber = ref<number>(0); // TODO: 将来的には初期値を挿入する予定
    const dayScrollNumber = ref<number>(0);

    const yearScroller = ref<HTMLElement>();
    const monthScroller = ref<HTMLElement>();
    const dayScroller = ref<HTMLElement>();

    // ここの型ってなんだろう?
    // TODO: とりあえず全てfunction分けておく
    const yearHandler = (e: any) => {
      const data = e.target.scrollTop;
      const number = Math.floor(data / cellHeight.value); // TODO: Math.floor大丈夫？？
      if (number !== yearScrollNumber.value) {
        yearScrollNumber.value = number;
        // 0はダミーのため +1 する
        year.value = years[number + 1].toString();
      }
    };

    const monthHandler = (e: any) => {
      const data = e.target.scrollTop;
      const number = Math.floor(data / cellHeight.value); // TODO :Math.floor大丈夫？？ & ここはマジックnumberではなく要素から取り出したい.
      if (number !== monthScrollNumber.value) {
        monthScrollNumber.value = number;
        // 0はダミーのため +1 する
        month.value = months[number + 1].toString();
      }
    };

    const dayHandler = (e: any) => {
      const data = e.target.scrollTop;
      const number = Math.floor(data / cellHeight.value);
      if (number !== dayScrollNumber.value) {
        dayScrollNumber.value = number;
        // 0はダミーのため +1 する
        day.value = days[number + 1].toString();
      }
    };

    return {
      text,
      years,
      year,
      month,
      day,
      months,
      days,
      isActive,
      yearScroller,
      monthScroller,
      dayScroller,
      yearHandler,
      monthHandler,
      dayHandler,
      openModal,
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
  // overflow: scroll;
  height: 200px;
  width: calc(100% / 3);
}

.year {
  height: 81px;
  color: white;
}

.slider {
  scroll-snap-type: y mandatory;
  position: relative;
  // width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  // overflow-scrolling: touch;
}

.slider > div {
  scroll-snap-align: start;

  color: #fff;
  font-size: 150%;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
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
