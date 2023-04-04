<template>
    <div class="container">
        <Header :gems="gems" v-model="searchQuery" placeholder="Find your gem by name" />
        <div class="recently_added">
            <ProgressSpinner v-if="isLoading" style="width: 150px; height: 150px; position: fixed; top:50%; left: 55%"
                strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            <h3>Recently added</h3>
            <Carousel v-if="!isLoading" :value="items" :numVisible="5" :numScroll="1" :responsiveOptions="responsiveOptions"
                circular :autoplayInterval="3000">
                <template #item="slotProps" class="">
                    <div class="item m-2 text-center py-5 px-3">
                        <div class="mb-1">
                            <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                                :alt="slotProps.data.name" class="w-4 shadow-2" />
                        </div>
                        <div>
                            <h4 class=""><a style="cursor: pointer;"
                                    @click="$router.push(`/collection/${slotProps.data.id}`)">{{
                                        slotProps.data.name.toUpperCase() }}</a></h4>
                            <div class="price_weight">
                                <h6 class="mt-0 mb-1">${{ slotProps.data.price }}</h6>
                                <h6 class="weight">{{ slotProps.data.weight }} ct.</h6>
                            </div>
                            <div class="mt-2">
                                <p>{{ slotProps.data.description }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>
    <div class="cats">
        <button class="cat_button" v-for="cat in cats" @click="$router.push(`/gems/${cat.id}`)"> {{ cat.name }}</button>
    </div>
    <ItemsCards v-if="!isLoading && this.sortedAndSearchedPosts.length > 0"  :gems="this.sortedAndSearchedPosts" />
    <div v-else class="search_failed">
        <h3>The search has not given any results</h3>
    </div>
</template>

<script>
import axios from '@/axios';
import ItemsCards from '@/components/items/ItemsCards.vue'
import Header from '@/components/header/Header.vue';


export default {
    components: {
        ItemsCards,
        Header
    },

    data() {
        return {
            items: [],
            gems: [],
            cats: [],
            isLoading: false,
            limit: 20,
            offset: 0,
            searchQuery: "",
            responsiveOptions: [
                {
                    breakpoint: '1524px',
                    numVisible: 4,
                    numScroll: 1
                },
                {
                    breakpoint: '1230px',
                    numVisible: 3,
                    numScroll: 1
                },
                {
                    breakpoint: '480px',
                    numVisible: 1,
                    numScroll: 1
                }
            ]
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

        async fetchItems() {
            this.isLoading = true;
            const { data } = await axios.post(`/gems`, { params: { limit: this.limit, offset: this.offset } });
            this.gems = data;
            console.log(this.gems)
            this.isLoading = false;
        },

        async fetchCats() {
            this.isLoading = true;
            const { data } = await axios.get(`/cats`);
            this.cats = data;
            console.log(this.cats)
            this.isLoading = false;
        },
    },

    async mounted() {
        await this.fetchCarouselItems()
        await this.fetchItems();
        await this.fetchCats();
    },

    computed: {
        sortedAndSearchedPosts() {
            return this.gems.filter((gem) =>
                gem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },

    watch: {
        // category() {
        //     console.log(this.category);
        // }
    }
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {}

h3 {
    line-height: 1em;
    margin: 0;
    padding: 0;
    font-family: 'PT Serif', serif;
    color: white;
}

h4 a {
    font-family: 'PT Serif', serif;
    font-size: 22px;
}

h4 a:hover {
    font-weight: 500;
}

h4,
h6,
p {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    color: white;
}

.container {
    margin: 0 auto;
}

.recently_added {
    /* background-color: #563838d0; */
    background-color: rgb(253, 253, 253);
    margin-top: 10vh;
}

.item {
    padding: 0;
    margin: 0 2em;
    background-color: #77262bbb;
    height: 200px;
}

.price_weight {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin: 0 auto;
}

.cats {
    padding: 2em;
    margin: 2em 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.cat_button {
    background-color: transparent;
    border: 1px solid #77262bbb;
    color: #77262bbb;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 16px;
    width: 15%;
    margin-right: 2em;
    padding: 0.3em;
    cursor: pointer;
    transition: all .2s ease-in;
}

.cat_button:hover {
    background-color: #77262bbb;
    border: none;
    color: white;
    border-radius: 7px;    
}

.weight {}

.search_failed {

}
</style>