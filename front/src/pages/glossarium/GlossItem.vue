<template>
    <div>
        <div class="gem__description__item">
            <h4>Description</h4>
            <p style="text-transform: none !important; line-height: 1.3em;"> <vue-markdown :source="markDown" /></p>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown-render'
export default {
    data() {
        return {
            markDown: "# dsadsa",
        }
    },
    methods: {
        async fetchItem() {
            this.isLoading = true;
            const { data } = await axios.get(`/collection/${this.$route.params.id}`)
            this.gem = data;
            this.markDown = data.description;
            this.isLoading = false;
        },
    }
}
</script>

<style scoped>

</style>