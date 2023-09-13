<template>
  <div class="formElem">
      <input v-model="textInput">
      <button class="saveButton" v-on:click="saveButtonClick">Сохранить</button>
  </div>
</template>

<script>
export default {
  props: ['elem', 'isDeskOrCard'],
  data() {
    return {
      textInput: this.elem.text,
    }
  },
  methods: {
    saveButtonClick() {
      let changedElem = {
        id: this.elem.id,
        text: this.textInput,
        complete: this.elem.complete,
      }
      console.log(changedElem)
      this.$emit('save-button-clicked', changedElem)
    }
  },
  computed: {
    elemsProps() {
      let elemPropsArray = []
      for(let pr in this.elem) {
        if (!pr.includes('id') && !pr.includes('comp'))
          elemPropsArray.push({name: pr, value: this.elem[pr]})
      }
      return elemPropsArray
    }
  }
}
</script>

<style scoped>
 .formElem {
   display: flex;
   flex-direction: row;
   justify-content: start;
   width: 90%;
   padding: 0;
   height: 100%;
   margin: 0;
 }
 input {
   width: 95%;
   margin: 2px;
   padding: 2px;
   border-radius: 5px;
   border-width: 1px;
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