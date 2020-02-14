<template>
  <div class="">
    <div v-if="!display">
      <div class="container">
        <div class="card col-sm-5 mt-5 ml-auto mr-auto mb-5 p-4">
          <form>
          <div class="form-group" col-md-4>
              <label>Title</label>
              <input type="text"  class="form-control" v-model="userData.title">    
          </div>

          <div class="form-group">
              <label>Categories</label>
              <select class="form-control" v-model="userData.categories"> 
              <option value="Pick Your Choice"></option>  
              <option value="education">Education</option>
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
              <option value="politics">Politics</option>
              <option value="hot-picks">Hot Picks</option> 

            </select>

          </div>

          <div class="form-group">
              <label>Add Content</label>
              <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="userData.addContent"></textarea>
          </div>

          <div class="form-group">
              <label>Author</label>
              <input type="text"  class="form-control" v-model="userData.author">    
          </div>  

          <button type="submit" class="btn btn-dark" @click.prevent="updatePost(userData.id)">Update post</button>  
        </form> 
        </div>
      </div>
    </div>
    
    <div class="container mt-5" v-if="display">
      <div class="card mt-3" v-for="(blog,index) in blogs" :key="index" >
        <div>
          <div class="card-header">
            <b>{{blog.title}}</b>
            <p>{{date()}}</p>
          </div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">{{blog.addContent}}</p>
            <p >{{blog.author}} ({{blog.categories}})</p>

            <button class="btn btn-danger mt-3" @click="deletePost(blog.id)">Delete Post</button>
            <button class="btn btn-info ml-3 mt-3" @click.prevent="editPost(blog)">Edit Post</button>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>


<script>
import axios from 'axios'
import sweetalert from 'sweetalert'
export default {
  data(){
    return{
        blogs: [],
        display: true,
        userData : { 
        title: '',
        categories: "",
        addContent: '',
        author: '',
      
        }
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
            this.userData = { 
              title: '',
              categories: "",
              addContent: '',
              author: '',
            }
            this.reload()
            this.display = true;
            swal("", "Your Post Has been Updated!", "success");
        },
    reload(){
            var timeout = setTimeout("location.reload(true);", 5000);
            function resetTimeout(){
                clearTimeout(timeout);
                timeout = setTimeout("location.reload(true", 5000);
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
     swal("", "You deleted this Post", "success");
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