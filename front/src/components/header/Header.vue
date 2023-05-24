<template>
    <div class="header">
        <div class="header_container">
            <div v-if="isSearchNeeded" class="input_search">
                <input type="text" :value="modelValue" @input="updateInput" :placeholder="placeholder" />
            </div>
            <div v-if="isCategory" class="category-show">
                <p>Collection / <span v-if="subCategory == ''">{{ category }}</span><span v-else>{{ subCategory }}</span>
                </p>
            </div>
            <div v-if="isGloss" class="category-show">
                <p>{{ category }}</p>
            </div>
            <div v-if="isGloss && isGlossItem" class="category-show">
                <p>Glossarium/{{ category }}</p>
            </div>
            <div class="category-show">
                <p v-if="isItem">{{ gem.color }} {{ gem.category }}</p>
            </div>
            <div :class="[(isSearchNeeded && !isCategory) ? 'logo' : 'logo_single']">
                <a @click="$router.push('/')">Gem Garden</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        modelValue: {
            type: [String, Number],
            required: true,
        },
        placeholder: '',
        isSearchNeeded: {
            type: Boolean
        },
        isCategory: { type: Boolean },
        isItem: Boolean,
        category: String,
        subCategory: String,
        gem: Array,
        isGloss: Boolean
    },

    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Forum&family=Lilita+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;0,900;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@400;600&display=swap');

.header {
    width: 80%;
    height: 9vh;    
    background: linear-gradient(84deg, rgba(163, 211, 111, 1) 0%, rgba(73, 153, 156, 1) 55%);
    position: fixed;
    top: 0;
    left: 20%;
    z-index: 100;
    -webkit-box-shadow: inset 0px 0px 26px -20px #000000;
    box-shadow: inset 0px 0px 26px -20px #000000;
    display: flex;
    align-items: center;
}

.header_container {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.input_search input {
    padding: 0.5em;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1em;
    background: transparent;
    border: 1px solid grey;
    border-left-width: 0px;
    border-right-width: 0px;
    color: #381a1a;
    font-family: 'Alkatra', cursive;
}

.input_search input:focus {
    background-color: #77717138;
    border: none;
}

.category-show {
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-show p {
    margin: 0;
    font-size: 28px;
    color: white;
    text-transform: capitalize;
    font-family: 'Caveat', cursive;
}

.logo_single {
    width: 70%;
    text-align: right;
}

.logo a,
.logo_single a {
    font-size: 28px;
    letter-spacing: 0.3px;
    color: rgb(255, 255, 255);
    font-family: PT;
    font-family: 'PT Serif', serif;
    font-weight: 500;
    line-height: 1em;
    cursor: pointer;
    text-shadow: 1px 1px 3px #2b1504b9;

}

.logo_single a:hover {
    text-shadow: 0px 0px 2px #00000025;
}

@media (max-width: 1099px) {
    .header {
        width: 100%;
        left: 0;
    }

    .header_container {
        width: 80%;

    }

    .input_search {
        padding-left: 2.5em;
    }

    .logo_single {
        width: 50%;
    }

    .category-show p {
        font-size: 24px;
        padding-left: 2em;
    }
}

@media (max-width: 700px) {

    .header_container {
        width: 85%;
    }

    .input_search input {
        padding: 0.2em;
        border-radius: 4px;
        font-size: 14px;
        line-height: 1em;
    }
}

@media (max-width: 590px) {

    .input_search input {
        display: none;
    }

    .header_container {
        width: 85%;
        justify-content: space-between;
    }

    .logo a,
    .logo_single a {
        font-size: 20px;
    }

    .logo_single {
        width: 40%;
    }

    .category-show p {
        font-size: 22px;
        padding-left: 1.3em;
    }
}

@media (max-width: 400px) {
    .logo_single {
        width: 35%;
    }

    .logo a,
    .logo_single a {
        font-size: 17px;
    }

    .category-show p {
        font-size: 19px;
        padding-left: 1.4em;
    }
}</style>
