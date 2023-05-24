<template>
    <Header placeholder="Find your gem by name" :isSearchNeeded="false" :isGloss="true" :category="'Glossarium'" />
    <div class="gloss__header">
        <GlossCatsList :cats="cats" :items="items" />
    </div>
</template>

<script>
import axios from '../../axios';
import GlossCatsList from '@/components/glossarium/GlossCatsList.vue';
import Header from '@/components/header/Header.vue';

export default {

    components: {
        GlossCatsList,
        Header
    },

    data() {
        return {
            items: [],
            cats: [],
        }
    },
    methods: {
        async getItems() {
            const { data } = await axios.get('/gloss')
            this.items = data;
        },
        getCats() {
            let arr = [];
            arr = this.items.map(item => {
                return item.category
            })
            let newArr = arr.reduce(function (accumulator, currentValue) {
                if (accumulator.indexOf(currentValue) === -1) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
            this.cats = newArr
        }
    },

    async mounted() {
        await this.getItems();
        this.getCats();
    }
}

</script>

<style scoped>
.gloss__header {}
</style>