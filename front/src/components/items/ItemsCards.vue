<template>    
    <div class="container">        
        <div class="items">
            <Item class="item" v-for="item in gems" :gem="item" />
        </div>
    </div>
</template>

<script>
import Item from './Item.vue';
import Filter from '@/components/UI/Filter.vue'
export default {
    components: {
        Item,
        Filter
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
    -webkit-box-shadow: 0px -3px 13px -4px #000000; 
    box-shadow: 0px -3px 13px -4px #000000;
    /* background-color: #28272686; */
}
 .items {
    display: flex;
    width: 100%;
    height: fit-content;   
    flex-wrap: wrap;
    justify-content:space-evenly;
    align-items: center;
}
 
</style>