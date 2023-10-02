<template>
  <div class="buttonCont">
    <button v-on:click="backButtonClick" class="backButton">{{ buttonText }}</button>
  </div>
</template>

<script >
export default {
  props: {
    isToDesk: Boolean,
    id: {
      type: Number,
      required: false,
      default: 1,
    }
  },
  methods: {
    backButtonClick() {
      if(this.isToDesk)
        this.$router.push(`/desks/`)
      else
        this.$router.push(`/desks/${this.id}/cards`)
    }
  },
  computed: {
    buttonText() {
      return this.isToDesk ? 'Назад к доскам' : 'Назад к колонкам'
    }
  }
}
</script>

<style scoped>
.buttonCont {
  display: flex;
  justify-content: center;
}
.backButton {
  padding: 7px;
  margin: 5px auto;
  width: 12%;
}
.backButton:hover {
  background: #C0ECE9;
}
</style>