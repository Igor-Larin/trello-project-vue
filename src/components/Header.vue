<template>
  <header>
    <router-link to="/" id="trello" class="headerElem">Trello</router-link>
    <div class="userInfoContainer" v-if="isLoggedIn">
      <button v-on:click="toDesks" id="nickname" class="headerElem">
        {{ username }}
      </button>
      <button class="headerElem loginButton" v-on:click="logoutClick">
        Выйти
      </button>
    </div>
    <div class="userInfoContainer" v-else>
      <router-link to="/login" id="nickname" class="headerElem">
        Войти
      </router-link>
      <router-link to="/registration" id="registration" class="headerElem">
        Регистрация
      </router-link>
    </div>
  </header>
</template>

<script>
  export default {
    props: ['isLoggedIn', 'username'],
    methods: {
      logoutClick() {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        this.$emit('header-changed')
        this.$router.push('/')
      },
      toDesks() {
        this.$router.push(`/desks`)
      },
    },
  }
</script>

<style scoped>
.userInfoContainer {
  margin-right: 5px;
}
.headerElem {
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 17px;
  margin: 5px 10px;
}
.loginButton {
  background: #9B9B9B;
}
.loginButton:hover {
  background: cadetblue;
}
#registration {
  margin-left: 5px;
  background-color: #86920F;
}
#registration:hover {
  background-color: #B2BC4E;
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
#nickname {
  background-color: #86920F;
}
#nickname:hover {
  background-color: #B2BC4E;
}
</style>