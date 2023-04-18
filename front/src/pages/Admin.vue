<template>
    <div class="admin__main">
        <div class="admin__main-wrapper">
            <div class="admin-header">
                <div class="admin-header__wrapper">
                    <button @click.prevent="clickHandler('add')">Add new item</button>
                    <button @click.prevent="clickHandler('edit')">Edit / Delete item</button>
                </div>
                <button @click="testHandler(4)">Change menu</button>
            </div>
            <div >
                <AddItem v-if="menuToShow === 'add'" :menuType="'add'"/>
                <AddItem :gem="this.gem" :menuType="'edit'" v-if="menuToShow === 'edit'"/>                
            </div>
        </div>
    </div>   
</template>

<script>
import AddItem from '@/components/admin/AddItem.vue';
import axios from '../axios';

export default {
    components: {
        AddItem        
    },

    data() {
        return {
            gem: {},
            menuToShow: 'add'
        }
    },
    methods: {
        route() {
            console.log(this.$route.path)
        },
        async testHandler(id) {
            const { data } = await axios.get(`/collection/${id}`)
            this.gem = data;
            this.menuToShow = 'edit'
        }
    },
    mounted() {
        this.route()
    },

}
</script>

<style scoped>
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