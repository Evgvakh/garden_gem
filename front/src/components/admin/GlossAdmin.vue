<template>
    <div class="gloss_admin__buttons_block">
        <button class="gloss_admin__buttons_button" @click.prevent="setMenu($event, 'add')">Add new item</button>
        <button class="gloss_admin__buttons_button" @click.prevent="setMenu($event, 'delete')">Edit / Delete items</button>
    </div>
    <div class="gloss_admin__menu">
        <GlossItemsList v-if="this.glossAdminActiveMenu === 'delete'" />
        <GlossAddItem v-if="this.glossAdminActiveMenu === 'add'" />
        <GlossAddItem v-if="this.glossAdminActiveMenu === 'edit'" />
    </div>
</template>

<script>
import GlossItemsList from './glossarium/GlossItemsList.vue';
import GlossAddItem from './glossarium/GlossAddItem.vue';
export default {
    components: {
        GlossItemsList,
        GlossAddItem
    },
    data() {
        return {
            glossAdminActiveMenu: ''
        }
    },

    methods: {
        setMenu(e, menu) {
            this.glossAdminActiveMenu = menu;
            document.querySelectorAll('.gloss_admin__buttons_button').forEach(el => {
                if (el.classList.contains('button-active')) {
                    el.classList.remove('button-active')
                }
            })
            e.target.classList.add('button-active')
        }
    }

}
</script>

<style scoped>
.gloss_admin__buttons_block {
    width: 50%;
    padding: 1em;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
}

.gloss_admin__buttons_block button {
    padding: 0.3em 0.6em;
    font-size: 20px;
    border-radius: 7px;    
    cursor: pointer;
}

.button-active {
    -webkit-box-shadow: inset 0px 1px 31px -15px #000000;
    box-shadow: inset 0px 1px 31px -15px #000000;
    font-weight: 700;    
}
</style>