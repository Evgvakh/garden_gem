<template>
    <div v-if="lang === 'en'" class="sidebar">
        <!-- <div class="lang-change">
            <div class="lang-change__item" @click="setLanguage('en')">
                <img src="http://localhost:8081/uploads/assets/enflag.png" alt="">
            </div>
            <div class="lang-change__item" @click="setLanguage('ru')">
                <img src="http://localhost:8081/uploads/assets/ruflag.png" alt="">
            </div>
        </div>  -->

        <ListWrapper class="item" :title='"Gems"' @modify="setVisibleSection" @click.stop="$router.push('/gems')"
            @click="setVisibleSection('gems')" :isChevron="false"/>
        <SideList v-if="visibleSection == 'gems'" :gems="this.gems" :categories="cats"/>

        <ListWrapper class="item" :title='"Glossarium"' @modify="setVisibleSection" @click.stop="$router.push('/glossarium')"
            @click="setVisibleSection('gloss')" :isChevron="false"/>
        <SideList v-if="visibleSection == 'gloss'"/>

        <ListWrapper class="item" :title='"Contacts"' @modify="setVisibleSection" @click.stop="$router.push('/contacts')"
            @click="setVisibleSection('contacts')" :isChevron="false"/>
        <ListWrapper class="item" :title='"About us"' @modify="setVisibleSection" @click.stop="$router.push('/about')"
            @click="setVisibleSection('about')" :isChevron="false"/>
        <div class="sidebar-logo">
            <h2>Gem Garden <font-awesome-icon icon="fa-regular fa-copyright" class="copyright"/></h2>
            <p><a href="https://t.me/pavellevap80" target="_blank">@Pavel</a></p>
            <p><a href="https://t.me/Joachim88" target="_blank">@Vadim</a></p>
            <p><font-awesome-icon icon="fa-brands fa-telegram" class="icon"/><a href="https://t.me/gemgarden" target="_blank">Telegram</a></p>
            <p><font-awesome-icon icon="fa-brands fa-youtube" class="icon"/><a href="https://www.youtube.com/@gemgarden" target="_blank">Youtube</a></p>
        </div>
    </div>
    <div v-if="lang === 'ru'" class="sidebar">
        <div class="lang-change">
            <div class="lang-change__item" @click="$emit('changeLang', 'en')">
                <img src="http://localhost:8081/uploads/assets/enflag.png" alt="">
            </div>
            <div class="lang-change__item" @click="$emit('changeLang', 'ru')">
                <img src="http://localhost:8081/uploads/assets/ruflag.png" alt="">
            </div>
        </div>          
        <ListWrapper class="item" :title='"Каталог"' @modify="setVisibleSection" @click.stop="$router.push('/ru/gems')"
            @click="setVisibleSection('gems')" :isChevron="false"/>
        <SideList v-if="visibleSection == 'gems'" :gems="this.gems" :categories="cats"/>
        <ListWrapper class="item" :title='"Контакты"' @modify="setVisibleSection" @click.stop="$router.push('/ru/contacts')"
            @click="setVisibleSection('contacts')" :isChevron="false"/>
        <ListWrapper class="item" :title='"О нас"' @modify="setVisibleSection" @click.stop="$router.push('/ru/about')"
            @click="setVisibleSection('about')" :isChevron="false"/>
        <div class="sidebar-logo">
            <h2>Gem Garden <font-awesome-icon icon="fa-regular fa-copyright" class="copyright"/></h2>
            <p><a href="https://t.me/pavellevap80" target="_blank">@Павел</a></p>
            <p><a href="https://t.me/Joachim88" target="_blank">@Вадим</a></p>
            <p><font-awesome-icon icon="fa-brands fa-telegram" class="icon"/><a href="https://t.me/gemgarden" target="_blank">Telegram</a></p>
            <p><font-awesome-icon icon="fa-brands fa-youtube" class="icon"/><a href="https://www.youtube.com/@gemgarden" target="_blank">Youtube</a></p>
        </div>
    </div>
</template>

<script>
import ListWrapper from './ListWrapper.vue';
import SideList from './SideList.vue';

export default {
    components: {
        ListWrapper,
        SideList
    },

    props: {
        gems: {
            type: Array
        },
        lang: {
            type: String
        },
        cats: {
            type: Array
        }
    },

    data() {
        return {
            visibleSection: ''            
        }
    },

    methods: {
        setVisibleSection(item) {
            this.visibleSection = item;
        },

        setLanguage(language) {           
            this.$emit('changeLang', language)            
        }
    },
    watch: {
        lang(curr, prev) {
            if (curr === 'en') {
                this.$router.push('/gems')                
            } else {
                this.$router.push('/ru/gems')
            }
            localStorage.setItem('gemGardenLang', curr);            
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Forum&family=Lilita+One&display=swap');
.sidebar {
    height: 100vh;
    overflow-y: auto;
    background: linear-gradient(200deg, rgba(163,211,111,0.8799894957983193) 0%, rgba(73,153,156,1) 55%);    
    padding: 7em 0;
    -webkit-box-shadow: inset -21px 5px 29px -30px #0000009a; 
    box-shadow: inset -21px 5px 29px -30px #0000009a;
}

.lang-change {
    width: 40%;
    margin: 0 auto; 
    display: flex;
    justify-content: space-between;  
    margin-bottom: 5em;
}

.lang-change div {
    width: 27%;
    cursor: pointer;    
}

.lang-change div img {
    width: 100%;
}

.lang-change div img:hover {
    width: 103%;
}

.item {
    margin-top: 1.5em;
    cursor: pointer;
}

.sidebar-logo {    
    color: white;
    text-align: center;
    margin-top: 16em;
    padding: 0 1em;
}

.sidebar-logo h2 {
    font-family: 'Forum', cursive;
    font-size: 30px;
    line-height: 1em;
    margin: 0; padding: 0;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
}

h2 .copyright {
    font-size: 14px;
}

.sidebar-logo p {
    line-height: 1em;
    margin: 0; padding: 0;
    margin-bottom: 0.7em;
    font-size: 16px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.sidebar-logo p:nth-of-type(2) {
    margin-bottom: 1.3em;
}

.sidebar-logo p a {
    text-decoration: none;
    color: white;     
}

.sidebar-logo p .icon {
    margin-right: 0.5em;
}

</style>