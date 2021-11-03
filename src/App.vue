<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }"> Home </router-link>
    <router-link :to="{ name: 'NewTimer' }"> New timer </router-link>
  </div>
  <router-view />
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
  color: #555;
  padding: 20px;
  text-align: center;
}
#nav a {
  padding: 10px;
  background: white;
  color: black;
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
  text-decoration: none;
}
#nav a.router-link-active {
  color: white;
  background: black;
}
</style>
