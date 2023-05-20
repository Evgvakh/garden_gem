<template>
    <div class="gloss_cats__container">
        <GlossList v-for="cat in cats" :items="items" :cat="cat" :key="cat" /> 
    </div>
</template>

<script>
import GlossList from './GlossList.vue';

export default {
    props: {
        cats: Array,
        items: Array
    },
    components: {
        GlossList
    }
}
</script>

<style scoped>

.gloss_cats__container {
    padding: 7em 0;
    background: rgb(163,211,111);
    background: linear-gradient(84deg, rgba(163, 211, 111, 0.323) 0%, rgba(73, 153, 156, 0.33) 55%);
    min-height: 100vh;
}

</style>