<template>
    <div class="table__confirm_popup" @click="closeConfirm">
        <div class="table__confirm_popup__content">
            <p>Field {{ confirmField }} of the table {{ confirmTable }} has been succesfully chenged. Click anywere to proceed</p>
            <p>Поле {{ confirmField }} таблицы {{ confirmTable }} было успешно изменено. Нажмите в любом месте, чтобы проболжить.</p>
            <div class="table__confirm_popup__border">
            </div>
        </div>
    </div>
</template>

<script>
import { stringifyQuery } from 'vue-router';

export default {
    props: {
        confirmTable: String,
        confirmField: String
    },

    methods: {
        closeConfirm() {
            this.$emit('closeConfirm')
        }
    }
}
</script>

<style scoped>
.table__confirm_popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1414143d;
}

.table__confirm_popup__content {
    position: absolute;
    top: 25%;
    left: 30%;
    width: 40%;
    height: 30%;
    border-radius: 15px;
    border: 10px solid rgb(8, 3, 39);
    background-color: rgba(44, 55, 68, 0.919);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
}

.table__confirm_popup__content p {
    color: antiquewhite;
    font-size: 16px;
    width: 100%;
    text-align: justify;    
    margin: 2em;
    padding: 0 1em;
}

.table__confirm_popup__border {
    background: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    border: 10px solid rgba(29, 31, 41, 0.596);
    border-radius: 5px;
}</style>