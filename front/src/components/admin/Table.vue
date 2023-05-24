<template>
    <div>
        <div class="tables__list-wrapper">
            <h4>Edit & delete fields / Изменить или удалить поле</h4>
            <ul class="tables__list-wrapper__list">
                <li v-for="item in items" :key="item.id">
                    <div class="tables__list-wrapper__list_main">
                        <span>{{ item.name }}</span>
                        <AdminInput class="admin-input" v-model="name" />
                        <button :id="item.id" @click="editField($event, this.name, 'name')">Edit</button>
                        <button :id="item.id" @click="deleteField">Delete</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tables__new-item">
            <h4>Add new field / Добавить новое поле</h4>
            <AdminInput class="new-item-input" v-model="newField" />
            <button @click="addFieldToTable">Insert Field / Вставить Поле</button>
        </div>
        <div class="description" v-if="items.some(item => item.hasOwnProperty('description'))">
            <h4>Modify description (4 lines max.) / Изменить описание (4 строки макс.)</h4>
            <div class="descrSelect">
                <p>Choose category (or subcategory) / Выберите категорию (или субкатегорию)</p>
                <AdminSelect id="descr" :options="items" :name="descrSelect" v-model="descriptionCategoryId" :optionId=1 />
            </div>
            <Editor class="editor" v-model="description" editorStyle="height: 120px" aria-describedby="editor-error" />
            <button @click="editField($event, this.description, 'description')" :id="descriptionCategoryId">Edit description
                / Изменить описание</button>
        </div>
        <TableConfirm v-if="showConfirm" :confirmTable="confirmTable" :confirmField="confirmField" @closeConfirm="closeConfirmWindow"/>
    </div>
</template>

<script>
import axios from '../../axios';
import AdminInput from '@/components/UI/AdminInput.vue';
import AdminSelect from '@/components/admin/AdminSelect.vue';
import TableConfirm from '@/components/UI/TableConfirm.vue'
export default {
    components: {
        AdminInput,
        AdminSelect,
        TableConfirm
    },
    props: {
        type: String,
        dbTable: String
    },

    data() {
        return {
            items: [],
            name: '',
            newField: '',
            description: '',
            descriptionCategoryId: 0,
            showConfirm: false,
            confirmTable: '',
            confirmField: ''
        }
    },

    methods: {
        closeConfirmWindow() {
            this.showConfirm = false;
        },

        async getItems() {
            const { data } = await axios.get(`/${this.type}`)
            this.items = data
        },

        async editField(e, name, field) {
            console.log(e.currentTarget.id, name, field)
            const { data } = await axios.patch(`/admin/edittablefield/${this.dbTable}/${field}`, {
                text: name,
                id: e.currentTarget.id
            })
            console.log(data);
            this.name = ''
            if (data.Message.affectedRows) {
                this.confirmTable = this.dbTable;
                this.confirmField = field;
                this.showConfirm = true;                
            }
            await this.getItems()
        },

        async addFieldToTable() {
            const { data } = await axios.post(`/admin/addfield/${this.dbTable}`, {
                field: this.newField,
            })
            console.log(data)
            this.name = ''
            document.querySelector('.new-item-input').value = ''
            await this.getItems()
        },

        async deleteField(e) {
            console.log(e.currentTarget.id)
            const { data } = await axios.delete(`/admin/deletefield/${this.dbTable}/${e.currentTarget.id}`, {
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
        },
        descriptionCategoryId(current, old) {
            const arr = this.items.filter(item => {
                return item.id == current
            })
            this.description = arr[0].description
        },
        dbField() {
            this.descriptionCategoryId = 0
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
.tables__new-item h4,
.description h4 {
    margin: 1.5em 0 1em 0;
    font-size: 26px;
}

.tables__list-wrapper__list li {
    width: 47%;
    min-width: 320px;
    margin-bottom: 1em;
    border: 1px solid #141414;
    border-radius: 3px;
    padding: 1em;
}

.tables__list-wrapper__list_main {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 1em;
}

.tables__list-wrapper__list_main span {
    width: 25%;
    font-size: 16px;
    font-weight: 700;
    /* white-space:nowrap */
}

.tables__list-wrapper__list_descr span {
    width: 25%;
    font-size: 16px;
    text-decoration: underline;
}

.admin-input {
    margin-right: 1em;
    width: 40%;
}

.admin-input,
.new-item-input {
    padding: 0.2em 0.4em;
}

.admin-input:focus, .new-item-input:focus {
    outline: 2px solid rgba(160, 194, 233, 0.623);
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
    min-width: 15%;
}

.description {
    margin: 2em 0;
}

.descrSelect {
    margin-bottom: 1em;
}

.editor {
    font-size: 18px;
}
</style>