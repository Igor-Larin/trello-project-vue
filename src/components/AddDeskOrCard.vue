<template>
  <div class="addCardContainer">
    <div class="deskInfoCont">
        <input class="addInput" v-model="nameInputText" type="text" :placeholder="name">
        <input class="addInput" v-model="descrInputText" type="text" :placeholder="descr">
    </div>
    <AddUsersForm v-if="isDesk" v-on:user-removed="removeUser" v-on:user-added="addUser" :users="users"/>
    <button v-on:click="addComponentHandler" class="addCardButton">
      {{ addButtonText }}
    </button>
  </div>
  <hr>
</template>

<script>
  import AddUsersForm from "@/components/AddUsersForm.vue";

  export default {
    components: {AddUsersForm},
    props: {
      isDesk: Boolean,
    },
    data() {
      return {
        isError: false,
        nameInputText: '',
        descrInputText: '',
        errorText: '',
        addButtonText: this.isDesk ? 'Добавить доску' : 'Добавить колонку',
        users: [],
      }
    },
    computed: {
      name() {
        if (this.isDesk)
          return 'Имя доски'
        else
          return 'Имя колонки'
      },
      descr() {
        if (this.isDesk)
          return 'Описание доски'
        else
          return 'Описание колонки'
      }
    },
    methods: {
      removeUser(index) {
        this.users.splice(index, 1)
      },
      addUser(username) {
        this.users.push(username)
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
.deskInfoCont {
  display: flex;
  flex-direction: column;
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