<template>
    <div>
        <form action="">
            <Select :options="cats" :title="'Category'" :name="'category'" v-model="id_category" />
            <Select :options="subcats" :title="'Subcategory'" :name="'subcategory'" v-model="id_subcategory" />
            <Select :options="colors" :title="'Color'" :name="'color'" v-model="id_color" />
            <Select :options="origins" :title="'Origin'" :name="'origin'" v-model="id_origin" />
            <Select :options="sets" :title="'Set'" :name="'set'" v-model="id_set" />
            <Select :options="cuts" :title="'Cut'" :name="'cut'" v-model="id_cut" />
            <Select :options="treatments" :title="'Treatment'" :name="'treatment'" v-model="id_treatment" />
            <Select :options="clarities" :title="'Clarity'" :name="'clarity'" v-model="id_clarity" />
            <Select :options="avails" :title="'Available'" :name="'available'" v-model="id_avail" />
        </form>
    </div>
</template>

<script>
import axios from '../../axios';
import Select from './Select.vue'

export default {
    components: {
        Select
    },
    data() {
        return {
            id_category: 0,
            cats: [],

            id_subcategory: 0,
            subcats: [],

            id_color: 0,
            colors: [],

            id_origin: 0,
            origins: [],

            id_set: 0,
            sets: [],

            id_cut: 0,
            cuts: [],

            id_treatment: 0,
            treatments: [],

            id_clarity: 0,
            clarities: [],

            id_avail: 0,
            avails: [],

            id_sale: 0,
            sales: []
        }
    },
    methods: {
        async getCats() {
            const { data } = await axios.get('/cats')
            this.cats = data;            
        },
        async getSubcats() {
            const { data } = await axios.get('/subcats')
            this.subcats = data;            
        },
        async getColors() {
            const { data } = await axios.get('/colors')
            this.colors = data;            
        },
        async getOrigins() {
            const { data } = await axios.get('/origins')
            this.origins = data;            
        },
        async getSets() {
            const { data } = await axios.get('/sets')
            this.sets = data;            
        },
        async getCuts() {
            const { data } = await axios.get('/cuts')
            this.cuts = data;            
        },
        async getTreatments() {
            const { data } = await axios.get('/treatments')
            this.treatments = data;            
        },
        async getClarities() {
            const { data } = await axios.get('/clarities')
            this.clarities = data;            
        },
        async getAvails() {
            const { data } = await axios.get('/avails')
            this.avails = data;            
        },
        async getSale() {
            const { data } = await axios.get('/sale')
            this.sales = data;            
        },
    },
    async mounted() {
        await this.getCats();
        await this.getSubcats();
        await this.getColors();   
        await this.getOrigins();  
        await this.getSets(); 
        await this.getCuts();
        await this.getTreatments();
        await this.getClarities(); 
        await this.getAvails();
        await this.getSale();         
    }
}
</script>

<style scoped></style>