<template>
  <div class="tasksWrapper">
    <div class="taskContainer" v-if="tasks.length !== 0">
      <h3>Список задач карточки </h3>
      <div class="optionsContainer">
        <select v-model="filterFlag">
          <option selected disabled hidden="hidden" value="none">Фильтр</option>
          <option v-for="option in filterOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <select v-model="sortFlag">
          <option selected disabled hidden="hidden" value="none">Сортировка</option>
          <option v-for="option in sortOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <Task v-on:task-complete="changeTaskComplete" v-on:save-changed-task="saveTask" v-on:delete-task="deleteTask" v-for="(task, index) in getTasks" :task="task" :index="index"/>
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
      sortFlag: 'none',
      filterFlag: 'none',
      sortOptions: [
          {text: 'Новые', value: 'new'},
          {text: 'Старые', value: 'old'},
      ],
      filterOptions: [
        {text: 'Выполненные', value: 'completed'},
        {text: 'Невыполненные', value: 'incompleted'},
        {text: 'Все', value: 'all'},
      ],
    }
  },
  methods: {
    addTask(task) {
      task.cardId = this.cardId
      fetch(`http://localhost:8081/cards/${this.cardId}/newTask`,
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
      fetch(`http://localhost:8081/tasks/delete/${this.tasks[index].id}`)
          .then(response => { if (response.ok) this.tasks.splice(index, 1)})
    },
    saveTask(changedTask, index) {
      fetch(`http://localhost:8081/cards/${this.cardId}/tasks/update`,
          {
            method: 'POST',
            headers: {
              'Content-type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(changedTask)
          })
          .then(response => { if (response.ok) this.tasks[index] = changedTask })
    },
    changeTaskComplete(index) {
      console.log(`change state ${index}`)
      this.tasks[index].complete = !this.tasks[index].complete
      fetch('http://localhost:8081/complete',
          {
            method: 'POST',
            headers: {
              'Content-type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.tasks[index].id)
          })
    },
  },
  computed: {
    getTasks() {
      let newTasks = this.tasks
      if(this.sortFlag === 'new')
        newTasks = this.tasks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      else if(this.sortFlag === 'old')
        newTasks = this.tasks.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      if(this.filterFlag === 'completed')
        return newTasks.filter(t => t.complete)
      else if(this.filterFlag === 'incompleted')
        return newTasks.filter(t => !t.complete)
      else
        return newTasks
    }
  },
  created() {
    console.log('in mounted tasks')
    fetch(`http://localhost:8081/cards/${this.cardId}/tasks`)
        .then(response => response.json())
        .then(res => this.tasks = res)
  }
})
</script>

<style scoped>
h1 {
  text-align: center;
}
.optionsContainer {
  display: flex;
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