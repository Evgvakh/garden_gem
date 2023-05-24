<template>
    <div class="item">
        <!-- <div class="item-image"
            :style="{ backgroundImage: 'url(https://gemgarden.herokuapp.com/uploads/img/IMG_0727.jpg)' }">
        </div> -->
        <div class="item-image"
            :style="{ backgroundImage: `url(https://gemgarden.herokuapp.com/${image.img})` }">
        </div>
        <div class="text-block">
            <h4>
                <a @click="$router.push(`/collection/${gem.id}`)"><span class="start">{{ gem.color }} {{ gem.category
                }}</span>, {{ gem.cut }} cut, {{ gem.weight.toFixed(2) }} ct.<a v-if="gem.origin != 'unknown'">, {{ gem.origin }}</a></a>
            </h4>
            <div class="price_weight">
                <div v-if="gem.onsale == 'no'">
                    <p>Price <span>(per ct.)</span></p>
                    <h5> ${{ (gem.price * gem.weight).toFixed(0) }} <span>(${{ gem.price }})</span></h5>
                </div>
                <div v-else>
                    <p>Price <span>(per ct.)</span></p>
                    <h5 style="color: rgb(235, 46, 46);"> ${{ (gem.sale_price * gem.weight).toFixed(0) }} <span>(${{ gem.sale_price }})</span></h5>
                </div>
            </div>
        </div>
        <div v-if="gem.onsale == 'yes'" class="sale-label" :style="{backgroundImage: `url(${saleImgUrl})`}"></div>
    </div>    
</template>

<script>
export default {
    props: {
        gem: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            saleImgUrl: '',
            image: ''
        }
    },
    methods: {
        getSaleUrl() {
            this.saleImgUrl = process.env.VUE_APP_PROD_STORE + 'uploads/assets/1-2-sale-png-clipart-thumb.png'
        },

        getImage() {
            this.image = this.gem.images[0] ? this.gem.images[0] : ''
        }
    },
    mounted() {
        this.getSaleUrl()
        this.getImage()
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

.item {
    -webkit-box-shadow: 0px 7px 15px -6px rgba(0, 0, 0, 0.815);
    box-shadow: 0px 7px 15px -6px rgba(0, 0, 0, 0.815);
    width: 22%;
    margin-bottom: 3em;    
    height: 300px;
    transition: all .3s ease;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
}

.item:hover {
    transform: scale(1.002);
    -webkit-box-shadow: 0px 7px 25px -8px rgba(0, 0, 0, 0.815);
    box-shadow: 0px 7px 25px -8px rgba(0, 0, 0, 0.815);
}

.item-image {
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 60%;
}

.text-block {
    padding: 0.6em;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

h4,
h5,
p,
span {
    line-height: 1em;
    margin: 0;
}

h4 {
    font-size: 18px;
    cursor: pointer;
    margin-bottom: 0.2em;
    font-weight: 500;
}

h5 {
    font-size: 18px;
    line-height: 1em;
    margin: 0.2em 0;
}

.price_weight {
    display: flex;
    justify-self: flex-end;
}

.price_weight h5 {
    font-weight: 700;
}

.price_weight div:nth-of-type(1) {
    margin-right: 2em;
}

.price_weight div p,
span {
    font-style: italic;
    font-size: 15px;
    color: rgb(85, 82, 82);
}

.description {
    padding: 1em;
}

.text-block span.start {
    text-transform: capitalize;
    font-style: normal;
    font-weight: 500;
    color: #563838;
    font-size: 19px;
}

.sale-label {
    position: absolute;
    width: 27%; height: 27%;
    top: -8%; left: -8%;
    z-index: 90;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
}

@media (max-width: 1378px) {
    .item {
        width: 30%;
    }
}

@media (max-width: 750px) {
    .item {
        width: 43%;
    }
}

@media (max-width: 570px) {
    .item {
        width: 90%;
    }

    h4 {
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 0.7em;
        font-weight: 500;
    }

    h5 {
        font-size: 18px;
        line-height: 1em;
        margin: 0.2em 0;
    }

    span.start {
        font-size: 14px;
    }
}

@media (max-width: 495px) {
    .item {
        width: 80%;
    }

    h4 {
        font-size: 18px;
        margin-bottom: 0;
    }

    h5 {
        font-size: 20px;
    }
}</style>