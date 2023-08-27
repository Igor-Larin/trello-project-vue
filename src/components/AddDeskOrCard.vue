<template>
  <hr>
  <div class="addCardContainer">
    <label>
      <input class="addInput" v-model="nameInputText" type="text" :placeholder="name">
    </label>
    <label>
      <input class="addInput" v-model="descrInputText" type="text" :placeholder="descr">
    </label>
    <button v-on:click="addComponentHandler" class="addCardButton">
      {{ addButtonText }}
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      addButtonText: String,
    },
    data() {
      return {
        nameInputText: '',
        descrInputText: '',
      }
    },
    computed: {
      name() {
        if (this.addButtonText.includes('доску'))
          return 'Имя доски'
        else
          return 'Имя карточки'
      },
      descr() {
        if (this.addButtonText.includes('доску'))
          return 'Описание доски'
        else
          return 'Описание карточки'
      }
    },
    methods: {
      addComponentHandler() {
        console.log('generate event')
        if (this.nameInputText.length !== 0 && this.descrInputText.length !== 0) {
          let comp = {
            id: null,
            name: this.nameInputText,
            descr: this.descrInputText
          }
          this.nameInputText = ''
          this.descrInputText = ''
          this.$emit('component-added', comp)
        }
      },
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
.addCardContainer {
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
  background: #BACECF;
  cursor: pointer;
}
</style>