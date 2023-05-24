<template>
    <div class="checkbox-container">
        <div class="checkbox">
            <input type="checkbox" @change="filterCat" :id="label" :value="label">
            <div class="fake-input"></div>
            <font-awesome-icon class="icon" icon="fa-solid fa-check" />
        </div>
        <div><label :for="label">{{ label }}</label></div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        modelValue: {
            type: Array
        }
    },

    methods: {
        filterCat(e) {
            this.$emit('addCat', e.target.value)
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.checkbox-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.2em;
}

.checkbox-container label {
    line-height: 1.5em;
    margin-left: 0.4em;
    font-size: 15px;
    color: #563838;
    font-family: 'Open Sans', sans-serif;
    text-transform: capitalize;
}

.checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid rgb(60, 60, 65);
    border-radius: 50%;
    position: relative;
    padding: 0;
}

.checkbox input {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
}

.checkbox .icon {
    font-size: 22px;
    position: absolute;
    top: -62%;
    right: -46%;
    color: #967373;  
    transition: all .2s ease-in;
}

input:not(:checked)~.icon {
    opacity: 0;
}

input:checked~.icon {
    opacity: 1;
}

@media (max-width: 450px) {
    .checkbox-container label {
        font-size: 14px;
    }
}
</style>