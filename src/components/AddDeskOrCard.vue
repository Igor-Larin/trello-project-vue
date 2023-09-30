<template>
  <div class="addCardContainer">
    <div class="deskInfoCont">
        <input v-if="isAdding" class="addInput" v-model="nameInputText" type="text" :placeholder="name">
        <input v-if="isAdding" class="addInput" v-model="descrInputText" type="text" :placeholder="descr">
    </div>
    <div v-if="isAdding && isDesk" class="usersContainer">
      <h4>Участники</h4>
      <div v-for="(user, index) in users" class="userInputCont">
        <div class="userNameDiv">
          {{ user }}
        </div>
        <button class="userButton" v-on:click="removeUser(index)">-</button>
      </div>
      <div class="userInputCont">
        <input class="userInput" v-model="userNameInput" placeholder="Имя участника">
        <button class="userButton" v-on:click="addUser">+</button>
      </div>
    </div>
      <button v-if="isAdding" v-on:click="addComponentHandler" class="addCardButton">
        {{ addButtonText }}
      </button>
      <div v-if="isError" class="alertBlock">
        {{ errorText }}
      </div>
  </div>
  <hr v-if="isAdding">
</template>

<script>
  export default {
    props: {
      isDesk: Boolean,
      isAdding: Boolean,
    },
    data() {
      return {
        isError: false,
        nameInputText: '',
        descrInputText: '',
        userNameInput: '',
        errorText: '',
        addButtonText: this.isDesk ? 'Добавить доску' : 'Добавить карточку',
        users: [],
      }
    },
    computed: {
      name() {
        if (this.isDesk)
          return 'Имя доски'
        else
          return 'Имя карточки'
      },
      descr() {
        if (this.isDesk)
          return 'Описание доски'
        else
          return 'Описание карточки'
      }
    },
    methods: {
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
      addComponentHandler() {
        console.log('generate event')
        if (this.nameInputText.trim() !== '' && this.descrInputText.trim() !== '') {
          let comp = {
            id: null,
            name: this.nameInputText,
            descr: this.descrInputText,
          }
          if(this.isDesk) {
            this.users.push(localStorage.username)
            comp.users = this.users
          }
          this.nameInputText = ''
          this.descrInputText = ''
          this.$emit('component-added', comp)
          this.users.length = 0
        }
        else {
          this.isError = true
          this.errorText = 'Поля не должны быть пустыми'
        }
      },
    }
  }
</script>


<style scoped>
.addComp-enter-active,
.addComp-leave-active{
  transition: max-height, font-size 1s ease;
}
.addComp-enter-from,
.addComp-leave-to{
  max-height: 0;
  font-size: 0;
}
.addComp-enter-to,
.addComp-leave-from {
  max-height: 100px;
  font-size: 13px;
}
.alert-enter-active{
  transition: opacity 0.75s linear;
}
.alert-leave-active {
  transition: opacity 2.5s ease-in
}

.alert-enter-from,
.alert-leave-to{
  opacity: 0;
}
h4 {
  margin: 2px 0 4px;
}
.alertBlock {
  background: #979797;
  color: white;
  padding: 7px;
  text-align: center;
  border-radius: 6px;
  margin-top: 5px;
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
input {
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  text-align: center;
}
hr {
  width: 99%;
}
.addInput {
  margin-bottom: 5px;
}
.addCardContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 7px;
}
.addCardButton {
  width: 17%;
  padding: 10px 5px;
  margin: 10px 5px;
}
.addCardButton:hover {
  background: #BACECF;
  cursor: pointer;
}
</style>