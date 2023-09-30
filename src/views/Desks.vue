<template>
  <main>
    <div v-if="isFetched">
      <div class="desksHeader">
        <button v-on:click="showAddComponent" class="addButton">
          {{ addButtonText }}
        </button>
      </div>
      <AddComponent :is-adding="componentAdding" v-on:component-added="postComponent" :is-desk="true"/>
      <DeskOrCardList :is-fetched="isFetched" v-on:change-elem="changeElem" v-on:click-on-elem="clickOnDesk" v-on:delete-elem="deleteComponent" :elems="desks" :add-button-text="addButtonText"/>
    </div>
    <h1 v-else-if="isError">{{ errorText }}</h1>
  </main>
</template>

<script>
  import DeskOrCardList from "@/components/DeskOrCardList.vue";
  import AddComponent from "@/components/AddDeskOrCard.vue";
  export default {
    components: {AddComponent, DeskOrCardList},
    data() {
      return {
        desks: [],
        isFetched: false,
        isError: false,
        errorText: '',
        componentAdding: false,
        authHeader: 'Bearer '
      }
    },
    computed: {
      addButtonText() {
        return this.componentAdding ? 'Закрыть' : '+ Добавить еще одну доску '
      },
    },
    created() {
      console.log('in mounted desks')
      if(localStorage.token) {
        this.authHeader = this.authHeader + localStorage.token
        console.log(localStorage.token)
        fetch(`http://localhost:8081/users/${localStorage.username}/desks`, {
          headers: {
            Authorization: this.authHeader
          }
        })
            .then(response => {
              console.log(response.status)
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
            })
            .then(res => {
              if(this.isFetched)
                this.desks = res
            })
            .catch(error => {
              this.isError = true
              console.log(error)
            })
      }
      else {
        console.log('in desks redirect or login')
        this.$router.push('/login')
      }
    },
    methods: {
      showAddComponent() {
        this.componentAdding = !this.componentAdding
      },
      postComponent(desk) {
        console.log('in postComponent')
        fetch(`http://localhost:8081/users/newDesk`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json;charset=utf-8',
                Authorization: this.authHeader,
              },
              body: JSON.stringify(desk)
            })
            .then(response => {
              if(response.ok) {
                let jsonPromise = response.json()
                jsonPromise.then(json => {
                  desk.id = json
                  this.desks.push(desk)
                })
              }
            })
        this.showAddComponent()
      },
      deleteComponent(index) {
        console.log('in deleteComponent ' + this.desks[index])
        fetch(`http://localhost:8081/desks/delete/${this.desks[index].id}`, {
          headers: {
            Authorization: this.authHeader
          }
        })
            .then(response => { if (response.ok) this.desks.splice(index, 1)})
      },
      clickOnDesk(index) {
        console.log('click on desk')
        this.$router.push(`/desks/${this.desks[index].id}/cards`)
      },
      changeElem(changedElem, index) {
        console.log('in desks ' + index + ' ' + changedElem.id + ' ' + changedElem.name + ' ' + changedElem.descr)
        fetch(`http://localhost:8081/users/desks/update`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json;charset=utf-8',
                Authorization: this.authHeader
              },
              body: JSON.stringify(changedElem)
            })
            .then(response => { if (response.ok) this.desks[index] = changedElem })
      }
    }
  }
</script>

<style scoped>
.desksHeader {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
}
.addButton {
  width: 15%;
  padding: 10px 5px;
}
.addButton:hover {
  background: #BACECF;
}
</style>