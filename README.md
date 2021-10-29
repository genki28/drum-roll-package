# smart-drum-roll

For those who want to enter dates in a way other than the calendar...

### Getting
The first step when using smart-drum-roll-component is installing its npm package:
```
$ yarn add smart-drum-roll
```

or

```
$ npm install smart-drum-roll
```

### How to use
main.ts
```
import { createApp, h } from "vue";
import App from "./App.vue";
import SmartDrumRoll from "smart-drum-roll";
import "smart-drum-roll/dist/smart-drum-roll.css";
import { scrollDirective } from "smart-drum-roll/src/lib/directive/scroll";

const app = createApp({
  render() {
    return h(App);
  },
});

app.directive("drum-scroll", {
  created: scrollDirective,
});
app.use(SmartDrumRoll);
app.mount("#app");
```

App.vue
```
<template>
  <SmartDrumRoll
    v-model:yearValue="year" // default:1980
    v-model:monthValue="month" // default: 6
    v-model:dayValue="day" // default: 15
  />
</template>
```

## Sample Demo
![ダウンロード](https://user-images.githubusercontent.com/60918687/137174800-1f59094a-b08f-4156-95d1-47a139b03722.gif)
