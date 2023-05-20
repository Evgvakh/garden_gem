<template>
    <div>
        <div class="tables__list-wrapper">
            <h4>Edit & delete fields / Изменить или удалить поле</h4>
            <ul class="tables__list-wrapper__list">
                <li v-for="item in items">
                    <span>{{ item.name }}</span>
                    <AdminInput class="admin-input" v-model="name" />
                    <button :id="item.id" @click="editField">Edit</button>
                    <button :id="item.id" @click="deleteField">Delete</button>
                </li>
            </ul>
        </div>
        <div class="tables__new-item">
            <h4>Add new field / Добавить новое поле</h4>
            <AdminInput class="new-item-input" v-model="newField" />
            <button @click="addFieldToTable">Insert Field / Вставить Поле</button>
        </div>
    </div>
</template>

<script>
import axios from '../../axios';
import AdminInput from '@/components/UI/AdminInput.vue';

export default {
    components: {
        AdminInput
    },
    props: {
        type: String,
        dbField: String        
    },

    data() {
        return {
            items: [],
            name: '',
            newField: ''
        }
    },

    methods: {
        async getItems() {
            const { data } = await axios.get(`/${this.type}`)
            this.items = data
        },

        async editField(e) {
            console.log(e.currentTarget.id, this.name)
            const { data } = await axios.patch(`/admin/edittablefield/${this.dbField}`, {
                name: this.name,
                id: e.currentTarget.id
            })
            console.log(data);
            this.name = ''
            document.querySelector('.admin-input').value = ''
            await this.getItems()
        },

        async addFieldToTable() {
            const { data } = await axios.post(`/admin/addfield/${this.dbField}`, {
                field: this.newField,                
            })
            console.log(data)
            this.name = ''
            document.querySelector('.new-item-input').value = ''
            await this.getItems()
        },

        async deleteField(e) {
            console.log(e.currentTarget.id)
            const { data } = await axios.delete(`/admin/deletefield/${this.dbField}/${e.currentTarget.id}`, {
                id: e.currentTarget.id
            })
            await this.getItems()
        }
    },

    async mounted() {
        await this.getItems();
    },

    watch: {
        type() {
            this.getItems()
        }
    }
}
</script>

<style scoped>
    .tables__list-wrapper__list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        margin-bottom: 2em;
    }

    .tables__list-wrapper h4,
    .tables__new-item h4 {
        margin: 0;
        margin-bottom: 1em;
        font-size: 26px;
    }

    .tables__list-wrapper__list li {
        width: 47%;
        display: flex;
        align-items: flex-start;
        min-width: 320px;
        margin-bottom: 1em;
    }
    .tables__list-wrapper__list li span {
        width: 25%;
        font-size: 16px;
        /* white-space:nowrap */
    }

    .admin-input {
        margin-right: 1em;
        width: 30%;
    }

    .tables__new-item {
        width: 100%;
    }

    .new-item-input {
        width: 40%;
        margin-right: 2em;
    }

    button {
        margin-right: 1em;
        border-radius: 6px;
        cursor: pointer;
    }
</style>