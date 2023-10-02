<template>
  <TaskChangeForm v-if="isChanging" v-on:save-button-clicked="saveButtonClick" :is-desk-or-card="false" :elem="task"/>
  <div v-else class="inside">
    <div class="task" :style="{'text-decoration' : task.complete ? 'line-through' : 'none'}">
      {{ task.text }}
    </div>
    <div class="buttonsContainer">
      <button v-on:click="changeButtonClick" class="changeButton">
        &#9998;
      </button>
      <button v-on:click="deleteButtonClick" class="deleteButton">
        &#10006;
      </button>
      <button v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave" v-on:click="changeCard" class="changeCardButton">
        &#10149;
      </button>
      <transition name="tip">
        <div v-if="isMouseOver && !cardChanging" class="tip">
          Перенести в другую колонку
        </div>
      </transition>
    </div>
    <div v-if="cardChanging" class="cardList">
      <button v-for="card in cards" v-on:click="changeCardClick(card)">{{ card.name }}</button>
    </div>
  </div>
</template>

<script>
  import TaskChangeForm from "@/components/TaskChangeForm.vue";

  export default {
    components: {TaskChangeForm},
    props: ['task', 'index', 'cards'],
    data() {
      return {
        isChanging: false,
        cardChanging: false,
        isMouseOver: false,
      }
    },
    methods: {
      onMouseOver() {
        this.isMouseOver = true
      },
      onMouseLeave() {
        this.isMouseOver = false
      },
      changeCard() {
        this.cardChanging = !this.cardChanging
        this.isMouseOver = false
      },
      changeCardClick(card) {
        fetch(`http://localhost:8081/newcard/${this.task.id}/${card.id}`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.token
          }
        })
            .then(response => {
              if(response.ok) {
                this.$emit('task-removed', this.index)
              }
            })
        this.cardChanging = false
      },
      completeButtonClick() {
        this.$emit('task-complete', this.index)
      },
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
    },
    computed: {
      completeSymbol() {
        return this.task.complete ? '&#8594;' : '&#8594;'
      }
    }
  }
</script>

<style scoped>
.tip-enter-active{
  transition: opacity 1s linear;
}
.tip-leave-active {
  transition: opacity 0.75s ease-in
}

.tip-enter-from,
.tip-leave-to{
  opacity: 0;
}
.tip {
  position: absolute;
  top: 100%;
  left: 66%;
  padding: 5px;
  border: lightgrey solid 1px;
  border-radius: 10px;
  text-align: center;
  background: white;
}
.cardList {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 100%;
}
.cardList button {
  margin: 3px 0;
}
.changeCardButton:hover {

}
.inside {
  position: relative;
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
.task, .changeButton, .deleteButton, .changeCardButton {
  padding: 8px;
  margin: 5px 0;
}
.buttonsContainer {
  position: relative;
  display: flex;
  width: 20%;
}
.changeButton, .deleteButton, .changeCardButton {
  width: 33%;
  text-align: center;
  font-size: 13px;
  box-shadow: none;
}
</style>