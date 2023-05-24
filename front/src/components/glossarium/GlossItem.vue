<template>
    <div class="gloss_list__content__buttons">
        <font-awesome-icon icon="fa-regular fa-gem" v-if="!showDescr" class="arrow_icon" />
        <button class="toggle__button" @click="$router.push(`glossarium/${item.id}`)">{{ item.title }}</button>
        <font-awesome-icon icon="fa-regular fa-gem" v-if="!showDescr" class="arrow_icon" />
    </div>
</template>

<script>

export default {

    props: {
        item: Object,
        id_cat: Number,
        cat: String
    },

    data() {
        return {
            showDescr: false
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;700&display=swap');

.gloss_list__content__buttons {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;    
}

.toggle__button {
    border: none;
    background: transparent;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    margin: 0.5em 0;
    padding: 0 0.5em;
    cursor: pointer;
    text-transform: capitalize;
    white-space: nowrap;
    transition: background .5s ease;
}

.toggle__button:hover {
    background: linear-gradient(200deg, rgb(222, 235, 208) 0%, rgb(171, 237, 240)55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.arrow_icon {
    color: rgb(171, 237, 240);
    font-size: 14px;
}
</style>