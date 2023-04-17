<template>
  <div class="app">
    <div v-if="width <= 1100 && !isSidebarVisible && this.$route.path != '/admin'" class="burger" style="position: fixed; top: 0; left: 0; z-index: 200;" >
      <font-awesome-icon class="burger-icon" icon="fa-solid fa-bars" @click="changeSidebarStyle"/>
    </div>
    <Sidebar v-if="width > 1100 && this.$route.path != '/admin'" class="sidebar" :gems="this.gems" @newcat="categoryChange" />
    <SidebarMobile v-if="isSidebarVisible && width <= 1100" class="sidebar-mobile" :gems="this.gems" @newcat="categoryChange" @setVisibility="changeSidebarStyle" />
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
      cats: [],
      categoryToShow: 0,
      width: 0,
      isSidebarVisible: false
    }
  },

  provide() {
    let cats = {}
    Object.defineProperty(cats, 'type', { enumerable: true, get: () => this.cats })
    return { cats }
  },

  methods: {
    async uploadFile() {
      
    },

    async fetchItems() {
      const { data } = await axios.get('/gems')
      this.gems = data;
    },

    categoryChange(id) {
      this.categoryToShow = id;
    },

    updateWidth() {
      this.width = window.innerWidth;
    },

    getCats() {
      this.gems.map((gem, i) => {
        let item = { id: gem.id_category, name: gem.category }
        if (!this.cats.some(cat => cat.id == item.id)) {
          this.cats.push(item);
        }
      });

      let newarr = this.cats.sort((cat1, cat2) => {
        return cat1.name.localeCompare(cat2.name);
      })
      this.cats = newarr;      
    },

    changeSidebarStyle() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  },

  async mounted() {
    await this.fetchItems();
    this.getCats();
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
  width: 20%;
  position: fixed;
}

.sidebar-mobile {
  width: 60%;
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
  width: 7px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  width: 8px;
  background-color: #563838;
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
</style>
