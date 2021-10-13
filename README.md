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
import { createApp } from "vue";
import App from "./App.vue";
import SmartDrumRoll from "smart-drum-roll";
import "smart-drum-roll/dist/smart-drum-roll.css"

createApp(App)
  .use(SmartDrumRoll)
  .mount("#app")
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
