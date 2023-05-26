<template>
  <div class="app flex flex-col h-full overflow-hidden">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;
  background: url(./assets/images/Shape-1.png), url(./assets/images/Shape-2.png);
  background-repeat: no-repeat, no-repeat;
  background-size: 550px 320px, 320px 320px;
  background-position: left 5px top 159px, right 10px top 100px;
  margin-bottom: 120px;

  &::before {
      content: "";
      position: absolute;
      display: block;
      right: 50%;
      top: 20%;
      transform: translateX(50%);
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-image: radial-gradient(circle, #234e77 0%, #5574ba 51.56%, #66ace9 100%);
      filter: blur(200px);
      z-index: -1;
    }
}

</style>
