<template>
  <DeskOrCardForm :elem="changeObject"/>
</template>

<script>
import DeskOrCardForm from "@/components/DeskOrCardForm.vue";

export default {
  components: {DeskOrCardForm},
  props: ['changeObject'],
}
</script>

<style scoped>

</style>