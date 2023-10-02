<template>
  <div v-if="isFetched">
    <div v-if="elems.length !== 0" class="cardsContainer">
      <DeskOrCard v-for="(elem, index) in sortedElems" :key="elem.id" :elem="elem" :index="index" v-on:change-button-clicked="changeElem" v-on:click-on-elem="clickOnElem" v-on:delete-elem="deleteElem"/>
    </div>
    <h1 v-else>Элементов пока нет!</h1>
  </div>
</template>

<script >
import AddComponent from "@/components/AddDeskOrCard.vue"
import DeskOrCard from "@/components/DeskOrCard.vue";
export default {
  props: {
    elems: Array,
    addButtonText: String,
    isFetched: Boolean,
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
  },
  computed: {
    sortedElems() {
      return this.elems.sort((a, b) => a.id - b.id)
    }
  },
}
</script>

<style scoped>
.cardsContainer {
  display: flex;
  justify-content: center;
  margin: 0 20px;
  padding-top: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
}
h1 {
  text-align: center;
}
</style>