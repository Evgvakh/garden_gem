<template>
  <div class="app">
    <Sidebar v-if="width > 1100" class="sidebar" @newcat="categoryChange" />
    <div :class="[width > 1100 && width != 0 ? 'router' : 'router_resize']">
      <router-view :categoryChosen="categoryToShow"></router-view>
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
      gems: [],
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
      console.log(this.cats);
    },
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
  width: 17%;
  position: fixed;
}

.router {
  margin-left: 17%;
  width: 83%;
  height: 100vh;
  overflow-y: auto;
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
</style>
