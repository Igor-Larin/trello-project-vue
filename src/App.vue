<template>
  <div id="app">
    <header>
      <router-link to="/" id="trello" class="headerElem">Trello</router-link>
      <div id="deskname" class="headerElem">
        Список досок
      </div>
      <router-link to="/users/1/desks" id="nickname" class="headerElem">
        {{ userName }}
      </router-link>
    </header>
      <router-view/>
    <footer>
      <a href="#">О нас</a>
      <a href="#">Новости</a>
      <a href="#">Помощь</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      userName: 'user',
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  footer {

  }
</style>

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
.headerElem {
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 17px;
}
#trello {
  background-color: #503335;
  color: #C0ECE9;
  font-weight: bold;
  margin-left: 10px;
}
#trello:hover {
  background-color: #312022;
}
#deskname {
  color: black;
  font-weight: bold;
  background-color: #E0EAEB;
}
#nickname {
  background-color: #86920F;
}
#nickname:hover {
  background-color: #B2BC4E;
}
#nickname, #deskname {
  margin: 5px 20px;
}
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
