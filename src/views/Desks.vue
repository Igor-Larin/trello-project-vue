<template>
  <main>
    <div v-if="isFetched">
      <DeskOrCardList v-on:change-elem="changeElem" v-on:click-on-elem="clickOnDesk" v-on:delete-elem="deleteComponent" :elems="desks" :add-button-text="addButtonText"/>
      <AddComponent v-on:component-added="postComponent" :add-button-text="addButtonText"/>
    </div>
    <h1 v-else>Доступ к несущестующей информации</h1>
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
        addButtonText: 'Добавить доску',
        isFetched: false,
        authHeader: 'Bearer '
      }
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
              if (response.ok) {
                this.isFetched = true
                return response.json()
              }
              else if(response.status === 401)
                this.$router.push('/login')
            })
            .then(res => {
              if(this.isFetched)
                this.desks = res
            })
            .catch(error => {
              console.log(error)
            })
      }
      else {
        console.log('in desks redirect or login')
        this.$router.push('/login')
      }
    },
    methods: {
      postComponent(comp) {
        console.log('in postComponent')
        fetch(`http://localhost:8081/users/${localStorage.username}/newDesk`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json;charset=utf-8',
                Authorization: this.authHeader,
              },
              body: JSON.stringify(comp)
            })
            .then(response => { if(response.ok)  return response.json() })
            .then(res => {
              console.log(res)
              comp.id = res
              this.desks.push(comp)
            })
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
        fetch(`http://localhost:8081/users/${localStorage.username}/desks/update`,
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

<style>

</style>