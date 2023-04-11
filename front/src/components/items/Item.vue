<template>
    <div class="item">
        <div class="item-image" :style="{ backgroundImage: 'url(https://gemgarden.herokuapp.com/uploads/img/IMG_0727.jpg)'}">
        </div>
        <div class="text-block">
            <h4>
                <a @click="$router.push(`/collection/${gem.id}`)"><span class="start">{{ gem.color }} {{ gem.category }}</span> {{ gem.cut }} cut {{ gem.weight.toFixed(2) }} ct., {{ gem.origin }}</a>
            </h4>
            <div class="price_weight">                
                <div>
                    <p>Price <span>(per ct.)</span></p>
                    <h5> ${{ (gem.price * gem.weight).toFixed(0) }} <span>(${{ gem.price  }})</span></h5>
                </div>                
            </div>
        </div> 
    </div>
</template>

<script>
    export default {
    props: {
            gem: {
            type: Object,
            required: true
        }
       } 
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

    .item {
        -webkit-box-shadow: 0px 7px 15px -6px rgba(0, 0, 0, 0.815); 
        box-shadow: 0px 7px 15px -6px rgba(0,0,0,0.815);    
        width: 22%;
        margin-bottom: 3em;
        height: 280px;
        transition: all .3s ease;
        background-color: aliceblue; 
        border-radius: 6px;
        font-family: 'Open Sans', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }

    .item:hover {
        transform: scale(1.002);
        -webkit-box-shadow: 0px 7px 25px -8px rgba(0, 0, 0, 0.815); 
        box-shadow: 0px 7px 25px -8px rgba(0,0,0,0.815);
    }
    .item-image {
        width: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size:cover;
        height: 55%;
    }

    .text-block {
        padding: 1em;
        height: 45%;
    }  

    h4, h5, p, span {
        line-height: 1em;
        margin: 0;                
    }

    h4 {
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 0.7em;
        font-weight: 500; 
    }

    h5 {
        font-size: 16px;
        line-height: 1em;
        margin: 0.5em 0;
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
    .price_weight div p, span {
        font-style: italic;
        color: rgb(65, 63, 63);
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

    @media (max-width: 1378px) {
        .item {
            width: 30%;
        }
    }

    @media (max-width: 750px) {
        .item {
            width: 40%;
        }
    }

    @media (max-width: 570px) {
        .item {
            width: 45%;
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
        margin: 0.5em 0;
    }
    }

    @media (max-width: 495px) {
        .item {
            width: 80%;
        }

        h5 {
            font-size: 20px;
        }
    }

</style>