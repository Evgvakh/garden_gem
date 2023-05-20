<template>  
    <div>
        <span>{{ title }}</span>
        <font-awesome-icon icon="fa-solid fa-chevron-down" v-if="isChevron && isChevronUp" class="sidebar-chevron" @click.stop="changeChevron(true)"/>
        <font-awesome-icon icon="fa-solid fa-chevron-up" v-if="isChevron && !isChevronUp" class="sidebar-chevron" @click.stop="changeChevron(false)"/>
    </div>
  
</template>

<script>

export default {
  props: {
    title: '',
    isChevron: {
      type: Boolean
    },        
  },

  data() {
    return {
      isChevronUp: true  
    }
  },

  methods: {
    changeChevron(bool) {
      this.$emit('listPopup', bool)
      this.isChevronUp = !this.isChevronUp
    }
  }
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;0,900;1,400&display=swap');

  div {
    /* background-color:#ca564e3b; */
    /* -webkit-box-shadow: inset 0px 0px 35px -18px #000000; 
    box-shadow: inset 0px 0px 35px -18px #000000; */
    /* -webkit-box-shadow: inset 0px 0px 30px -28px #000000; 
    box-shadow: inset 0px 0px 30px -28px #000000; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em 0 3em; 
  }

  div:hover > span {
    text-shadow: 0px 0px 2px #00000025;
    /* color: rgba(255, 238, 189, 0.596);     */
  }

  span {    
    font-size: 24px;
    /* font-family: 'Crimson Pro', serif; */
    font-family: 'PT Serif', serif;    

    /* color: #ffffff; */
    color: #ffffff;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    font-weight: 500;       
    text-shadow: 1px 1px 3px #2b1504b9;    
  }

  .sidebar-chevron {
    color: #ffffff;
    font-size: 24px;
  }

  @media (max-width: 740px) {
      
      span {
        font-size: 24px;
      }
  }
</style>
