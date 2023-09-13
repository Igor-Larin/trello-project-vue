<template>
  <div class="tasksWrapper">
    <div class="taskContainer" v-if="tasks.length !== 0">
      <h3>Список задач карточки </h3>
      <Task v-on:save-changed-task="saveTask" v-on:delete-task="deleteTask" v-for="(task, index) in tasks" :task="task" :index="index"/>
    </div>
    <h1 v-else>Список задач пуст!</h1>
    <AddTask v-on:add-task="addTask"/>
    <BackToButton :is-to-desk="false" :id="deskId"/>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import AddTask from "@/components/AddTask.vue";
import BackToButton from "@/components/BackToButton.vue";
import Task from "@/components/Task.vue";

export default defineComponent({
  components: {BackToButton, AddTask, Task },
  props: [
    'deskId',
    'cardId'
  ],
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    addTask(task) {
      task.cardId = this.cardId
      fetch(`http://localhost:8081/users/1/cards/${this.cardId}/newTask`,
          {
            method: 'POST',
            headers: {
              'Content-type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(task)
          })
          .then(response => { if (response.ok) return response.json() })
          .then( res => {
            task.id = res
            this.tasks.push(task)
          })
    },
    deleteTask(index) {
      console.log(`delete task ${index}`)
      fetch(`http://localhost:8081/users/1/desks/${this.deskId}/cards/${this.cardId}/tasks/delete/${this.tasks[index].id}`)
          .then(response => { if (response.ok) this.tasks.splice(index, 1)})
    },
    saveTask(changedTask, index) {
      fetch(`http://localhost:8081/users/1/desks/${this.deskId}/cards/${this.cardId}/tasks/update`,
          {
            method: 'POST',
            headers: {
              'Content-type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(changedTask)
          })
          .then(response => { if (response.ok) this.tasks[index] = changedTask })
    },
  },
  mounted() {
    console.log('in mounted tasks')
    fetch(`http://localhost:8081/users/1/desks/${this.deskId}/cards/${this.cardId}/tasks`)
        .then(response => response.json())
        .then(res => this.tasks = res)
  }
})
</script>

<style scoped>
h1 {
  text-align: center;
}
.tasksWrapper {
  display: flex;
  flex-direction: column;
}
.taskContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px;
  margin: 10px auto;
  background: aliceblue;
  border-radius: 5px;
  width: 35%;
}
</style>