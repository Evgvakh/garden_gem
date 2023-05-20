<template>
    <div class="gloss_list">
        <div class="gloss_list__header">
            <button @click.prevent="showItems" :class="{ active: isActive }">{{ cat }}</button>
            <transition name="fade">
            <div class="gloss_list__content" v-show="showList">

                <GlossItem v-for="item in list" :item="item" :key="item" :id_cat="item.id_category" :cat="item.category" />

            </div>
            </transition>
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
            showList: false,
            markDown: "# dsadsa",
            isActive: false
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
    padding: 0 2em;
    margin-bottom: 2em;
}

.gloss_list__content {    
    background: linear-gradient(200deg, rgba(163, 211, 111, 0.8799894957983193) 0%, rgba(73, 153, 156, 0.8799894957983193) 55%);
    -webkit-box-shadow: 0px 6px 17px -11px #000000;
    box-shadow: 0px 6px 17px -11px #000000;
    width: 96%;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
    padding: 2em;
}

.gloss_list__header button {    
    background: linear-gradient(200deg, rgba(163, 211, 111, 0.9199894957983193) 0%, rgba(73, 153, 156, 1) 55%);
    -webkit-box-shadow: 0px 5px 14px -2px #000000a6;
    box-shadow: 0px 5px 14px -2px #000000a6;
    border: none;
    width: 65%;
    display: block;
    margin: 0 auto;
    padding: 0.4em;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Balsamiq Sans', cursive;
    border-radius: 35px;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 3px;
    transition: all 0.3s ease;
    transition: padding 0.5s ease-out;
    transition: width 0.3s ease-out;
    
}

.gloss_list__header button:hover {
    -webkit-box-shadow: 0px 5px 14px -1px #0000004b;
    box-shadow: 0px 5px 14px -1px #0000004b;
    letter-spacing: 2px;
}

.gloss_list__header button.active {
    width: 100%;
    padding: 0.2em;
    -webkit-box-shadow: 0px 5px 14px -1px #0000004b;
    box-shadow: 0px 5px 14px -1px #0000004b;
    letter-spacing: 1px;        
}

.fade-enter-from {
    width: 0%;
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.8s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  width: 0;
  
}

.fade-leave-to {
    display: none;
}

.gloss_list__content {
    transition: all 1.4s ease;
}

.gloss_list__content button {
    border: none;
}
</style>