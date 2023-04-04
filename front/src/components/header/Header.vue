<template>
    <div class="header">
        <div class="input_search">
            <input type="text" :value="modelValue" @input="updateInput" :placeholder="placeholder" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: {
        gems: {
            type: Object,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            required: true,
        },
        placeholder: ''
    },

    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style scoped>
.header {
    width: 100%;
    /* background-color: #282726; */
    background-color: #563838;
    padding: 1em;
    position: fixed;
    top: 0; left: 17%;
    z-index: 100;    
}

.search_item {
    width: 25%;
}

.input_search input {
    padding: 0.5em;
    outline: none;
    border: none;
    border-radius: 6px;
    font-size: 16px;
}

.button {
    background-color: white;
}
</style>
