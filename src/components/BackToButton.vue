<template>
  <button v-on:click="backButtonClick" class="backButton">{{ buttonText }}</button>
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
        this.$router.push(`/users/1/desks/`)
      else
        this.$router.push(`/users/1/desks/${this.id}/cards`)
    }
  },
  computed: {
    buttonText() {
      return this.isToDesk ? 'Назад к доскам' : 'Назад к карточкам'
    }
  }
}
</script>

<style scoped>
.backButton {
  padding: 7px;
  margin: 5px auto;
  width: 12%;
}
.backButton:hover {
  cursor: pointer;
  background: #C0ECE9;
}
</style>