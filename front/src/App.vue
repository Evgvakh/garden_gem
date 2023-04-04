<template>
  <div class="app">
    <Sidebar v-if="width > 1100" class="sidebar" @newcat="categoryChange" />
    <div :class="[width > 1100 && width != 0 ? 'router' : 'router_resize']">
      <router-view  :categoryChosen="categoryToShow"></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import axios from "./axios";

export default {
  components: {
    Sidebar,
  },

  data() {
    return {
      cats: [],
      categoryToShow: 0,
      width: 0
    }
  },

  provide() {
    let cats = {}   
    Object.defineProperty(cats, 'type', { enumerable: true, get: () => this.cats })
    return { cats }   
  },

  methods: {
    async uploadFile() {
      const formData = new FormData();
      formData.append("img", this.file);
      console.log(this.file);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const { data } = await axios.post("/upload", formData);      
    },

    async fetchCats() {
      const { data } = await axios.get('/cats')      
      this.cats = data;      
    },

    categoryChange(id) {
      this.categoryToShow = id; 
      console.log(id)
    },

    updateWidth() {
      this.width = window.innerWidth;
  },
  },

  mounted() {
    this.fetchCats()
    
  },

  created() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth()    
  }
};
</script>

<style>
.app {
  display: flex;
  height: 100vh;    
}

.sidebar {
  width: 17%;
  position: fixed;
}

.router {
  margin-left: 17%;
  width: 83%;
  height: 100vh;
  overflow-y: scroll;   
}
</style>
