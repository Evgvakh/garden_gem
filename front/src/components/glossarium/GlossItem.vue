<template>
    <div class="gossitem__main">
        <div class="gloss_list__content__buttons">
            <font-awesome-icon icon="fa-regular fa-gem" v-if="!showDescr" class="arrow_icon"/>
            <button class="toggle__button" :class="{active: showDescr}" @click="showText">{{ item.title }}</button>
        </div>
        <div class="gloss_list__content__text" v-if="showDescr">
            <p>
                <vue-markdown :breaks="true" :source="item.text"/>
            </p>
            <button class="ref__btn" @click.prevent="$router.push(`/gems/${id_cat}`)">Visit our {{ cat.toUpperCase()}} page</button>
        </div>
    </div>
</template>

<script>

import VueMarkdown from 'vue-markdown-render';

export default {
    props: {
        item: Object,
        id_cat: Number,
        cat: String
    },
    components: {
        VueMarkdown
    },

    data() {
        return {
            showDescr: false
        }
    },
    methods: {
        showText() {
            this.showDescr = !this.showDescr
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;700&display=swap');
    .gossitem__main {
         
    }

    .gloss_list__content__buttons {
        display: flex;
        align-items: center;
    }
    .toggle__button {
        border: none;
        background: transparent;
        color: #ffffff;
        font-size: 22px;
        font-weight: 700;
        margin: 0.5em 0;
        padding: 0 1em;
        cursor: pointer;
        text-transform: capitalize;
    }

    .toggle__button:hover {
        color: #493232;        
    }

    .toggle__button.active {
        color: white;
        padding: 0 2em;
        font-size: 36px;
        letter-spacing: 1px;        
    }

    .arrow_icon {
        color: #ffffff;
        font-size: 18px;
    }

    .gloss_list__content__text {
        text-align: justify;
        font-size: 18px;
        padding: 0 1em;
        border-bottom: 4px solid rgb(49, 113, 116);
        display: flex;
        flex-direction: column;
        margin: 1em 0;
        
    }

    .gloss_list__content__text p {
        color: rgb(14, 14, 14);        
    }
    
    .ref__btn {
        border: none;
        background: transparent;       
        margin: 0.8em 0;
        color: white;
        cursor: pointer;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 2px;
        background: rgb(163, 211, 111);
        background: linear-gradient(200deg, rgb(35, 41, 31) 0%, rgb(34, 118, 122) 55%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Baloo Bhaijaan 2', cursive;        
    }
    
</style>