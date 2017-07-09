<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <Logo id="logo"></Logo>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Logo from './assets/logo.svg';

export default {
  name: 'app',
  components: {
    Logo,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#logo {
  width: 30%;
  padding: 5px;
}

#logo path {
  fill-opacity: 0;
  stroke: #000000;
  stroke-width: 1px;
  stroke-dasharray: 2800;
  stroke-dashoffset: 2800;
  animation: offset 3s ease-in 1 forwards,
             fill 0.5s 1.75s linear 1 forwards;
}

@keyframes offset {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill {
  to {
    fill-opacity: 1;
  }
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
