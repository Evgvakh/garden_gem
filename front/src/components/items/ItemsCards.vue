<template>
    <div class="container">
        <div class="items">
            <Item class="item" v-for="item in gems" :gem="item" />
        </div>
    </div>
</template>

<script>
import Item from './Item.vue';
export default {
    components: {
        Item
    },
    props: {
        gems: [],

    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>

.container {
    padding: 4em 3em 1em 5em;
    background-color: #77262bbb;
    /* background-color: #28272686; */
}
 .items {
    display: flex;
    width: 100%;
    height: fit-content;   
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
 
</style>