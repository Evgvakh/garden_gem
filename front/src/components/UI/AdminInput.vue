<template>
    <input type="text" v-model="name" @change="handleChange">
</template>

<script>
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        handleChange(e) {
            this.$emit('update:modelValue', this.name)
        }
    }
}
</script>

<style scoped></style>