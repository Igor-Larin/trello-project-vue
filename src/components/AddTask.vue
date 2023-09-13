<template>
  <hr>
  <div class="addTaskContainer">
    <label>
      <input class="addInput" v-model="inputTaskText" type="text" placeholder="Текст задания">
    </label>
    <button v-on:click="addTaskHandler" class="addCardButton">
      Добавить задачу
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    addTaskHandler() {
      let task = {
        id: null,
        text: this.inputTaskText,
        isComplete: false,
        cardId: 1,
      }
      this.$emit('add-task', task)
      this.inputTaskText = ''
    }
  },
  data() {
    return {
      inputTaskText: '',
    }
  }
}
</script>

<style scoped>
hr {
  width: 99%;
}
.addInput {
  margin-bottom: 5px;
}
.addTaskContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 7px;
}
.addCardButton {
  width: 20%;
  padding: 10px 5px;
  margin: 10px 5px;
}
.addCardButton:hover {
  background-color: #BACECF;
  cursor: pointer;
}
</style>