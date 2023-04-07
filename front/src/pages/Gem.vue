<template>
    <Header :isSearchNeeded="false" />
    <div class="gem__main-container">
        <div v-if="!isLoading" class="gem-item">
            <div class="gem-descr__head">
                <p><span class="cat">{{ gem.color }} {{ gem.category }}</span>  in {{ gem.cut }} cut {{ Number.parseFloat(gem.weight).toFixed(2) }} ct.</p>
                <div class="price-block">
                    <p>${{ (gem.price * gem.weight).toFixed(0) }} <span class="price-per-ct">/ ${{ gem.price }} per ct.</span></p>                    
                </div>
            </div>
            <div class="gem__media-block">
                <div class="gem-gallery">
                    <vueper-slides  fixed-height="350px" :parallax="parallax" fade>
                        <vueper-slide class="slide" v-for="img in images"
                            :style="{ backgroundImage: `url(${img.img})`, backgroundPosition: 'center center' }"                
                            @click="increaseImgSize(img.img)">
                        </vueper-slide>
                    </vueper-slides>
                </div> 
                <div class="gem-video">
                    <q-video
                        src="http://localhost:8081/uploads/video/video_2023-04-06_21-09-29.mp4"
                        allowfullscreen
                        :loading="lazy"
                        :style="{width: '100%', height: '100%'}"
                    />
                </div>
            </div>
            <div class="gem__main-description">
                <div class="description__text-item">
                    <div class="description__text-item__sub">
                        <div v-if="gem.id_subcategory != 1" class="gem__description__item">
                            <h4>Additional name</h4>
                            <p>{{ gem.subcategory }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Origin</h4>
                            <p>{{ gem.origin }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Weght</h4>
                            <p>{{ Number.parseFloat(gem.weight).toFixed(2) }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Set</h4>
                            <p>{{ gem.item_set }}</p>
                        </div>
                    </div>
                    <div class="description__text-item__sub">
                        <div class="gem__description__item">
                            <h4>Color</h4>
                            <p>{{ gem.color }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Cut</h4>
                            <p>{{ gem.cut }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Clarity</h4>
                            <p>{{ gem.clarity }}</p>
                        </div>
                        <div class="gem__description__item">
                            <h4>Treatment</h4>
                            <p>{{ gem.treatment }}</p>
                        </div>
                    </div>
                    <div class=" description__text-item__sub certificate">
                        <object><embed :src="'http://localhost:8081/'+gem.certificate" width="700" height="500" /></object>
                    </div>
                </div>
                
                
            </div>            
        </div>
        <div v-if="isBigImage" @click.stop="decreaseImg" class="big__image">
            <div><img :src=bigImage alt=""></div>
        </div>
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import Header from "@/components/header/Header.vue";
import axios from "@/axios";
export default {
    components: { VueperSlides, VueperSlide, Header },
    data() {
        return {
            gem: [],
            images: [
                { img: "http://localhost:8081/uploads/img/IMG_0727.jpg" },
                { img: "http://localhost:8081/uploads/img/IMG_1869.jpg" },
                { img: "http://localhost:8081/uploads/img/IMG_3031.jpg" },
                { img: "http://localhost:8081/uploads/img/IMG_3101.jpg" },                
            ],
            bigImage: "",
            isBigImage: false,
            isLoading: false,
        };
    },

    methods: {
        increaseImgSize(image) {
            this.bigImage = image;
            this.isBigImage = true;
        },

        decreaseImg() {
            this.isBigImage = false;
        },

        async fetchGem() {
            console.log(this.$route.params.id)
            this.isLoading = true;
            const { data } = await axios.get(`/collection/${this.$route.params.id}`)
            this.gem = data;
            this.isLoading = false;
            console.log(typeof this.gem.weight)
        }
    },

    async mounted() {
        await this.fetchGem()
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

p, h4 {
    line-height: 1em;
    margin: 0; padding: 0;
}
.gem__main-container {    
    width: 85%;
    margin: 0 auto;    
}

.gem-item {
    background-color: #eee0e149;
    padding-top: 20vh;
}

.gem__media-block {
    display: grid;
    width: 90%;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 0px;     
}

.vueperslide {
    border-radius: 7px;    
}
.gem-gallery {
    grid-area: 1 / 1 / 2 / 3;      
}
.gem-video {
    grid-area: 1 / 3 / 2 / 4;
}

.q-video {
    border-radius: 7px;
}

.gem-descr__head {
    font-family: 'PT Serif', serif;
    font-size: 30px;
    margin-bottom: 1.3em;
    padding: 0 2em;
}

.price-block {
    margin-top: 1.3em;
    font-size: 28px;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif; 
}

.price-per-ct {
    color: grey;
    font-weight: 400;
    font-style: italic;
}

.gem-descr__head .cat {
    text-transform: capitalize;
    font-weight: 700;       
}

.gem-descr__head .price {    
    font-size: 20px;
}


.gem__main-description {
    padding: 4em;
}

.description__text-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.gem__description__item {
    margin-bottom: 1.7em;
}

.description__text-item__sub {
    width: 30%;
}

.description__text-item h4,  .description__text-item p{
    font-family: 'Open Sans', sans-serif; 
}

.description__text-item h4 {
    font-size: 24px;
    color: rgb(49, 47, 47);
    text-decoration: underline;
    margin-bottom: 0.3em;
}

.description__text-item p {
    font-size: 22px;
    text-transform: capitalize;
    font-style: italic;
}



.big__image {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.829);
    top: 0;
    left: 0;
    z-index: 200;
    width: 100vw;
    height: 100vh;
}

.big__image div {
    margin: 4em auto;
    width: 600px;
}

.big__image img {
    width: 100%;
}
</style>
