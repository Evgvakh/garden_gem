<template>
    <Header :isSearchNeeded="false" :isGloss="true" :isGlossItem="true" :category="'Glossarium'"/>
    <div class="gloss_text__content">
        <div class="gloss_text__back"></div>
        <div class="gloss_text__header">
            <h4>{{ item.title }}</h4>
        </div>
        <p>
            <vue-markdown :breaks="true" :source="markDown" />
        </p>
        <button class="ref__btn" @click.prevent="$router.push(`/gems/${item.id_category}`)">Visit our <span>{{ item.category }}</span>
            page</button>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-render';
import Header from '@/components/header/Header.vue';
import axios from '../../axios';
export default {
    components: {
        VueMarkdown,
        Header
    },

    data() {
        return {
            item: {},
            markDown: 'qew'
        }
    },

    methods: {
        async fetchItem() {
            const { data } = await axios.get(`/gloss/${this.$route.params.id}`)
            this.item = data;
            console.log(data)
        },
        setMarkdown() {
            this.markDown = this.item.text
        }
    },

    async mounted() {
        await this.fetchItem();
        this.setMarkdown()
    }
}
</script>

<style scoped>
.gloss_text__content {
    min-height: 100vh;
    text-align: justify;
    font-size: 18px;
    padding: 6em;    
    display: flex;
    flex-direction: column;
    /* background: linear-gradient(200deg, rgba(163,211,111,0.5799894957983193) 0%, rgba(73,153,156,0.6) 55%);  */
    background-image: url('http://localhost:8081/uploads/assets/364496.jpg');
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    position: relative;
    z-index: 0;    
}

.gloss_text__back {
    background-color: #121212d2;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: -1;
}

.gloss_text__content p {
    color: rgba(225, 251, 255, 0.863);    
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

.ref__btn span {
    background: linear-gradient(200deg, rgb(222, 235, 208) 0%, rgb(171, 237, 240)55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>