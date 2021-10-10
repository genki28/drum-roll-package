<docs>
備忘録：TODO: @click残しておく？？
year, month, dayがそれぞれ渡されないパターンとdateが渡されているパターンの2つがありえる
閏年や31、30などの制御が必要。今、2020/05/31にいたとして、06に移動したら30から離れる必要ありそう。ただ、その計算自体はスクロールし終わってからで良いと思われる。
→再度スクロールし始めたら30日にリセットするのはしなくて良いと思われる。
誕生日をイメージしていたため選択できる年は今年までにしている。 → 将来的にはもっと先まで選べるようにする必要あり。
閏年などについて、日付の配列末尾にそれ日付以上のものがあれば減らす、なければ増やす
inputタグについては、readOnlyで大丈夫か？
</docs>
<template>
  <div class="drum-roll-component">
    <div class="input">
      <input
        type="text"
        :value="`${year}-${month}-${day}`"
        @click="openModal"
        readonly
      />
    </div>
    <transition name="fade" mode="out-in" appear>
      <div v-show="isActive" class="modal">
        <div class="modal-content">
          <div class="roll-flex">
            <div
              @scroll="yearHandler"
              class="modal-container slider"
              ref="yearScroller"
            >
              <div class="box" v-for="(y, key) in years" :key="key">
                <p class="text" @click="year = y.toString()">{{ y }}</p>
              </div>
            </div>
            <div
              @scroll="monthHandler"
              class="modal-container slider"
              ref="monthScroller"
            >
              <div class="box" v-for="(m, key) in months" :key="key">
                <p class="text" @click="month = m.toString()">{{ m }}</p>
              </div>
            </div>
            <div
              @scroll="dayHandler"
              class="modal-container slider"
              ref="dayScroller"
            >
              <div class="box" v-for="(d, key) in days" :key="key">
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
import { computed, defineComponent, ref, SetupContext } from "vue";
import _ from "lodash";
import { calcDayInMonth, getLastArrayValue } from "@/lib/utils/utilFunc";
import { PackageProps } from "@/lib/@types/packageTypes";

export default defineComponent({
  props: {
    yearValue: {
      type: Number,
      required: false,
      default: 1980,
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
    dateValue: {
      type: Date,
      required: false,
      default: new Date("1980-6-15"), // この辺どうしようか...
    },
  },
  setup(props: PackageProps, ctx: SetupContext) {
    //TODO: dateValueから取得する場合もあるため、その処理も入れておくべき
    const text = ref<string>("");
    const isActive = ref<boolean>(false);
    const years: number[] = _.range(1900, new Date().getFullYear() + 1); // 配列作成時に最後のものがなくなってしまうため
    years.unshift(0); // 最初の要素を選択するため挿入。なお、margin-topなどcssだけでは対応不可であった。
    const months: number[] = _.range(1, 13); // rangeの性質上12が消えてしまうため
    months.unshift(0); // 最初の要素を選択するため挿入。なお、margin-topなどcssだけでは対応不可であった。
    const days = ref<number[]>(_.range(1, 32)); // rangeの性質上31が消えてしまうため
    days.value.unshift(0); // 最初の要素を選択するため挿入。なお、margin-topなどcssだけでは対応不可であった。

    // TODO: 初期値はとりあえずテキトー
    // TODO: dateValueを更新する方法は課題。
    computed<Date>({
      get: () => props.dateValue,
      set: (val) => {
        ctx.emit("update:dateValue", val);
      },
    });
    const year = computed<number>({
      get: () => props.yearValue,
      set: (val) => {
        ctx.emit("update:yearValue", val);
      },
    });
    const month = computed<number>({
      get: () => props.monthValue,
      set: (val) => {
        ctx.emit("update:monthValue", val);
      },
    });
    const day = computed<number>({
      get: () => props.dayValue,
      set: (val) => {
        ctx.emit("update:dayValue", val);
      },
    });
    const openModal = () => {
      isActive.value = !isActive.value;
      if (!isActive.value) return;
      // こんな分岐入れなきゃいけないの嫌だなぁ（なんかsetTimeOutを入れなきゃいけない・・・？）
      // TODO: リッチなスクロールにしたい！
      setTimeout(() => {
        if (!yearScroller.value || !monthScroller.value || !dayScroller.value) {
          return;
        }
        const yearPixel = (year.value - 1900) * 81;
        const monthPixel = (month.value - 1) * 81;
        const dayPixel = (day.value - 1) * 81;
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
        year.value = years[number + 1];
        setTimeout(() => {
          // ここ、1秒待つとcomputedが反映されるため恐らく他に原因があると思われる。後日徹底調査。以前までは適切にできていたため、computedか処理が重いことが原因か？
          calcLastOfMonth();
        }, 1);
      }
    };

    const monthHandler = (e: any) => {
      const data = e.target.scrollTop;
      const number = Math.floor(data / cellHeight.value); // TODO :Math.floor大丈夫？？
      if (number !== monthScrollNumber.value) {
        monthScrollNumber.value = number;
        // 0はダミーのため +1 する
        month.value = months[number + 1];
        setTimeout(() => {
          // ここ、1秒待つとcomputedが反映されるため恐らく他に原因があると思われる。後日徹底調査。以前までは適切にできていたため、computedか処理が重いことが原因か？
          calcLastOfMonth();
        }, 1);
      }
    };

    const dayHandler = (e: any) => {
      const data = e.target.scrollTop;
      const number = Math.floor(data / cellHeight.value);
      if (number !== dayScrollNumber.value) {
        dayScrollNumber.value = number;
        // 0はダミーのため +1 する
        day.value = days.value[number + 1];
      }
    };

    const calcLastOfMonth = () => {
      // TODO: めっちゃ重いので後で必ず直す必要がある
      // TODO: ここは何秒か経ってからで良いのでは？？
      const lastDay = calcDayInMonth(year.value, month.value);
      const dayArrayLast = getLastArrayValue<number>(days.value); // いい変数名をください。
      const diff = lastDay - dayArrayLast;

      if (diff > 0) {
        // TODO: 計算後の月末が今よりも大きいため、配列に任意の数pushする必要がある。
        // TODO: めっちゃいけてないけどとりあえず以下のようにする
        for (let i = 1; i <= diff; i++) {
          days.value.push(dayArrayLast + i);
        }
        return;
      }
      if (diff < 0) {
        // TODO: 計算後の月末が今よりも小さいため、配列から任意の数削除する必要がある。
        days.value.splice(diff);
        return;
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateY(0px);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(80px);
}

.fade-content {
  > .text {
    color: white;
  }
}

.roll-flex {
  display: flex;
  justify-content: space-between;
}

.modal-container {
  // overflow: scroll;
  height: 200px;
  width: calc(100% / 3);

  > .box {
    height: 81px;
    color: white;

    &:first-child {
      height: 81px;
      visibility: hidden;
    }

    &:last-child {
      // 最後の1つを選択できるようにするための処理
      margin-bottom: 38px; // height 200px - (81px * 2 -> 2要素のため)
    }
  }
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
