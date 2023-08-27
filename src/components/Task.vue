<template>
  <div class="inside">
    <div class="task">
      {{ task.text }}
    </div>
    <button class="changeButton">
      ред.
    </button>
    <button v-on:click="deleteButton" class="deleteButton">
      del.
    </button>
  </div>
</template>

<script>
  export default {
    props: ['task', 'index'],
    methods: {
      deleteButton() {
        console.log('delete task in task')
        this.$emit('delete-task', this.index)
      }
    }
  }
</script>

<style scoped>
.inside {
  display: flex;
  width: 90%;
  justify-content: center;
}
.task {
  background-color: #E2E2E2;
  width: 80%;
  border-radius: 5px;
  text-align: center;
}
.task, .changeButton, .deleteButton {
  padding: 8px;
  margin: 5px 0;
}
.changeButton, .deleteButton {
  max-width: 20%;
  text-align: center;
  font-size: 13px;
  box-shadow: none;
}
</style>