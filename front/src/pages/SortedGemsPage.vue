<template>
    
</template>

<script>
import axios from '@/axios';

export default {    
    
    data() {
            return {
                items: [],
                gems: [],
                isLoading: false,                
                limit: 20,
                offset: 0
         }   
    },
    methods: {        
        async fetchCarouselItems() {
            this.isLoading = true;
            const { data } = await axios.get('/gemscarousel');
            this.items = data;
            console.log(this.items)
            this.isLoading = false;
        },

        async fetchItems(id_cat) {
            this.isLoading = true;
            const { data } = await axios.get(`/gems/${id_cat}`);
            this.gems = data;
            console.log(this.gems)
            this.isLoading = false;
        },
    },

    async mounted() {
        // await this.fetchCarouselItems()
        // await this.fetchItems(this.category);                    
    },

    computed: {
        
    },

    watch: {
        
    }
}


</script>

<style scoped>
    h4 a:hover {
        font-weight: 500;
    }
</style>