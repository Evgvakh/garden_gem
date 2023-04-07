<template>    
    <div class="items-container">        
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
        gems: {
            type: Array
        },
    },
}
</script>

<style scoped>

.items-container {    
    padding: 3em 1em 1em 1em;    
    background-color: #eee0e149;
    -webkit-box-shadow: inset 0px 11px 15px -12px #77262b49; 
    box-shadow: inset 0px 11px 15px -12px #77262b49;    
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