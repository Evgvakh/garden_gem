<template>
    <div class="header">
        <div class="header_container">
            <div v-if="isSearchNeeded" class="input_search">
                <input 
                    type="text" 
                    :value="modelValue" 
                    @input="updateInput" 
                    :placeholder="placeholder" 
                />
            </div>
            <div class="logo">
                <a 
                    @click="$router.push('/')"
                >Gem Garden</a>
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
        }
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
    background-color: #563838; 
    position: fixed;
    top: 0; left: 17%;
    z-index: 100;
    -webkit-box-shadow: 0px 6px 12px -6px #000000; 
    box-shadow: 0px 6px 12px -6px #000000;       
}

.header_container {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5em 0;   
    margin: 0 auto; 
}

.search_item {
    width: 25%;
}

.input_search input {
    padding: 0.4em;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1em;
}
.logo {
    justify-self: flex-end;
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
