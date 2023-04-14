<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in cats.type" key={{item.id}} >
        <a :id=item.id @click.prevent="clickHandler(item.id)">
          {{ item.name }}
          <font-awesome-icon icon="fa-solid fa-chevron-down" 
            v-if="!visibleSublists.some(el => el == item.id) && subcatsExistingArr.some(el => el == item.id)" 
            class="sidelist-chevron" 
            @click.stop="sublistChevronDown(item.id)"
          />
          <font-awesome-icon icon="fa-solid fa-chevron-up" 
            v-if="visibleSublists.some(el => el == item.id)" 
            class="sidelist-chevron" 
            @click.stop="sublistChevronUp(item.id)"
          />
        </a>
        <SubSideList class="sublist-wrapper"          
          :idCat="item.id" 
          :gems="this.gems" 
          :id="`sublist_${item.id}`"
          @subCatsSize="setSubcatsToShow"          
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SubSideList from './SubSideList.vue';
export default {
  inject: ["cats"],

  props: {
    gems: {
      type: Array
    }
  },

  data() {
    return {      
      visibleSublists: [],
      subCatsNumber: 1000,
      subcatsExistingArr: []
    }
  },

  components: {
    SubSideList
  },

  methods: {
    clickHandler(item) {
      this.$router.push(`/gems/${item}`);
      this.$emit('hideMobileSidebar')      
    },    
    sublistChevronDown(id) {      
      this.visibleSublists.push(id)
      if (document.querySelector(`#sublist_${id}`) !== null){document.querySelector(`#sublist_${id}`).style.display = 'block'}
    },
    sublistChevronUp(id) {      
      this.visibleSublists.splice(this.visibleSublists.indexOf(id), 1)
      if (document.querySelector(`#sublist_${id}`) !== null){document.querySelector(`#sublist_${id}`).style.display = 'none'}
    },
    setSubcatsToShow(obj) {
      this.subcatsExistingArr.push(obj)      
    }    
  },

  
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

div {
  background-color: #563838d0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;  
}

ul .list-item {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #ffffff;
  letter-spacing: 1.1px;
  font-weight: 500;
  line-height: 2em;
  padding: 0.2em 0;
}

ul .list-item:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.095);
}

ul .list-item a {
  padding-left: 3em;
  padding-right: 1em;
  cursor: pointer;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

ul .list-item:hover {
  background-color: rgba(255, 255, 255, 0.185);
}

ul .list-item a:hover {
  letter-spacing: 0.3px; 
}

.sidelist-chevron {
  font-size: 14px;
}
 
.sublist-wrapper {
  display: none;
}
</style>
