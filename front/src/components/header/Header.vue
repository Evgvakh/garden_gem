<template>
    <div class="header">
        <div class="header_container">
            <div class="input_search">
                <input type="text" :value="modelValue" @input="updateInput" :placeholder="placeholder" />
            </div>
            <div class="logo"><a @click="$router.push('/')">GardenGem</a></div>
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
@import url('https://fonts.googleapis.com/css2?family=Forum&family=Lilita+One&display=swap');
.header {
    width: 83%;
    /* background-color: #282726; */
    background-color: #563838;    
    padding: 1.2em 3em;
    position: fixed;
    top: 0; left: 17%;
    z-index: 100;       
}

.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; 
}

.search_item {
    width: 25%;
}

.input_search input {
    padding: 0.4em;
    outline: none;
    border: none;
    border-radius: 6px;
    font-size: 16px;
}
.logo {
    
}

.logo a {
    font-size: 30px;
    color: rgb(255, 255, 255);
    font-family: 'Forum', cursive;
    font-weight: 700;
    line-height: 1em;
    cursor: pointer;
}
</style>
