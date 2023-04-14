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

  div {
    background-color:#ca564e3b;
    -webkit-box-shadow: inset 0px 0px 35px -18px #000000; 
    box-shadow: inset 0px 0px 35px -18px #000000;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em 0 3em;
  }

  span {    
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'PT Serif', serif;
  }

  .sidebar-chevron {
    color: #ffffff;
    font-size: 24px;
  }
</style>
