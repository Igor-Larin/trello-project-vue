<template>
  <TaskChangeForm  v-on:save-button-clicked="saveButtonClick" v-if="isChanging" :is-desk-or-card="false" :elem="task"/>
  <div class="inside" v-else>
    <div class="task">
      {{ task.text }}
    </div>
    <button v-on:click="changeButtonClick" class="changeButton">
      ред.
    </button>
    <button v-on:click="deleteButtonClick" class="deleteButton">
      del.
    </button>
  </div>
</template>

<script>
  import TaskChangeForm from "@/components/TaskChangeForm.vue";

  export default {
    components: {TaskChangeForm},
    props: ['task', 'index'],
    data() {
      return {
        isChanging: false,
      }
    },
    methods: {
      deleteButtonClick() {
        console.log('delete task in task')
        this.$emit('delete-task', this.index)
      },
      changeButtonClick() {
        this.isChanging = true
        console.log('ischanging ' + this.isChanging)
      },
      saveButtonClick(changedTask) {
        this.isChanging = false
        this.$emit('save-changed-task', changedTask, this.index)
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