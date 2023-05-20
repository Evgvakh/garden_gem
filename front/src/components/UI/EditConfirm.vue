<template>
    <div class="edit-confirm-wrapper" @click="$emit('confirmClose')">
        <div class="edit-confirm-window">
            <h4>Item id: {{ itemId }} field {{ fieldType }} has been changed</h4>
            <h4>Строка с ID: {{ itemId }} поле {{ fieldType }} было изменено</h4>
        </div>
    </div>
</template>

<script>
    export default {
    props: {
            itemId: Number,            
            fieldType: String
        }
    }
</script>

<style scoped>
    .edit-confirm-wrapper {
        position: fixed;
        display: flex;
        
        justify-content: center;
        align-items: center;
        top: 0; left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.764);
    }

    .edit-confirm-window {
        width: 33%; height: 33%;
        background-color: rgba(0, 0, 0, 0.822);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h4 {
        color: white;
        text-align: center;
        font-size: 16px;
    }
</style>