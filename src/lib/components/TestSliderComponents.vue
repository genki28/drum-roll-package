<template>
  <div class="slider">
    <div>子要素1</div>
    <div>子要素2</div>
    <div>子要素3</div>
    <div>子要素4</div>
    <div>子要素5</div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.slider {
  scroll-snap-type: y mandatory;
  position: relative;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  // overflow-scrolling: touch;

  height: 100px;
}

.slider > div {
  scroll-snap-align: start;
  height: 100%;
  width: 100%;

  color: #fff;
  font-size: 150%;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
}

.slider > div:nth-child(1) {
  background-color: #c7000b;
}
.slider > div:nth-child(2) {
  background-color: #d28300;
}
.slider > div:nth-child(3) {
  background-color: #dfd000;
}
.slider > div:nth-child(4) {
  background-color: #00873c;
}
.slider > div:nth-child(5) {
  background-color: #005aa0;
}
</style>
