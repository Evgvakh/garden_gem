<template>
    <div class="admin__main">
        <div class="admin__main-wrapper">
            <div class="admin-header">
                <div class="admin-header__wrapper">
                    <button class="header-button" @click.prevent="clickHandler($event, 'add')">Add new item</button>
                    <button class="header-button" @click.prevent="clickHandler($event, 'list')">Edit / Delete item</button>
                    <button class="header-button" @click.prevent="clickHandler($event, 'editTables')">Add / Edit / Delete fields</button>
                </div>                
            </div>
            <div >
                <AddItem v-if="menuToShow === 'add'" :menuType="'add'"/>
                <AddItem :gem="this.gem" :menuType="'edit'" v-if="menuToShow === 'edit'" @confirmEdit="confirmFieldUpdate" @afterDeleteImage="testHandler(id)" :fieldType="type"/>
                <ItemsList v-if="menuToShow === 'list'" :items="gems" @editItem="getGem" @deleteItem="handleDelete"/>
                <EditTables v-if="menuToShow === 'editTables'"/>
            </div>
        </div>
    </div>
    <EditConfirm v-if="confirmWindow" :itemId="id" :fieldType="type"  @confirmClose="closeConfirmWindow"/>
</template>

<script>
import AddItem from '@/components/admin/AddItem.vue';
import ItemsList from '@/components/admin/ItemsList.vue'
import axios from '../axios';
import EditConfirm from '@/components/UI/EditConfirm.vue';
import EditTables from '@/components/admin/EditTables.vue';

export default {
    components: {
        AddItem,
        EditConfirm,
        ItemsList,
        EditTables      
    },

    data() {
        return {
            gem: {},
            gems: [],
            menuToShow: '',
            confirmWindow: false,            
            id: 0,
            type: ''
        }
    },
    methods: {        
        async getGem(id) {
            const { data } = await axios.get(`/collection/${id}`)
            this.gem = data;            
            this.menuToShow = 'edit'
        },
        async getAllGems() {
            const { data } = await axios.get(`/gems`)
            this.gems = data;
        },
        async confirmFieldUpdate(type, id) {
            await this.getGem(id)                      
            this.id = id
            this.type = type
            this.confirmWindow = !this.confirmWindow
        },
        closeConfirmWindow() {
            this.confirmWindow = !this.confirmWindow
        },
        clickHandler(e, type) {
            this.menuToShow = type;            
            document.querySelectorAll('.header-button').forEach(el => {
                if (el.classList.contains('head-button-active')) {
                    el.classList.remove('head-button-active')
                }
            })
            e.currentTarget.classList.add('head-button-active') 
        },
        async handleDelete(id) {
            const { data } = await axios.delete(`/admin/deleteItem/${id}`);
            console.log(data)            
            await this.getAllGems()
        }
    },
    async mounted() {
        await this.getAllGems();
    }
}
</script>

<style scoped>

.admin__main {
    min-height: 100vh;
}
.admin-header__wrapper {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.admin-header__wrapper button {
    font-size: 25px;
    padding: 0.2em 0.6em;
    margin: 0 0.5em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.admin-header__wrapper button:hover {
    background-color: rgba(85, 82, 82, 0.507);
}

.head-button-active {
    -webkit-box-shadow: inset 0px 1px 31px -15px #000000; 
        box-shadow: inset 0px 1px 31px -15px #000000;
        font-weight: 700; 
}

img {
    width: 100px;
}

.admin__main {
    background-color: rgba(51, 51, 51, 0.295);
}
.admin__main-wrapper {
    width: 80%;
    margin: 0 auto;
    background-color: rgb(252, 252, 252);
}

.admin-header {
    padding: 2em;
}

</style>