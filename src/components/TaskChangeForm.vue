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
      if(this.textInput.trim() !== '') {
        let changedElem = {
          id: this.elem.id,
          text: this.textInput,
          complete: this.elem.complete,
          timestamp: this.elem.timestamp,
        }
        console.log(changedElem)
        this.$emit('save-button-clicked', changedElem)
      }
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
   margin: 5px;
   padding: 8px;
   text-align: center;
   border-radius: 5px;
   border-width: 1px;
 }
 .formElem:hover {
   cursor: default;
 }
 .saveButton {
   margin: 5px 0 5px;
   padding: 8px;
 }
 .saveButton:hover {
   background: #BACECF;
 }

</style>