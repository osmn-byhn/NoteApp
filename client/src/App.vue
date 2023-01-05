<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted, onUpdated } from 'vue'
  import Navbar from './components/Navbar.vue'
  const items = ref([])
  const description = ref('')
  const editedDescription = ref('')
  const selected = ref({})
  async function getItems() {
    const response = await axios.get("api/bucketListItems/")
    items.value = response.data
  }
  onMounted(async () => {
    await getItems()
  })
  async function addItem() {
    const response = await axios.post("api/bucketListItems/", {
      description: description.value
    })
    items.value.push(response.data)
    description.value = ""
  }
  async function removeItem(item, i) {
    await axios.delete("api/bucketListItems/" + item._id)
    items.value.splice(i, 1)
  }
  function select(item) {
    selected.value = item
    editedDescription.value = item.description
  }
  function unselect() {
    selected.value = {}
    editedDescription.value = ""
  }
  async function updateItem(item, i) {
    const response = await axios.put("api/bucketListItems/" + item._id, {
      description: editedDescription.value
    })
    items.value[i] = response.data
    unselect()
  }
  const toggle = () => {
    var icon = document.getElementById('icon')
    if(document.body.classList.contains("light")){
      document.body.classList.remove("light")
      icon.setAttribute('class', 'bi bi-moon-fill')
    } else {
      document.body.classList.add("light")
      icon.setAttribute('class', 'bi bi-sun-fill')
    }
  }
</script>
<template>
  <Navbar  @toggle="toggle()"/>
  <div class="app">
    <div class="addItem">
        <input type="text" class="input" v-model="description" placeholder="Go to Mars..." />
        <button type="button" class="button" name="button" @click="addItem" :disabled="!description">
          <i class="bi bi-plus-lg" ></i>
        </button>
    </div>
    <div class="notes">
      <div class="items" v-for="(item, i) in items" :key="item._id">
        <p>
          <input type="text" v-if="item._id === selected._id" v-model="editedDescription" />
          <span v-else>
            <span class="number" id="number"> {{ i+1 }} </span>
            <span class="description"> {{ item.description }} </span>
          </span>
          <span class="icons">
            <span class="pencil" @click="item._id === selected._id ? unselect() : select(item)">
              <i id="pencil" :class="item._id != selected._id ? 'bi bi-pencil-fill' : 'bi bi-x-lg' "></i>
            </span>
            <span class="remote" @click="item._id === selected._id ? updateItem(item, i) : removeItem(item, i)">
              <i :class="item._id != selected._id ? 'bi bi-trash-fill' : 'bi bi-hdd-fill' "></i>
            </span>
          </span>
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import '../public/App.scss';
</style>
