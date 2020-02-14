<template>
    <div>

        <header id="header">
            <div class="logo">
                <h3>Kemzy Pixels Blog</h3>
            </div>
    
            <nav>
            <ul>
                <!-- <li>
                <router-link to="/home">Home</router-link>
                </li> -->
                <li>
                <router-link to="/blog">Blog</router-link>
                </li>
                <li>
                <router-link to="/addBlog">Add Blog</router-link>
                </li>
            </ul>
            </nav>
         </header>

    </div>    
</template>


<script>

import axios from 'axios'
export default {
  data(){
    return {
      users :[]
    }

  },
  created (){
    axios.get('https://axios-kemzy.firebaseio.com/users.json')
    .then(function(res){
      console.log(res)
      const data = res.data
      const users = [];
      for (let key in data){
          const user = data[key];
          user.id = key;
          this.users.push(user);
          console.log(this.users)
      } 
    }).catch(function(error){
      console.log(error)
    })
  }
}
</script>

<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>