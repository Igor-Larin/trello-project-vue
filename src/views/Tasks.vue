<template>
  <main>
      <div class="taskContainer" v-if="tasks.length !== 0">
        <h3>Список задач карточки </h3>
        <TasksFilters v-on:sort-changed="changeSortFlag" v-on:filter-changed="changeFilterFlag" :filter-flag="filterFlag" :sort-flag="sortFlag"/>
        <Task v-on:task-complete="changeTaskComplete" v-on:save-changed-task="saveTask" v-on:delete-task="deleteTask" v-for="(task, index) in getTasks" :task="task" :index="index"/>
      </div>
      <h1 v-else>Список задач пуст!</h1>
      <AddTask v-on:add-task="addTask"/>
      <BackToButton :is-to-desk="false" :id="deskId"/>
  </main>
</template>

<script>

import {defineComponent} from "vue";
import AddTask from "@/components/AddTask.vue";
import BackToButton from "@/components/BackToButton.vue";
import Task from "@/components/Task.vue";
import TasksFilters from "@/components/TasksFilters.vue";

export default defineComponent({
  components: {BackToButton, AddTask, Task, TasksFilters},
  props: [
    'deskId',
    'cardId'
  ],
  data() {
    return {
      tasks: [],
      sortFlag: '',
      filterFlag: '',
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
    changeFilterFlag(flag) {
      this.filterFlag = flag
    },
    changeSortFlag(flag) {
      this.sortFlag = flag
    }
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