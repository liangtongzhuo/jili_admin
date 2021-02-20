<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .g-red-background-color {
    background-color: #c90000;
  }
}
html {
  background: #f5f5f5;
}
body {
  min-width: 1024px;
}
</style>
