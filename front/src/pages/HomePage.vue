<template>
    <div class="main-page__container">
        <video @ended="closeVideo" autoplay muted>
            <source src="https://gemgarden.herokuapp.com/uploads/video/IMG_9005.MP4" type="video/mp4">
        </video>
        <div class="video-background">
            <Header class="head" :isSearchNeeded="false"/>
            <div class="main-page__content-container">
                <div class="content-container__wrapper">
                    <div class="content-container__img" >                                               
                        <h2>Мир камней в мире бетона и стекла</h2>
                        <p class="p-line"><span class="line"></span></p>
                        <h2>The world of gems in the world of glass and concrete</h2>

                        <p class="p-text">GEM GARDEN - это сообщество любителей камней, клуб по интересам.</p>
                        <p class="p-line"><span class="line line-min"></span></p>
                        <p class="p-text">GEM GARDEN is a community of gems lovers, an interest club.</p>                          

                        <p class="p-text">Современны, 100% субъективны, говорим только по делу, достанем любой камень.</p>
                        <p class="p-line"><span class="line line-min"></span></p>
                        <p class="p-text">Modern, 100% subjective, only about business, we'll get any gem you need</p>
                    </div>
                    <div class="content-back" :style="{backgroundImage: `url(${require('@/assets/main_background.jpg')})`}"></div>
                    <div class="fake-back" ></div> 
                </div>
            </div>
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
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap');

* h2, * p {
    line-height: 1em;
    padding: 0; margin: 0;
}
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

.main-page__content-container {
    width: 100%;
    height: 100vh;
}

.content-container__wrapper {
    height: 100%;
}

.content-container__img {    
    color: antiquewhite;
    padding: 12em 10em;
    position: relative;
    height: 100%;
    background-color: transparent;
    z-index: 30;
}
.content-container__img h2 {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    /* font-family: 'PT Serif', serif; */
    text-align: center;
    font-size: 52px;
    line-height: 1em;    
}

.content-container__img h2:nth-of-type(2) {
    margin-bottom: 1.8em;
}

.p-text {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    text-align: center;
    font-size: 22px;
}

.p-text:nth-of-type(4) {
    margin-bottom: 2.6em;
}

.p-line {
    text-align: center;
    margin: 1.8em 0 1.5em 0;
}
.p-line:nth-of-type(3) {
    text-align: center;    
    margin: 1em 0 0.8em 0;    
}
.p-line:nth-of-type(6) {
    text-align: center;    
    margin: 1em 0 0.8em 0;    
}

span.line {
    display: block;
    width: 10%;
    height: 3px;
    background-color: antiquewhite;
    margin: 0 auto;
}

span.line.line-min {
    width: 6%;
}

.content-back {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 10;
}

.fake-back {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: #121212b6;
    z-index: 20;
}
</style>