<template>
    <div class="sidebar" :class=backImageClass>
        <ListWrapper
        class="item"                  
        :title='"Gems"' 
        @modify="setVisibleSection"
        @click.stop="$router.push('/gems')"
        @click="setVisibleSection('gems')"        
        />
        <SideList v-if="visibleSection == 'gems'" @changeBackground="editBackground"/>
        <ListWrapper
        class="item"                  
        :title='"Contacts"' 
        @modify="setVisibleSection"
        @click.stop="$router.push('/contacts')"
        @click="setVisibleSection('contacts')"        
        />        
        <ListWrapper
        class="item"                 
        :title='"About us"' 
        @modify="setVisibleSection"
        @click.stop="$router.push('/about')"
        @click="setVisibleSection('about')"
        />
        
    </div>
</template>

<script>
    import ListWrapper from './ListWrapper.vue';
    import SideList from './SideList.vue';
    export default {
    components: {
    ListWrapper,
    SideList
},

    data() {
        return {
            visibleSection: '',
            backImageClass: ''
        }
    },

    methods: {
        setVisibleSection(item) {
            this.visibleSection = item;
        },

        editBackground(item) {
            this.backImageClass = item;
        }
    },

    watch: {
        // visibleSection() {
        //     switch (this.visibleSection) {
        //         case 'aguamarine'
        //     }
        // }
    }
    }
</script>

<style scoped>
    .sidebar {       
        height: 100vh;
        overflow-y: hidden;
        background-color: #282726;
        padding: 5em 0;       
    }

    .item {
        margin-top: 1em;
        cursor: pointer;
    }





</style>