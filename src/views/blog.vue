<template>
  <div class="">
    
    
    <div class="container mt-5">
    <div class="card mt-3" v-for="(blog,index) in blogs" :key="index" >
      <div class="card-header">
          {{blog.title}}
          <p>{{date()}}</p>
      </div>
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text">{{blog.addContent}}</p>
      <p >{{blog.author}} ({{blog.categories}})</p>

      <button class="btn btn-danger mt-3" @click="deletePost(blog.id)">Delete Post</button>
      <button class="btn btn-info ml-3 mt-3" @click="updatePost(blog.id)">Edit Post</button>
      

    </div>
</div>
</div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data(){
    return{
        blogs: []
    }
  },
  methods : {
    editPost(id){
            this.display = false;
            this.userData =id;
            this.postUpdate = this.blogs.indexOf(id);
        },
    updatePost(i){
            console.log(i)
            axios.put(`https://axios-kemzyblog.firebaseio.com/users/${i}.json`,this.userData).then(function(res){
                console.log(res)
            }, function(error){
                console.log(error)
            })
            this.reload()
        },
    reload(){
            var timeout = setTimeout("location.reload(true);", 6000);
            function resetTimeout(){
                clearTimeout(timeout);
                timeout = setTimeout("location.reload(true", 6000);
            }
        },
    deletePost(i){
      
        axios.delete(`https://axios-kemzyblog.firebaseio.com/users/${i}.json`)
          .then(function (res){
          console.log(res)
          this.getallBlogs()
        },
        function(error){
          console.log(error)
      })
     this.reload()
    },

    date(){
          let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            //  return (new Date().getDate())
            let day = days[new Date().getDay()]
            let m = months[new Date().getMonth()]
            return (new Date().getDate()) + " " +  day  + " " + m + " "+ (new Date().getFullYear()) + " " + (new Date().getHours()) + ":"+ (new Date().getMinutes()) 
      },
  },

  created(){
      axios.get('https://axios-kemzyblog.firebaseio.com/users.json')
      .then( res=>{
        const data = res.data;
        for (let key in data){
          const post = data[key]
          post.id = key
          this .blogs.unshift(post)
        }
      }).catch(error => {
        console.log(error)
      });

      
    }
    
}
</script>