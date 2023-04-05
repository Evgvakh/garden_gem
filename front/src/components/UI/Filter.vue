<template>
    <div class="filter__container">             
        <q-range
        v-model="range"
        :min="0"
        :max="max + 5"
        :step="step"
        label-always
        color="red-10"
        label-color="lime-3"
        track-color="lime-3"
        label-text-color="red-10"
        @change="showValues"
    />
    </div>
</template>

<script>
export default {
    name: 'Filter',    
    props: {
        max: {
            type: Number
        },
        step: {
            type: Number
        }
    },
    data() {        
        return {             
            range: {
                min: 0,
                max: 10000
            }
        }
    },

    methods: {
        showValues() {
            this.$emit('update:modelValue', this.range)
            console.log(this.range)
        }
    },


}
</script>

<style scoped>
.filter__container {
    padding: 1em 0 2em 0;
    width: 70%;
    margin: 0 auto;
    display: flex;
}

.price__slider {
    position: relative;
    width: 25%;
    text-align: center;
    height: fit-content;
}

label {
    position: absolute;
    top: 0;
}

#labelMin {
    left: 0;
}

#labelMax {
    right: 0;
}

.price__slider svg,
.price__slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    z-index: 2;
    position: relative;
    top: 3px;
    margin-top: -7px;
    background: rgb(209, 185, 185);
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

input[type=range]::-webkit-slider-thumb::before {
    content: '//';
    width: 10px;
    height: 10px;
}
</style>