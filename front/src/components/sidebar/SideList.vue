<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in cats.type" key={{item.id}} >
        <a :id=item.id @click.prevent="clickHandler(item.id)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ["cats"],

  methods: {
    clickHandler(item) {
      this.$router.push(`/gems/${item}`);      
    }
  }
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

ul li {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  color: #ffffff;
  letter-spacing: 1.1px;
  font-weight: 500;
  line-height: 2em;
  padding-left: 3em;
}

ul li:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.095);
}

ul li a {
  cursor: pointer;
  text-transform: capitalize;
}

ul li:hover {
  background-color: rgba(255, 255, 255, 0.185);
}

ul li a:hover {
  letter-spacing: 0.3px;
}</style>
