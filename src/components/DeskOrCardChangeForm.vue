<template>
  <div class="card">
    <p class="smallTitle">Название</p>
    <input v-on:keyup.enter="saveButtonClick" class="text" v-model="nameInput">
    <p class="smallTitle">Описание</p>
    <input v-on:keyup.enter="saveButtonClick" class="text" v-model="descrInput">
    <button class="saveButton" v-on:click="saveButtonClick">&#10004;</button>
  </div>
</template>

<script>
export default {
  props: ['elem'],
  data() {
    return {
      nameInput: this.elem.name,
      descrInput: this.elem.descr,
    }
  },
  methods: {
    saveButtonClick() {
      console.log('in save button ' + this.elem.id + ' ' + this.nameInput + ' ' + this.descrInput)
      let changedElem = {
        id: this.elem.id,
        name: this.nameInput,
        descr: this.descrInput,
        //users: this.elem.users,
      }
      this.$emit('save-button-clicked', changedElem)
    }
  }
}
</script>

<style scoped>
input {
  width: 85%;
  padding: 3px;
  text-align: center;
}
 .saveButton:hover {
   background: #BACECF;
 }
.text {
  margin: 2px auto 12px;
  font-size: 18px;
  border: 1px orange solid;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  background: white;
  padding: 6px;
  font-family: sans-serif;
}
.smallTitle {
  font-size: 13px;
  margin: 2px auto 2px;
  border: none;
}
</style>