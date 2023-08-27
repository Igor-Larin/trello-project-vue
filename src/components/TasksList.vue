<template>
  <div class="taskContainer">
    <h3>Список задач карточки </h3>
    <Task v-on:delete-task="deleteTask" v-for="(task, index) in tasks" :task="task" :index="index"/>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue";
  export default {
    props: ['tasks'],
    components: {
      Task
    },
    methods: {
      deleteTask(index) {
        this.$emit('delete-task', index)
      }
    },
    computed: {
      completedTasks() {
        return this.tasks.filter(t => t.isComplete === true)
      }
    }
  }
</script>

<style scoped>
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