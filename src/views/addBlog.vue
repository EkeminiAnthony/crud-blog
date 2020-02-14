<template>
  <div>
    <div class="container">
      <center>
      <div class="col-sm-6" >
       
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

                    <button type="submit" class="btn btn-dark" @click.prevent="onSubmit">Add New Post</button>  
                    </form>                

                
          </div>     
          </center>   
      </div>
    </div>
  
</template>

<script>
 import axios from 'axios'
 import sweetalert from 'sweetalert'
  export default {
    data() {
      return {
        userData : { 
        title: '',
        categories: "",
        addContent: '',
        author: '',
      
        }
       
      }
    },
    methods :{
      onSubmit(){
         axios.post('https://axios-kemzyblog.firebaseio.com/users.json', this.userData)
        .then(function(res){
          console.log(res)
        }).catch(function(error){
          console.log(error)
        })
        swal("", "Post Has been added!", "success");
        this.userData = { 
            title: '',
            categories: "",
            addContent: '',
            author: '',
          }
        }

      }
    }



</script>

