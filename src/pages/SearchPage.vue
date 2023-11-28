<script>
import { store } from "../data/store";
import axios from "axios";


export default {
    data(){
        return{
            store,
            searchField: '',
        }
    },

    methods: {

        postSearch(){

            if(
                !this.searchField
            )
            return
            const data = this.searchField
            axios.post(store.api.baseUrl + 'search', data)
            .then((response)=>{
                console.log(response);
            })
        }
        
    }
};
</script>

<template>
  <h4>Cerca qui la tua casa dei sogni!</h4>
  <form class="d-flex" role="search">
    <input
      class="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      v-model="searchField"
    />
    <button
    @click="postSearch()"
    class="btn btn-outline-success" 
    type="submit">Search</button>
  </form>
</template>

<style lang="scss" scoped>
h4 {
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
