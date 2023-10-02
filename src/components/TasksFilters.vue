<template>
  <div class="optionsContainer">
<!--    <select v-on:change="filterChange" v-model="filterFlag">
      <option selected disabled hidden="hidden" value="none">Фильтр</option>
      <option v-for="option in filterOptions" :value="option.value">
        {{ option.text }}
      </option>
    </select>-->
    <select v-on:change="sortChange" v-model="sortFlag">
      <option selected disabled hidden="hidden" value="none">Сортировка</option>
      <option v-for="option in sortOptions" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortFlag: 'none',
        filterFlag: 'none',
        sortOptions: [
          {text: 'Новые', value: 'new'},
          {text: 'Старые', value: 'old'},
        ],
        filterOptions: [
          {text: 'Выполненные', value: 'completed'},
          {text: 'Невыполненные', value: 'incompleted'},
          {text: 'Все', value: 'all'},
        ],
      }
    },
    methods: {
      filterChange() {
        console.log(this.filterFlag)
        this.$emit('filter-changed', this.filterFlag)
      },
      sortChange() {
        this.$emit('sort-changed', this.sortFlag)
      }
    }
  }
</script>

<style scoped>
  .optionsContainer {
    display: flex;
    justify-content: space-around;
    width: 90%;
    padding: 5px;
  }
  select {
    border-radius: 5px;
    padding: 2px;
  }
</style>