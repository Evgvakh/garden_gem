<template>
    <Header :isSearchNeeded="false" :isItem="true" :gem="gem" />
    <div class="gem__main-container">
        <div v-if="!isLoading" class="gem-item">
            <div class="gem__media-block">
                <div class="gem-gallery">
                    <vueper-slides fixed-height="350px" fixed-width="350px" :parallax="parallax" :bullets="false" fade>
                        <vueper-slide class="slide" v-for="img in images"
                            :style="{ backgroundImage: `url(${img.img})`, backgroundPosition: 'center center' }"
                            @click="increaseImgSize(img.img)" />
                        <vueper-slide class="slide" :style="'background-color: black'" v-if="video.length > 0"
                            v-for="vid in video" :video="vid.video"></vueper-slide>
                    </vueper-slides>
                </div>
                <div class="gem-descr__head">
                    <p><span class="cat">{{ gem.color }} {{ gem.category }}</span> in {{ gem.cut }} cut, {{
                        Number.parseFloat(gem.weight).toFixed(2) }} ct., {{ gem.item_set }} set</p>
                    <div class="price-block" :class="[gem.onsale == 'yes' ? 'onsale' : '']">
                        <p>${{ (gem.price * gem.weight).toFixed(0) }} 
                            <span class="price-per-ct">/ ${{ gem.price }} 
                                <span class="per-ct">per ct.</span>
                            </span>
                        </p>                        
                    </div>
                    <div v-if="gem.onsale == 'yes'" class="price-block price-block__sale">
                        <p>${{ (gem.sale_price * gem.weight).toFixed(0) }} 
                            <span class="price-per-ct">/ ${{ gem.sale_price }} 
                                <span class="per-ct">per ct.</span>
                            </span>
                        </p>                        
                    </div>
                </div>
            </div>
            <div class="gem__main-description">
                <div class="gem__description__item">
                    <h4>Description</h4>
                    <p style="text-transform: none !important; line-height: 1.3em;"> <vue-markdown :source="markDown" /></p>
                </div>
                <!-- <br> -->
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
                            <p>{{ Number.parseFloat(gem.weight).toFixed(2) }} ct.</p>
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
                        <div class="gem__description__item">
                            <h4>Certificate</h4>
                            <img v-if="gem.certificate != ''" :src="gemCertificate" alt="" style="cursor: pointer;"
                                @click.stop="increaseImgSize(gemCertificate)">
                        </div>
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
import VueMarkdown from 'vue-markdown-render'

export default {
    components: { VueperSlides, VueperSlide, Header, VueMarkdown },
    data() {
        return {
            gem: [],
            images: [],
            video: [],
            bigImage: "",
            markDown: "# dsadsa",
            isBigImage: false,
            isLoading: false,
            gemCertificate: ''
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
            this.isLoading = true;
            const { data } = await axios.get(`/collection/${this.$route.params.id}`)
            this.gem = data;
            this.markDown = data.description;
            this.isLoading = false;
        },
        getImages() {
            this.gem.images.forEach(img => this.images.push({
                img: process.env.VUE_APP_PROD_STORE + img.img
            }))
        },
        getVideo() {
            if (this.gem.video != '') {
                const obj = {
                    video: {
                        url: this.gem.video,
                        props: { allowfullscreen: true, muted: true }
                    }
                }
                this.video.push(obj);
            }
        },
        getCertificate() {
            if (this.gem.certificate != '') {
                this.gemCertificate = process.env.VUE_APP_PROD_STORE + this.gem.certificate
            }
        }
    },

    async mounted() {
        await this.fetchGem();
        this.getImages();
        this.getVideo();
        this.getCertificate();
    },

    computed: {
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital@0;1&display=swap');
p,
h4 {
    line-height: 1em;
    margin: 0;
    padding: 0;
}

.gem__main-container {
    width: 85%;
    margin: 0 auto;
}

.gem-item {
    background: rgb(163,211,111);
    background: linear-gradient(84deg, rgba(163, 211, 111, 0.123) 0%, rgba(73, 153, 156, 0.13) 55%);
    padding-top: 15vh;
}

.gem__media-block {
    display: grid;
    width: 80%;    
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 25px;
    grid-row-gap: 0px;
    margin-left: 3em;
}

.vueperslide {
    border-radius: 7px;
    height: 250px;
}

.slide {
    height: 100%;
}
.gem-gallery {
    grid-area: 1 / 1 / 2 / 2;
    -webkit-box-shadow: 0px 0px 20px -8px #000000;
    box-shadow: 0px 0px 20px -8px #000000;
    max-width: 500px;
}

.gem-descr__head {
    grid-area: 1 / 2 / 2 / 3;
}

.gem-descr__head {
    font-family: 'PT Serif', serif;
    font-size: 34px;
}
.gem-descr__head p {
    line-height: 1.3em;
}
.price-block {
    margin-top: 2em;
    font-size: 32px;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
    position: relative;
    width: fit-content;
}
.price-block.price-block__sale {
    margin-top: 0.1em;
    font-family: 'Averia Serif Libre', cursive;
    font-size: 35px;
}
.price-block__sale p {
    color: rgb(235, 46, 46);
}
.onsale::before {
    border-bottom: 3px solid red;
    position: absolute;
    content: "";
    width: 80%;
    height: 50%;
    transform: rotate(-4deg);
}

.price-per-ct {
    color: grey;
    font-size: 28px;
    font-weight: 400;
    font-style: italic;
}
.price-per-ct .per-ct {
    font-size: 14px;
}

.gem-descr__head .cat {
    text-transform: capitalize;
    font-weight: 700;
}

.gem-descr__head .price {
    font-size: 20px;
}

.gem__main-description {
    padding: 4em 3em;
    max-width: 900px;
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

.gem__description__item h4,
.gem__description__item p {
    font-family: 'Open Sans', sans-serif;
}

.gem__description__item h4 {
    font-size: 14px;
    color: rgb(49, 47, 47);
    margin-bottom: 0.5em;
}

.gem__description__item p {
    font-size: 20px;
    text-transform: capitalize;
}

.gem__description__item img {
    width: 100%;
}

.big__image {
    position: fixed;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.829);
    top: 0;
    left: 0;
    z-index: 200;
    width: 100vw;
    height: 100vh;
}

.big__image div {
    margin: 4em auto;
    width: 70%;
}

.big__image img {
    width: 100%;
}

@media (max-width: 860px) {
    .gem__main-container {
        width: 95%;
    }

    .gem-item {
        background-color: #eee0e149;
        padding-top: 11vh;
    }

    .gem__media-block {
        display: block;
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    .price-block {
        margin-top: 1em;
    }

    .gem-gallery {
        margin: 0 auto;
        margin-bottom: 2em;

    }

    .gem-video {
        width: fit-content;
        height: 400px;
        margin: 0 auto;
    }

    .gem__main-description {
        padding: 3% 3%;
        margin-top: 2em;
    }

    .description__text-item h4 {
        font-size: 14px;
        color: rgb(49, 47, 47);
        margin-bottom: 0.6em;
        text-decoration: underline;
    }

    .description__text-item p {
        font-size: 18px;
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
        margin: 10em auto;
        width: 95%;
    }

    .big__image img {
        width: 100%;
    }
}

@media (max-width: 450px) {
    .gem__media-block {        
        width: 90%;
        margin: 0 auto;
        text-align: left;
    }
    
    .price-per-ct {
        font-size: 14px;
    }

    .gem-descr__head .cat {
        text-transform: capitalize;
        font-weight: 700;
    }

    .gem-descr__head p {
        font-size: 24px;
    }

    .gem__main-description {
        margin-top: 1em;
        padding: 0.5em;
    }

    .price-block {
        margin-top: 0.5em;
    }

    .gem__description__item {
        margin-bottom: 0.5em;
    }

    .gem__description__item p {
        margin-bottom: 1.2em;
    }

    .gem__description__item h4 {
        font-size: 13px;
        margin-bottom: 0.6em;
        text-decoration: underline;
    }

    .gem__description__item p {
        font-size: 15px;
    }

    .onsale::before {        
        width: 70%;
        height: 50%;        
    }
}


</style>
