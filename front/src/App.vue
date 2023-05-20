<template>
  <div class="app">
    <div v-if="width <= 1100 && !isSidebarVisible && this.$route.path != '/admin'" class="burger" style="position: fixed; top: 0; left: 0; z-index: 200;" >
      <font-awesome-icon class="burger-icon" icon="fa-solid fa-bars" @click="changeSidebarStyle"/>
    </div>
    <Sidebar 
      v-if="width > 1100 && this.$route.path != '/admin'" 
      class="sidebar" 
      :gems="this.gems" 
      @newcat="categoryChange" 
      :lang="lang"
      @changeLang="langChange" 
      :cats="categories"
    />
    <SidebarMobile 
      v-if="isSidebarVisible && width <= 1100" 
      class="sidebar-mobile" 
      :gems="this.gems"
      @newcat="categoryChange" 
      :lang="lang" 
      @changeLang="langChange" 
      :cats="categories" 
      @setVisibility="changeSidebarStyle" 
    />
    <div :class="[width > 1100 && width != 0 && this.$route.path != '/admin' ? 'router' : 'router_resize']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import SidebarMobile from "./components/sidebar/SidebarMobile.vue";
import axios from "./axios";

export default {
  components: {
    Sidebar,
    SidebarMobile
  },

  data() {
    return {
      gems: [],      
      categoryToShow: 0,
      width: 0,
      isSidebarVisible: false,
      lang: 'en'
    }
  },

  methods: {
    async fetchItems() {
      let gems = []
      if (this.lang === 'en') {
        const { data } = await axios.get('/gems')
        gems = data
      } else {
        const { data } = await axios.get('/ru/gems')
        gems = data
      }
      this.gems = gems.filter(gem => {
        return gem.availability === 'yes'
      });
    },

    categoryChange(id) {
      this.categoryToShow = id;
    },

    updateWidth() {
      this.width = window.innerWidth;
    },

    changeSidebarStyle() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },

    async langChange(lang) {
      this.lang = lang
    },
    setLangFromStorage() {
      if (localStorage.getItem('gemGardenLang')) {
        this.lang = localStorage.getItem('gemGardenLang');
      }
    }
  },

  async mounted() {
    await this.fetchItems();    
    console.log(process.env)
  },

  computed: {
    categories() {
      let arr = [];
      this.gems.map((gem, i) => {
        let item = { id: gem.id_category, name: gem.category }
        if (!arr.some(cat => cat.id == item.id)) {
          arr.push(item);
        }
      });

      let newarr = arr.sort((cat1, cat2) => {
        return cat1.name.localeCompare(cat2.name);
      })
      return newarr;
    }
  },
  

  watch: {
    async lang() {
      await this.fetchItems();      
    }
  },

  created() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth()
    this.setLangFromStorage()
  }
};
</script>

<style>
.app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 20%;
  position: fixed;
}

.sidebar-mobile {
  width: 55%;
  z-index: 300;
}

.router {
  margin-left: 20%;
  width: 80%;
  height: 100vh;
  overflow-y: auto;
}

.router_resize {
  width: 100%;
  margin: 0;
}

::-webkit-scrollbar {
  width: 6px;
  height: 30px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  width: 6px;  
  background: rgb(163,211,111);
    background: linear-gradient(180deg, rgba(163,211,111,0.8799894957983193) 0%, rgba(73,153,156,1) 55%);
  border-radius: 3px;
  box-shadow: 1px 1px 10px #f3faf7;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #563838a1;
}

.burger {
  width: 12%; height: 8vh;
  padding: 2% 8%;
  display: flex;
  justify-content: center; align-items: center;
}

.burger-icon {
  color: white;
  font-size: 32px;
  line-height: 1em;
  cursor: pointer;
}

@media (max-width: 450px) {
  .burger-icon {
    font-size: 26px;
  }
  .sidebar-mobile {
    width: 65%;    
  }
}
</style>
