<template>
    <div class="gloss_list">
        <button>{{ cat }}</button>
        <div class="gloss_list__content">
            <GlossItem v-for="item in list" :item="item" :key="item" :id_cat="item.id_category" :cat="item.category" />
        </div>
    </div>
</template>

<script>

import GlossItem from '@/components/glossarium/GlossItem.vue'
export default {
    props: {
        items: Array,
        cat: String,
    },
    components: {
        GlossItem
    },
    data() {
        return {
            list: Array || String,
            show: false
        }
    },
    methods: {
        getItems() {
            this.list = this.items.filter(item => {
                return item.category == this.cat
            })
        },
        showItems() {
            this.showList = !this.showList
            this.isActive = !this.isActive
        }
    },

    mounted() {
        this.getItems();
    }

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.gloss_list {
    margin: 1em;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.gloss_list__content {
    width: 96%;
    margin: 0 auto;    
}

.gloss_list button {
    background: transparent;
    border: none;
    width: fit-content;
    display: block;
    padding: 0.2em;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Balsamiq Sans', cursive;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    transition: padding 0.5s ease-out;
    transition: width 0.3s ease-out;
    background: linear-gradient(200deg, rgb(222, 235, 208) 0%, rgb(171, 237, 240)55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* color: white; */
}

.gloss_list button {
    border: none;
}
</style>