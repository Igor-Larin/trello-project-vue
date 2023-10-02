<template>
  <hr>
  <div class="addTaskContainer">
    <div class="addInputCont">
      <input class="addInput" v-model="inputTaskText" type="text" placeholder="Текст задания">
    </div>
<!--    <AddUsersForm v-on:user-removed="removeUser" v-on:user-added="addUser" :users="users"/>-->
    <button v-on:click="addTaskHandler" class="addTaskButton">
      Добавить задачу
    </button>
    <transition @after-enter="isError = !isError" name="alert">
      <div v-if="isError" class="alertBlock">
        {{ errorText }}
      </div>
    </transition>
  </div>
</template>

<script>
import AddUsersForm from "@/components/AddUsersForm.vue"
export default {
  components: {AddUsersForm},
  data() {
    return {
      inputTaskText: '',
      userNameInput: '',
      isError: false,
      errorText: '',
      users: [],
    }
  },
  methods: {
    addTaskHandler() {
      if(this.inputTaskText.trim() !== '') {
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
      }
      else {
        this.errorText = 'Поле ввода не должно быть пустым'
        this.isError = true
      }
    },
    removeUser(index) {
      this.users.splice(index, 1)
    },
    addUser(username) {
      this.users.push(username)
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