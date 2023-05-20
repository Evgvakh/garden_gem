<template>
    <div v-if="subCats.length > 0">
        <ul class="sublist">
            <li class="sublist-item" v-for="item in subCats" :id="idCat"><a @click="$router.push(`/gems/${idCat}/${item.id_subcat}`)">{{ item.subcat }}</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        idCat: {
            type: Number
        },
        gems: {
            type: Array
        },        
    },
    data() {
        return {            
            // subCats: [],
        }
    },

    methods: {        
        sendSubCatsListLength() {
            if(this.subCats.length > 0){this.$emit('subCatsSize', this.idCat)}
        }
    },

    computed: {
        subCats() {
            const subCatItems = this.gems.filter(gem => {
                return gem.id_category == this.idCat && gem.subcategory != 'none'
            })
            const subCatArray = []
            subCatItems.map(el => {
                subCatArray.push({                    
                    id_subcat: el.id_subcategory,
                    subcat: el.subcategory
                })
            })
            const oneMoreArray = [];
            subCatArray.map(el => {
                if (!oneMoreArray.some(elem => elem.id_subcat == el.id_subcat)) {
                    oneMoreArray.push(el)
                }
            })
            return oneMoreArray; 
        }
    },
    mounted() {
        this.sendSubCatsListLength()                
    }
}
</script>

<style scoped>
    ul {
        list-style: none;
    }

    .sublist {
        padding: 0;
    }

    .sublist-item {
        background-color: #12121221;
    }

    .sublist .sublist-item a {
        padding-left: 5em;
        text-transform: capitalize;
        font-size: 14px;
        display: block; width: 100%;
        cursor: pointer;
    }

    .sublist .sublist-item a:hover {
        background-color: rgba(255, 255, 255, 0.267);
    }

</style>