<template>
  <div id="app">
    <Header v-on:header-changed="changeHeader" :is-logged-in="isLoggedIn" :username="username"/>
      <router-view v-on:header-changed="changeHeader"/>
    <footer>
      <a href="#">О нас</a>
      <a href="#">Новости</a>
      <a href="#">Помощь</a>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      isLoggedIn: !!localStorage.token,
      username: localStorage.username,
    }
  },
  computed: {

  },
  methods: {
    changeHeader(){
      console.log('change header')
      this.isLoggedIn = !this.isLoggedIn
      this.username = this.isLoggedIn ? localStorage.username : ''
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
body {
  margin: 0;
  min-height: 100vh;
  background-color: white;
}
header {
  background-color: #6A5D5E;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #a4fffa, #ffffff);
}
button, a {
  text-align: center;
  background-color: #E0EAEB;
  box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
  border: none;
  border-radius: 5px;
  font-size: 17px;
}
button:hover {
  cursor: pointer;
}
footer {
  background-color: #B2BC4E;
  width: 100%;
  display: flex;
  justify-content: center;
}
footer a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  box-shadow: none;
  margin: 5px 50px;
}
footer a:hover {
  text-decoration: underline;
}
h1 {
  text-align: center;
}
.deleteButton {
  background: rosybrown;
}
.deleteButton:hover {
  background: indianred;
}
.changeButton {
  background: rgba(178,188,78,0.8);
}
.changeButton:hover {
  background: rgba(206,223,72,0.8);
}
</style>
