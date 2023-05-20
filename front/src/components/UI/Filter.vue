<template>
    <q-range 
        v-model="range" 
        :min="0" 
        :max="max + 1" 
        :step="step" 
        label 
        color="brown-3" 
        label-color="teal-4"
        track-color="grey-3" 
        label-text-color="lime-1"         
        track-size="2px" 
        thumb-size="18px" 
        thumb-color="teal-3"
        @change="showValues" 
    />
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
        }
    }
}
</script>

<style scoped></style>