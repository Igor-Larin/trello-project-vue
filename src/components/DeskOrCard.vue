<template>
  <DeskOrCardForm v-if="isChanging" v-on:save-button-clicked="saveButtonClick" :elem="elem"/>
  <div v-else v-on:click="click" class="card">
    <p class="smallTitle">Название</p>
    <p class="text">
      {{ elem.name }}
    </p>
    <p class="smallTitle">Описание</p>
    <p class="text">
      {{ elem.descr }}
    </p>
    <div class="controlButtons">
      <button @:click.stop="changeButtonClick" class="changeButton">
        Изменить
      </button>
      <button @:click.stop="deleteButtonClick" class="deleteButton">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import DeskOrCardForm from "@/components/DeskOrCardChangeForm.vue";

export default {
  components: {DeskOrCardForm},
  props: ['elem', 'index'],
  data() {
    return {
      isChanging: false,
    }
  },
  methods: {
    changeButtonClick() {
      this.isChanging = true;
    },
    deleteButtonClick() {
      console.log('in delete desk')
      this.$emit('delete-elem', this.index)
    },
    click() {
      this.$emit('click-on-elem', this.index)
    },
    saveButtonClick(changedElem) {
      this.isChanging = false
      this.$emit('change-button-clicked', changedElem, this.index)
    }
  }
}
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5FDFF;
  border-radius: 6px;
  padding: 0 10px 10px;
  margin: 20px 20px;
  box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
  width: 15%;
  max-width: 20%;
}
.card:hover {
  cursor: pointer;
}
.controlButtons {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
button {
  padding: 5px;
}
.text {
  margin: 2px auto 12px;
  font-size: 18px;
  border: 1px lightgray solid;
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