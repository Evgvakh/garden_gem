<template>
    <div>
        <select :name="name" id="" v-model="optionValue" @change="setValue">
            <option disabled>{{ selectedName }}</option>
            <option v-for="option in options" :value="option.id">{{ option.name }}</option>
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
        },
        optionId: Number
    },
    data() {
        return {
            optionValue: 300            
        }
    },
    methods: {
        setValue() {
            this.$emit('update:modelValue', this.optionValue)
        }        
    },

    computed: {
        selectedName() {
            if (this.optionId != 0) {
                let arr = this.options.filter(option => { return option.id == this.optionId })
                return arr[0].name
            } else {
                return this.title
            }
        },

        selectedCatId() {
            if (this.optionId != 0) {let arr = this.options.filter(option => { return option.name === this.selectedName })
                return arr[0].id
            } else { return 300; }
        }
    }
}
</script>

<style scoped>
 option, select {
    text-transform: capitalize;
    padding: 0.3em 0.5em;
    border-radius: 7px;
 }
</style>