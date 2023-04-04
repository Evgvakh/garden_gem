<template>
    <div class="item">
        <div class="item-image" :style="{ backgroundImage: 'url(http://localhost:8081/uploads/img/IMG_0727.jpg)'}">

        </div>
        <div class="text-block">
            <h4>
                <a @click="$router.push(`/collection/${gem.id}`)">{{ gem.name.toUpperCase() }} {{ gem.cut }} cut {{ gem.weight }} {{ gem.origin }}</a>
            </h4>
            <div class="price_weight">
                <div>
                    <p>Weight</p>
                    <h5>{{ gem.weight }} ct.</h5>
                </div>
                <div>
                    <p>Price <span>(per ct.)</span></p>
                    <h5> $ {{ gem.price }} <span>({{ gem.price / gem.weight }})</span></h5>
                </div>                
            </div>
        </div>        
        <div class="description">
            <p>{{ gem.description }}</p>
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
    .item {
        -webkit-box-shadow: 0px 7px 15px -6px rgba(0, 0, 0, 0.815); 
        box-shadow: 0px 7px 15px -6px rgba(0,0,0,0.815);    
        width: 22%;
        margin-bottom: 3em;
        height: 320px;
        transition: all .3s ease;
        background-color: aliceblue; 
        border-radius: 6px;           
    }

    .item:hover {
        transform: scale(1.01);
        -webkit-box-shadow: 0px 7px 25px -6px rgba(0, 0, 0, 0.815); 
        box-shadow: 0px 7px 25px -6px rgba(0,0,0,0.815);
    }
    .item-image {
        width: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size:cover;
        height: 45%;
    }

    .text-block {
        padding: 1em;        
        border-bottom: 1px solid rgba(150, 141, 141, 0.541);
    }  

    h4, h5, p, span {
        line-height: 1em;
        margin: 0;                
    }

    h4 {
        font-size: 20px;
        cursor: pointer;
        margin-bottom: 0.6em;
        font-weight: 500; 
    }

    h5 {
        font-size: 16px;
        margin: 0.5em 0;
    }

    .price_weight {
        display: flex;
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

</style>