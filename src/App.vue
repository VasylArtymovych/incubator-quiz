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
  background-size: 200px 200px, 150px 150px;
  background-position: left 5px top 80%, right 10px top 15%;

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

@media (min-width: 768px) {
  .app{
    background-repeat: no-repeat, no-repeat;
    background-size: 350px 320px, 320px 320px;
    background-position: left 5px top 70%, right 10px top 100px;
  }
}

@media (min-width: 1024px) {
  .app{
    background-repeat: no-repeat, no-repeat;
    background-size: 400px 420px, 420px 420px;
    background-position: left 5px top 70%, right 10px top 100px;

    &::before {
      content: "";
      position: absolute;
      display: block;
      right: 50%;
      top: 15%;
      transform: translateX(50%);
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background-image: radial-gradient(circle, #234e77 0%, #5574ba 51.56%, #66ace9 100%);
      filter: blur(200px);
      z-index: -1;
    }
  }
}
</style>
