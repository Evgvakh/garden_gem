<template>
    <div class="gloss_admin_item__container">
        <div class="gloss_admin_item__head">
            <p><b>Category:</b> </p>
            <p>{{ item.category }}</p>
        </div>
        <div class="gloss_admin_item__head">
            <p><b>Title:</b> </p>
            <p>{{ item.title }}</p>
        </div>        
        <div class="gloss_admin_item__text"> 
            <p v-if="this.textToggle === 'short'">{{ shortText }}</p>
            <p v-if="this.textToggle === 'full'">{{ item.text }}</p>
            <button @click="toggleText">{{ textToggle === 'short' ? 'More text / Развернуть текст' : 'Less text / Свернуть текст' }}</button>
        </div>
        <div class="gloss_admin_item__buttons">
            <button>Edit / Редактировать</button>
            <button>Delete / Удалить</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Array
    },
    data() {
        return {
            shortText: '',
            textToggle: 'short',
            toggleButtonText: ['More text', 'Less text']
        }
    },

    methods: {
        shortenText() {            
            const arr = this.item.text.split(' ').splice(0, 100)
            arr.push(' ...')
            this.shortText = arr.join(' ')            
        },
        toggleText() {
            this.textToggle === 'full' ? this.textToggle = 'short' : this.textToggle = 'full'
        }
    },
    mounted() {
        this.shortenText()
    }
}
</script>

<style  scoped>
.gloss_admin_item__container {
    padding: 2em;
    border: 2px solid #121212;
    border-radius: 7px;
    margin-bottom: 2em;
}

.gloss_admin_item__head {
    display: flex;
    margin-bottom: 1em;
}

.gloss_admin_item__head p {
    margin-right: 1em;
    font-size: 16px;
    text-transform: capitalize;
}

.gloss_admin_item__text {
    margin: 1em 0;
    font-size: 16px;
}

.gloss_admin_item__text button {
    border: none;
    background: transparent;
    margin: 1em 0;
    color: rgb(151, 143, 135);
    cursor: pointer;
}

.gloss_admin_item__text button:hover {
    color: rgb(48, 45, 42);
}

.gloss_admin_item__buttons {
    display: flex;
    width: 40%;
    justify-content: space-between;
}

.gloss_admin_item__buttons button {
    padding: 0.2em 0.5em;
    border-radius: 7px;
    cursor: pointer;
}

p {
    margin: 0; padding: 0;
}
</style>