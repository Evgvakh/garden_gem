<template>
    <div class="edit-tables__container">
        <div class="edit-tables__buttons-block">
            <button class="edit-table__button" @click="setTable($event, 'cats', 'categories')">Categories</button>
            <button class="edit-table__button" @click="setTable($event, 'subcats', 'subcategories')">Subategories</button>
            <button class="edit-table__button" @click="setTable($event, 'cuts', 'cut')">Cuts</button>
            <button class="edit-table__button" @click="setTable($event, 'colors', 'colors')">Colors</button>
            <button class="edit-table__button" @click="setTable($event, 'sets', 'sets')">Sets</button>
            <button class="edit-table__button" @click="setTable($event, 'origins', 'origin')">Origins</button>
            <button class="edit-table__button" @click="setTable($event, 'treatments', 'treatment')">Treatments</button>
            <button class="edit-table__button" @click="setTable($event, 'clarities', 'clarity')">Clarities</button>
        </div>
        <Table v-if="this.type !== ''" :type="type" :dbTable="field" />
    </div>
</template>

<script>
import Table from '@/components/admin/Table.vue';

export default {
    components: {
        Table
    },
    data() {
        return {
            type: '',
            field: 'categories'
        }
    },

    methods: {
        setTable(e, url, dbField) {
            this.type = url,
            this.field = dbField
            document.querySelectorAll('.edit-table__button').forEach(el => {
                if (el.classList.contains('button-active')) {
                    el.classList.remove('button-active')
                }
            })
            e.target.classList.add('button-active')
        },        
    }
}
</script>

<style scoped>
    .edit-tables__container {
        padding: 1em 2em 5em 2em;
    }

    .edit-tables__buttons-block {
        margin-bottom: 3em;
        font-size: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .edit-table__button {
        margin-bottom: 0.6em;
        border-radius: 5px;
        padding: 0.3em 1em;
        cursor: pointer;
    }

    .edit-table__button.button-active {
        -webkit-box-shadow: inset 0px 1px 31px -15px #000000; 
        box-shadow: inset 0px 1px 31px -15px #000000;
        font-weight: 700; 
    }
</style>