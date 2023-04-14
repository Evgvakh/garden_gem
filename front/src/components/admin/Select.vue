<template>
    <div>
        <select :name="name" id="" v-model="optionValue" @change="setValue">
            <option value="300" disabled selected>{{ title }}</option>
            <option v-for="option in options" :value="option.id" >{{ option.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        },
        title: {
            type: String
        },
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            optionValue: 300,
        }
    },
    methods: {
        setValue() {
            this.$emit('update:modelValue', this.optionValue)
        }
    }
}
</script>

<style scoped>
 option, select {
    text-transform: capitalize;
 }
</style>