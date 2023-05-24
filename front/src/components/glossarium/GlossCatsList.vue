<template>
    <div class="gloss_cats__container">
        <transition name="start" appear>
            <div class="gloss_list__render">
                <GlossList v-for="cat in cats" :items="items" :cat="cat" :key="cat" />
            </div>
        </transition>
        <div class="background"></div>
        <div class="background-gradient"></div>
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

.start-enter-from {
    opacity: 0;
    transform: translateY(-104px);    
}

.start-enter-to {
    opacity: 1;    
}
.start-enter-active {
  transition: all 2s ease;
}

.gloss_cats__container {
    position: relative;
    padding: 10em 2em 2em 2em;
    height: 100%;
    height: 100vh;
}

.gloss_list__render {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    background-image: url('http://localhost:8081/uploads/assets/81tW1zZVyIL.jpg');
    background-position: center center;
    background-size: cover;
}

.background-gradient {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -5;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(18,18,18,0.65) 25%, rgba(18,18,18,0.77) 64%, rgba(18,18,18,0.85) 85%);
}

.fade-enter-active {
    animation: bounce-in 0.5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>