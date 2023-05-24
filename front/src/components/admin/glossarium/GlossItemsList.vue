<template>
    <div class="gloss_items_list__container">
        <GlossAdminItem class="gloss_items_list__item" v-for="item in items" :item="item"/>
    </div>
</template>

<script>
import GlossAdminItem from '@/components/admin/glossarium/GlossAdminItem.vue';
import axios from '../../../axios';
export default {
    components: {
        GlossAdminItem
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        async getItems() {
            const { data } = await axios.get('/gloss')
            this.items = data;
        }
    },
    async mounted() {
        await this.getItems()
    }
}
</script>

<style scoped>

.gloss_items_list__container {
    padding: 2em;
}

</style>