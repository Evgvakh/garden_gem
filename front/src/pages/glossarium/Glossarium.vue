<template>
    <Header placeholder="Find your gem by name" :isSearchNeeded="false" :isGloss="true" :category="'Glossarium'"/>
    <div class="gloss__content">   
        <GlossCatsList :cats="cats" :items="items"/>
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
.gloss__content {
    min-height: 100vh;
    background-image: url('http://localhost:8081/uploads/assets/360_F_214574177_KNrOwN0vfZoyCHe6Jhzjj3M8o5toy5u8.jpg');
    background-position: center center;
    background-size: cover;
    /* padding-top: 11vh; */
}
</style>