<template>
  <div class="card">
    <h3>Изменение параметров</h3>
    <div class="formElem">
      <label>Название</label>
      <input v-model="nameInput">
    </div>
    <div class="formElem">
      <label>Описание</label>
      <input v-model="descrInput">
    </div>
    <button class="saveButton" v-on:click="saveButtonClick">Сохранить</button>
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
      }
      this.$emit('save-button-clicked', changedElem)
    }
  }
}
</script>

<style scoped>
 .formElem {
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
   margin: 5px;
   padding: 10px;
   border: 1px solid lightgray;
   border-radius: 5px;
   background: white;
 }
 .formElem:hover {
   cursor: default;
 }
 .formElem > input {
   margin-top: 5px;
 }
 .saveButton:hover {
   background: #BACECF;
 }

</style>