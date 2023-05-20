<template>
    <select class="select" v-model="optionValue" @change="setNewValue">
        <option disabled :value="optionValue">{{ optionValue }} {{ name }}</option>
        <option v-for="(option, i) in options" :value="option">{{ option }} gems per page</option>
    </select>
</template>

<script>

export default {
    props: {
        options: Array,
        name: String,
        itemsNumber: Number
    },

    data() {
        return {
            optionValue: 0
        }
    },
    methods: {
        setOptionValue() {
            this.optionValue = this.itemsNumber
        },
        setNewValue() {
            this.$emit('update:modelValue', this.optionValue)
        }
    },
    mounted() {
        this.setOptionValue()
    },

}
</script>

<style scoped>    
    .select {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 15px;
        border-radius: 6px;
        padding: 0.6em;
        position: relative;
        cursor: pointer;
    }

    .select:active {
        outline: none;
        border-radius: 10px;
    }

    .select option {                      
        text-align: center;        
        color: #121212;         
    }

    .select::-ms-expand {
        display: none;
    }
</style>