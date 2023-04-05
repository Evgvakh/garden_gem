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
.checkbox-container {
    display: flex;
    align-items: center;
}

.checkbox-container label {
    line-height: 1em;
    margin-left: 0.4em;
    font-size: 16px;
    text-transform: capitalize;
}

.checkbox {
    width: 23px;
    height: 23px;
    border: 1px solid black;
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
    font-size: 23px;
    position: absolute;
    top: 0;
    left: 5%;
    transition: all .1s ease-in;
}

input:not(:checked)~.icon {
    opacity: 0;
}


input:checked~.icon {
    opacity: 1;
}
</style>