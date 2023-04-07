<template>
    <div class="main-page__container">
        <video @ended="closeVideo" autoplay muted>
            <source src="http://localhost:8081/uploads/video/IMG_9005.MP4" type="video/mp4">
        </video>
        <div class="video-background">
            <Header class="head" :isSearchNeeded="false"/>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
export default {
    components: {
        Header
    },

    methods: {
        closeVideo(e) {
            e.target.style.height = 0
            document.querySelector('.video-background').style.left = 0;
            document.querySelector('.main-page__container').style.backgroundColor = 'transparent';
            document.querySelector('.head').style.opacity = 1;
        }
    }
}
</script>

<style scoped>
.main-page__container {
    overflow: hidden;
    position: relative;
    background-color: #282726;
    height: 100vh;
    transition: background 2s ease-in;
}

video {
    height: 90vh;
    width: 100%;
    overflow: hidden;
    margin-top: 4vh;
    transition: height .7s ease-in;
}

.video-background {
    position: absolute;
    top: 0;
    left: 200%;
    width: 100%;
    height: 100%;
    background-color: #eee0e149;
    transition: left 1s ease-out;
}

.head {
    opacity: 0;
    transition: opacity 2s ease-out;
}
</style>