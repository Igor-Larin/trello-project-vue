<template>
  <div class="usersContainer">
    <h4>Участники</h4>
    <div v-for="(user, index) in users" class="userInputCont">
      <div class="userNameDiv">
        {{ user }}
      </div>
      <button class="userButton" v-on:click="removeUser(index)">-</button>
    </div>
    <div class="userInputCont">
      <input class="userInput" v-model="userNameInput" placeholder="Имя участника">
      <button class="userButton" v-on:click="addUser">&#10010;</button>
    </div>
  </div>
  <transition @after-enter="isError = !isError" name="alert">
    <div v-if="isError" class="alertBlock">
      {{ errorText }}
    </div>
  </transition>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      isError: false,
      errorText: '',
      userNameInput: '',
    }
  },
  methods: {
    removeUser(index) {
      this.$emit('user-removed', index)
    },
    addUser() {
      if(this.userNameInput.trim() !== '') {
        fetch(`http://localhost:8081/users/check/${this.userNameInput.trim()}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
          }
        })
            .then(response => {
              if(response.ok) {
                this.$emit('user-added', this.userNameInput.trim())
                this.userNameInput = ''
              }
              else if(response.status === 404){
                this.errorText = 'Пользователь с таким именем не найден'
                this.isError = true
              }
            })
      }
      else {
        this.errorText = 'Поле ввода не должно быть пустым'
        this.isError = true
      }
    },
  }
}
</script>

<style scoped>

h4 {
  margin: 2px 0 4px;
}
.userNameDiv {
  background: white;
  width: 85%;
  padding: 6px;
  box-sizing: border-box;
  border: rgb(133, 133, 133) solid 1px;
  text-align: center;
}
.usersContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
}
.userInputCont {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
}
.userInput {
  text-align: center;
  width: 85%;
}
.userButton {
  width: 15%;
}
</style>