<template>
    <div class="gloss_add_item__main">
        <div class="gloss_add_item__subhead">
            <p>Category:</p>
            <AdminSelect :name="'name'" :options="cats" v-model="catId" :optionId=0 />
        </div>
        <div class="gloss_add_item__subhead">
            <p>Title: </p>
            <AdminInput class="gloss_add_item__input"/>
        </div>
        <div class="gloss_add_item__text">
            <Editor v-model="text" editorStyle="height: 320px" aria-describedby="editor-error"/>
        </div>
    </div>
</template>

<script>
import AdminSelect from '@/components/admin/AdminSelect.vue';
import AdminInput from '@/components/UI/AdminInput.vue';
import axios from '../../../axios';
export default {
    components: {
        AdminSelect,
        AdminInput
    },

    data() {
        return {
            cats: [],
            catId: 0,
            text: ''
        }
    },
    
    methods: {
        async getCats() {
            const { data } = await axios.get('/cats')
            this.cats = data;
        },
    },

    async mounted() {
        await this.getCats()
    }
}
</script>

<style  scoped>

p {
    margin: 0; padding: 0;
}

.gloss_add_item__main {
    padding: 2em;
}

.gloss_add_item__subhead {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
}

.gloss_add_item__subhead p {
    margin-right: 2em;
    min-width: 6%;
}

.gloss_add_item__input {
    padding: 0.2em 0.5em;
}

</style>