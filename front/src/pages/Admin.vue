<template>
    <div class="admin-header">
        <div class="admin-header__wrapper">
            <button>Add new item</button>
            <button>Edit / Delete item</button>
        </div>
    </div>
    <div>
        <AddItem />
    </div>    
</template>

<script>
import AddItem from '@/components/admin/AddItem.vue';

export default {
    components: {
        AddItem        
    },

    data() {
        return {
            
        }
    },
    methods: {
        route() {
            console.log(this.$route.path)
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
}</style>