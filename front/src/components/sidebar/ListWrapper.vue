<template>
  <div>
    <div>
        <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: ''    
  }
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  div {
    background-color:#ca564e3b;
    -webkit-box-shadow: inset 0px 0px 35px -18px #000000; 
    box-shadow: inset 0px 0px 35px -18px #000000;
  }

  span {
    padding-left: 2em;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    font-weight: 700;
    font-family: 'PT Serif', serif;
  }
</style>
