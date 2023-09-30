<template>
  <main>
    <div v-if="isFetched">
      <div class="desksHeader">
        <button v-on:click="showAddComponent" class="addButton">
          {{ addButtonText }}
        </button>
      </div>
      <AddComponent :is-adding="componentAdding" v-on:component-added="postComponent" :is-desk="false"/>
      <DeskOrCardList :is-fetched="isFetched" v-on:change-elem="changeElem" v-on:click-on-elem="click" v-on:delete-elem="deleteComponent" :elems="cards" :add-button-text="addButtonText"/>
      <BackToButton :is-to-desk="true"/>
    </div>
    <h1 v-else-if="isError">{{ errorText }}</h1>
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
        authHeader: 'Bearer ',
        isFetched: false,
        isError: false,
        errorText: '',
        componentAdding: false,
      }
    },
    computed: {
      addButtonText() {
        return this.componentAdding ? 'Закрыть' : '+ Добавить еще одну карточку '
      },
    },
    methods: {
      showAddComponent() {
        this.componentAdding = !this.componentAdding
      },
      postComponent(card) {
        console.log('in postComponent')
        fetch(`http://localhost:8081/desks/${this.deskId}/newCard`,
            {
              method: 'POST',
              headers: {
                'Content-type':'application/json;charset=utf-8',
                Authorization: this.authHeader
              },
              body: JSON.stringify(card, (key, value) => {return (key === 'users') ? undefined : value})
            })
            .then(response => {
              if (response.ok) return response.json()
            })
            .then(res => {
              card.id = res
              this.cards.push(card)
            })
        this.showAddComponent()
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
            .then(response => {
              if(response.ok) {
                this.isFetched = true
                return response.json()
              }
              else if(response.status === 403){
                this.errorText = 'Данные недоступны'
                this.isError = true
              }
              else if(response.status === 401) {
                this.$router.push('/login')
              }
            }
            )
            .then(json => this.cards = json)
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
.desksHeader {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.addButton {
  width: 15%;
  padding: 10px 5px;
}
.addButton:hover {
  background: #BACECF;
}
</style>