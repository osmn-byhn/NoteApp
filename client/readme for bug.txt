<template>
  <div id="app">
    <ul>
      <li v-for="post of posts">
        <p>{{ post.title }}</p>
        <p>{{ post.body }}</p>
        <button  @click="deleteData(post._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return{
      posts: [],
    }
  },

    created(){
      axios.get('http://jsonplaceholder.typicode.com/posts').then(response => {
        this.posts = response.data
      })
    },
    methods: {
        deleteData(_id) {
          axios.delete('http://jsonplaceholder.typicode.com/posts/' + id)
                    .then(response => {
                      console.log('delete')
                        this.posts.splice(
                          this.posts.findIndex(e => e.id === id)
                        )
                      })
                    .catch(function(error) {
                        console.log(error)
                    })
                  },
                }
              }
</script>
