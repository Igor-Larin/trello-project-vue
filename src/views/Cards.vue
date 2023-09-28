<template>
  <main>
    <DeskOrCardList v-on:change-elem="changeElem" v-on:click-on-elem="click" v-on:delete-elem="deleteComponent" :elems="cards" :add-button-text="addButtonText"/>
    <AddComponent v-on:component-added="postComponent" :add-button-text="addButtonText"/>
    <BackToButton :is-to-desk="true"/>
  </main>
</template>

<script>

  import DeskOrCardList from "@/components/DeskOrCardList.vue";
  import AddComponent from "@/components/AddDeskOrCard.vue";
  import BackToButton from "@/components/BackToButton.vue";

  export default {
    props: ['deskId'],
    components: {
      BackToButton,
      AddComponent,
      DeskOrCardList,
    },
    data() {
      return {
        cards: [],
        addButtonText: 'Добавить карточку',
        authHeader: 'Bearer ',
      }
    },
    methods: {
      postComponent(card) {
        console.log('in postComponent')
        fetch(`http://localhost:8081/desks/${this.deskId}/newCard`,
            {
              method: 'POST',
              headers: {
                'Content-type':'application/json;charset=utf-8',
                Authorization: this.authHeader
              },
              body: JSON.stringify(card)
            })
            .then(response => { if (response.ok) return response.json() })
            .then(res => {
              card.id = res
              this.cards.push(card)
            })
      },
      deleteComponent(index) {
        console.log('in deleteComponent ')
        fetch(`http://localhost:8081/cards/delete/${this.cards[index].id}`, {
          headers: {
            Authorization: this.authHeader
          }
        })
            .then(response => { if (response.ok) this.cards.splice(index, 1)})
      },
      click(index) {
        console.log(this.deskId)
        this.$router.push(`/desks/${this.deskId}/cards/${this.cards[index].id}/tasks`)
      },
      changeElem(changedElem, index) {
        console.log('in cards ' + index + ' ' + changedElem.id + ' ' + changedElem.name + ' ' + changedElem.descr)
        fetch(`http://localhost:8081/desks/${this.deskId}/cards/update`,
            {
              method: 'POST',
              headers: {
                'Content-type':'application/json;charset=utf-8',
                Authorization: this.authHeader
              },
              body: JSON.stringify(changedElem)
            })
            .then(response => { if (response.ok) this.cards[index] = changedElem })
      }
    },
    created() {
      console.log('in mounted')
      if(localStorage.token) {
        this.authHeader = this.authHeader + localStorage.token
        fetch(`http://localhost:8081/desks/${this.deskId}/cards`, {
          headers: {
            Authorization: this.authHeader
          }
        })
            .then(response => response.json())
            .then(res => this.cards = res)
            .catch(error => {
              console.log(error)
            })
      }
      else {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>