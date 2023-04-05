<template>
    <Header v-model="searchQuery" placeholder="Search your gem here" />
    <div class="container">
        <ItemsCards v-if="this.searchedGems.length > 0" :gems="this.searchedGems" />
    </div>
</template>

<script>
import axios from "@/axios";
import Header from "@/components/header/Header.vue";
import ItemsCards from "@/components/items/ItemsCards.vue";

export default {
    components: {
        Header,
        ItemsCards
    },
    data() {
        return {            
            gems: [],
            isLoading: false,
            limit: 20,
            offset: 0,
            categoryNumber: 0,
            searchQuery: "",
            priceQuery: {
                min: 0,
                max: 1000000
            }
        };
    },
    methods: {
        async fetchItems() {
            this.isLoading = true;
            const { data } = await axios.get(`/gems/${this.categoryNumber}`);
            this.gems = data;
            console.log(this.gems);
            this.isLoading = false;
        },

        setCategoryNumber() {
            this.categoryNumber = this.$route.params.id
        }
    },

    mounted() {
        this.setCategoryNumber();
        this.fetchItems();
    },

    computed: {
        searchedGems() {
            return this.gems.filter((gem) =>
                gem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        // searchedAnFilteredGems() {
        //     return this.searchedGems.filter((gem) => {
        //         return gem.price >= this.priceQuery.minPrice && gem.price <= this.priceQuery.maxPrice 
        //     })
        // }
    },

    watch: {
        async "$route.params.id"() {
            this.categoryNumber = this.$route.params.id;
            await this.fetchItems();
        },
    },
};
</script>

<style scoped>
.container {
    margin-top: 10vh;
}
</style>
