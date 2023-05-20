<template>
    <div class="admin-filter">
        <div class="checkbox-block cat-filter">
            <Checkbox 
                class="checkbox-block__item"
                v-for="cat in cats"
                :key="cat.id" 
                :label="cat.name"
                v-model="filterCats"
                @addCat="addCatToArray"
            />                    
        </div>
    </div>
    <div class="admin-items-list">
        <AdminGemsListItem v-for="item in filteredItems" :key="item.id" :gem="item" @editItem="editThisItem(item.id)" @deleteItem="deleteThisItem(item.id)"/>
    </div>
</template>

<script>
import AdminGemsListItem from '@/components/admin/AdminGemsListItem.vue';
import Checkbox from '@/components/UI/Checkbox.vue';

export default {
    components: {
        Checkbox, AdminGemsListItem
    },
    props: {
        items: Array       
    },
    data() {
        return {
            cats: [],
            filterCats: []
        }
    },
    methods: {
        editThisItem(id) {
            this.$emit('editItem', id)            
        },
        deleteThisItem(id) {
            this.$emit('deleteItem', id)            
        },
        getCats() {
            let arr = [];
            this.items.map((gem, i) => {
                let item = { id: gem.id_category, name: gem.category }
                if (!arr.some(cat => cat.id == item.id)) {
                arr.push(item);
                }
            });

            let newarr = arr.sort((cat1, cat2) => {
                return cat1.name.localeCompare(cat2.name);
            })
            this.cats = newarr;
        },
        addCatToArray(cat) {
            if (!this.filterCats.includes(cat)) {
                this.filterCats.push(cat);
            } else {
                this.filterCats.splice(this.filterCats.indexOf(cat), 1)
            }
        },
    },

    computed: {
        filteredItems() {
            if (this.filterCats.length > 0) {
                return this.items.filter(item => {
                    return this.filterCats.some(cat => item.category.includes(cat))
                })
            } else {
                return this.items
            }
        }
    },
    mounted() {
        this.getCats()
    }    
}
</script>

<style scoped>
 .admin-items-list {
    padding: 2em 1em;
 }

 .checkbox-block {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
 }

 .checkbox-block__item {
    margin-right: 2em;
 }
</style>