<template>
    <div class="failed-search">
        <h2>We're sorry :( <br> No items matching your search criteria were found.</h2>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito+Sans:wght@700&display=swap');
    .failed-search {
        padding: 3em 5em;
    }

    .failed-search h2 {
        font-size: 40px;
        padding: 0; margin: 0;
        line-height: 1.3em;
        font-family: 'Nunito Sans', sans-serif;
        letter-spacing: 1.2px;
        color: #563838;
        text-align: center;
    }
</style>