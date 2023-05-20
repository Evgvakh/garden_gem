<template>
    <Pagination v-if="gems.length > 5" :pages="totalPages" @setPage="setCurrentPage" @setItemsNumber="setItemsPerPage" :currentPage="this.page" :itemsNumber="gems.length" :isTop="true"/>
    <div class="items-container">
        <div class="items">
            <Item class="item" v-for="item in gems.slice(startIndex, startIndex + itemsPerPage)" :gem="item" :key="item.id"/>
        </div>
    </div>
    <Pagination v-if="gems.length > 5" :pages="totalPages" @setPage="setCurrentPage" @setItemsNumber="setItemsPerPage" :currentPage="this.page" :itemsNumber="gems.length" :isTop="false"/>
</template>

<script>
import Pagination from '@/components/UI/Pagination.vue';
import Item from '@/components/items/Item.vue';

export default {
    components: {
        Item,
        Pagination
    },

    props: {
        gems: {
            type: Array
        },
    },

    data() {
        return {
            page: 0,            
            itemsPerPage: 24,
        }
    },

    methods: {
        setCurrentPage(page) {
            this.page = page;
        },

        setItemsPerPage(number) {
            this.itemsPerPage = number
            this.page = 0
        }
    },

    computed: {
        startIndex() {
            return this.page * this.itemsPerPage
        },
        totalPages() {
            return Math.ceil(this.gems.length / this.itemsPerPage)
        }
    },
    
   
}
</script>

<style scoped>
.items-container {
    padding: 0.8em 1em 1em 1em;
    /* background-color: rgba(76, 178, 182, 0.1); */
    background: rgb(163,211,111);
    background: linear-gradient(84deg, rgba(163, 211, 111, 0.123) 0%, rgba(73, 153, 156, 0.13) 55%);
    -webkit-box-shadow: inset 0px 11px 15px -12px #77262b49;
    box-shadow: inset 0px 11px 15px -12px #77262b49;
}

.items {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}

@media (max-width: 570px) {
    .items-container {
        padding: 2em 0em 1em 0em;
    }
}
</style>