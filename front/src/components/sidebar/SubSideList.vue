<template>
    <div v-if="subCats.length > 0">
        <ul class="sublist">
            <li class="sublist-item" v-for="item in subCats" :id="idCat"><a >{{ item.subcat }}</a></li>
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
        }
    },
    data() {
        return {            
            subCats: [],
        }
    },

    methods: {
        getSubCatsList() {
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
            this.subCats = oneMoreArray;                                  
        },
        sendSubCatsListLength() {
            if(this.subCats.length > 0){this.$emit('subCatsSize', this.idCat)}
        }
    },
    mounted() {        
        this.getSubCatsList()
        this.sendSubCatsListLength()                
    }
}
</script>

<style scoped>
    ul {
        list-style: none;
    }

    .sublist {

    }

    .sublist .sublist-item a {
        padding-left: 2em;
        text-transform: capitalize;
    }

</style>