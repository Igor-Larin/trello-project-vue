<template>
  <hr>
  <div class="addTaskContainer">
    <div class="addInputCont">
      <input class="addInput" v-model="inputTaskText" type="text" placeholder="Текст задания">
    </div>
    <div class="usersContainer">
      <h4>Исполнители</h4>
      <div v-for="(user, index) in users" class="userInputCont">
        <div class="userNameDiv">
          {{ user }}
        </div>
        <button class="userButton" v-on:click="removeUser(index)">-</button>
      </div>
      <div class="userInputCont">
        <input class="userInput" v-model="userNameInput" placeholder="Имя пользователя">
        <button class="userButton" v-on:click="addUser">+</button>
      </div>
    </div>
    <button v-on:click="addTaskHandler" class="addTaskButton">
      Добавить задачу
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTaskText: '',
      userNameInput: '',
      users: [],
    }
  },
  methods: {
    addTaskHandler() {
      let task = {
        id: null,
        text: this.inputTaskText,
        isComplete: false,
        cardId: 1,
        timestamp: new Date(Date.now()),
      }
      this.$emit('add-task', task)
      this.inputTaskText = ''
      this.userNameInput = ''
      this.users.length = 0
    },
    removeUser(index) {
      this.users.splice(index, 1)
    },
    addUser() {
      if(this.userNameInput.trim() !== '') {
        let user = this.userNameInput
        this.users.push(user)
        this.userNameInput = ''
      }
    },
  },
}
</script>

<style scoped>
input {
  width: 15%;
  padding: 6px;
  text-align: center;
}
hr {
  width: 99%;
}
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
.deskInfoCont {
  display: flex;
  flex-direction: column;
  width: 15%;
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
  width: 85%;
}
.userButton {
  width: 15%;
}
.addInputCont {
  width: 15%;
  margin-bottom: 5px;
}
.addInput {
  box-sizing: border-box;
  width: 100%;
}
.addTaskContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 7px;
}
.addTaskButton {
  width: 17%;
  padding: 10px 5px;
  margin: 10px 5px;
}
.addTaskButton:hover {
  background-color: #BACECF;
  cursor: pointer;
}
</style>