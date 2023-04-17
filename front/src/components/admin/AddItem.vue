<template>
    <div>
        <form>
            <div class="selects">
                <div class="select-group">
                    <label for="cats">Category</label>
                    <Select id="cats" :options="cats" :title="'Category'" :name="'category'" v-model="id_category" />
                </div>
                <div class="select-group">
                    <label for="subcats">Subcategory</label>
                    <Select id="subcats" :options="subcats" :title="'Subcategory'" :name="'subcategory'" v-model="id_subcategory" />
                </div>
                <div class="select-group">
                    <label for="colors">Color</label>
                    <Select id="colors" :options="colors" :title="'Color'" :name="'color'" v-model="id_color" />
                </div>
                <div class="select-group">
                    <label for="origins">Origin</label>
                    <Select id="origins" :options="origins" :title="'Origin'" :name="'origin'" v-model="id_origin" />
                </div>
                <div class="select-group">
                    <label for="sets">Set</label>
                    <Select id="sets" :options="sets" :title="'Set'" :name="'set'" v-model="id_set" />
                </div>
                <div class="select-group">
                    <label for="cuts">Cut</label>
                    <Select id="cuts" :options="cuts" :title="'Cut'" :name="'cut'" v-model="id_cut" />
                </div>
                <div class="select-group">
                    <label for="treatmts">Treatment</label>
                    <Select id="treatmts" :options="treatments" :title="'Treatment'" :name="'treatment'" v-model="id_treatment" />
                </div>
                <div class="select-group">
                    <label for="clars">Clarity</label>
                    <Select id="clars" :options="clarities" :title="'Clarity'" :name="'clarity'" v-model="id_clarity" />
                </div>
                <div class="select-group">
                    <label for="avails">Available</label>
                    <Select id="avails" :options="avails" :title="'Available'" :name="'available'" v-model="id_avail" />
                </div>
                <div class="select-group">
                    <label for="sales">Sale?</label>
                    <Select id="sales" :options="sales" :title="'Sale'" :name="'sale'" v-model="id_sale" />
                </div>
            </div>
            <button @click.prevent="handleForm">Add item</button>
        </form>
        <div v-for="n in imgUploadersNmbr" key="n">            
                <q-file filled bottom-slots v-model="imgToUpload" multiple append label="Label" counter>
                    <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                    </template>
                    <template v-slot:append>
                    <q-icon name="close" @click.stop.prevent="imgToUpload = null" class="cursor-pointer" />
                    </template>
                    <template v-slot:hint>
                    Field hint
                    </template>
                </q-file>
                <button @click.prevent="imgTest">ADD IMAGES</button>            
        </div>       
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
            sales: [],

            imgUploadersNmbr: 1,
            imgToUpload: []
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
            const { data } = await axios.get('/sales')
            this.sales = data;            
        },

        async handleForm() {
            const res = await axios.post('/admin/add', {
                name: 'sadasdsadas',
                cat: this.id_category,
                subcat: this.id_subcategory,
                color: this.id_color,
                origin: this.id_origin,
                set: this.id_set,
                cut: this.id_cut,
                treatment: this.id_treatment,
                clarity: this.id_clarity,
                avail: this.id_avail,
                sale: this.id_sale
            }
                , { 
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            const item_id = res.data.Message 
            const formData = new FormData();
            this.imgToUpload.forEach(img => {
                formData.append("img", img);
            })  
            const headers = {
                "Content-Type": "multipart/form-data",
            };
            const { data: imgData } = await axios.post("/upload/img", formData, headers);
            console.log(imgData)
            const {data: imgURL} = await axios.post("/admin/addImgs")
        },

        async imgTest() {
            const formData = new FormData();
            this.imgToUpload.forEach(img => {
                formData.append("img", img);
            })  
            const headers = {
                "Content-Type": "multipart/form-data",
            };
            const { data } = await axios.post("/upload/img", formData, headers);
            console.log(data)
        }
        
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

<style scoped>
    .selects {
        display: flex;
        flex-wrap: wrap;
    }

    .select-group {
        width: 50%;
        display: flex;
        margin-bottom: 1em;
    }

    .select-group label {
        min-width: 20%;
    }
</style>