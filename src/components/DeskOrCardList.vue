<template>
  <div v-if="elems.length !== 0" class="cardsContainer">
    <DeskOrCard v-for="(desk, index) in elems" :elem="desk" :index="index" v-on:change-button-clicked="changeElem" v-on:click-on-elem="clickOnElem" v-on:delete-elem="deleteElem"/>
  </div>
  <h1 v-else>Элементов пока нет!</h1>
</template>

<script >
import AddComponent from "@/components/AddDeskOrCard.vue"
import DeskOrCard from "@/components/DeskOrCard.vue";
export default {
  props: {
    elems: Array,
    addButtonText: String
  },
  components: {
    DeskOrCard,
    AddComponent
  },
  methods: {
    deleteElem(index) {
      console.log('in delete desklist')
      this.$emit('delete-elem', index)
    },
    clickOnElem(index) {
      this.$emit('click-on-elem', index)
    },
    changeElem(changedElem, index) {
      console.log('ind desklist change')
      this.$emit('change-elem', changedElem, index)
    }
  }
}
</script>


<style scoped>
.cardsContainer {
  display: flex;
  justify-content: center;
  margin: 0 20px;
  padding-top: 50px;
  flex-wrap: wrap;
  align-items: flex-start;
}
h1 {
  text-align: center;
}
</style>