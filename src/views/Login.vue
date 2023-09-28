<template>
  <main>
    <div class="formContainer">
      <h3>
        Вход
      </h3>
      <input v-model="userName" class="regForm" placeholder="Имя пользователя">
      <input v-model="userPassword" class="regForm" placeholder="Пароль">
      <button v-on:click="loginButtonClick" class="regForm gray" id="regButton" type="submit">
        Войти
      </button>
      <div id="login">
        <p id="haveAcc">
          Или вы можете создать аккаунт
        </p>
        <router-link to="/registration" id="loginButton" class="gray">Регистрация</router-link>
      </div>
      <transition @after-enter="isError = !isError" name="alert">
        <div v-if="isError" class="alertBlock">
          {{ errorText }}
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        userPassword: '',
        userName: '',
        errorText: '',
        isError: false,
      }
    },
    mounted() {
      if(localStorage.username)
        this.$router.push('/desks')
    },
    methods: {
      loginButtonClick() {
        if(this.userName.trim() !== '' && this.userPassword.trim() !== '') {
          let user = {
            password: this.userPassword,
            username: this.userName
          }
          fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          })
              .then(response => {
                if (response.ok) {
                  this.userName = ''
                  this.userPassword = ''
                  let jsonPromise = response.json()
                  jsonPromise.then(json => {
                    localStorage.token = json.token
                    localStorage.username = json.username
                    this.$emit('header-changed')
                    this.$router.push('/desks')
                  })
                } else {
                  this.errorText = 'Пользователь не найден'
                  this.isError = true
                }
              })
              .catch(error => {
                console.log(error)
              })
        }
        else {
          this.errorText = 'Некорректные входные данные'
          this.isError = true
        }
      },
    }
  }
</script>

<style scoped>
main {
  height: 90%;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #a4fffa, #ffffff);
}
.alertBlock {
  background: #979797;
  color: white;
  padding: 7px;
  text-align: center;
  border-radius: 6px;
  margin-top: 30px;
}
.alert-enter-active{
  transition: opacity 0.75s linear;
}
.alert-leave-active {
  transition: opacity 2.5s ease-in
}

.alert-enter-from,
.alert-leave-to{
  opacity: 0;
}
.gray {
  background-color: #979797;
}
.formContainer {
  display: flex;
  width: 15%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#regButton {
  color: white;
  border: none;
  margin-bottom: 20px;
}
#regButton:hover {
  background-color: #C3C3C3;
}
.regForm {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  padding: 8px;
  border-radius: 5px;
  border-width: 1px;
}
#loginButton {
  padding: 8px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-size: 14px;
}
#loginButton:hover {
  background-color: #C3C3C3;
}
#haveAcc {
  font-size: 13px;
  color: #9B9B9B;
}
</style>