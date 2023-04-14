<template>
    <div class="admin-header">
        <div class="admin-header__wrapper">
            <button>Add new item</button>
            <button>Edit / Delete item</button>
        </div>
    </div>
    <div>
        <AddItem />
    </div>

    <div>
        <agile :slidesToShow="1">
            <div v-for="img in images" class="slide">
                <img :src="img.img" alt="">
            </div>
            <template slot="prevButton">prev</template>
            <template slot="nextButton">next</template>
        </agile>
    </div>
</template>

<script>
import AddItem from '@/components/admin/AddItem.vue';
import { VueAgile } from 'vue-agile'
export default {
    components: {
        AddItem,
        agile: VueAgile
    },
    data() {
        return {
            images: [
                { img: "https://gemgarden.herokuapp.com/uploads/img/IMG_0727.jpg" },
                { img: "https://gemgarden.herokuapp.com/uploads/img/IMG_1869.jpg" },
                { img: "https://gemgarden.herokuapp.com/uploads/img/IMG_3031.jpg" },
                { img: "https://gemgarden.herokuapp.com/uploads/img/IMG_3101.jpg" },
                { img: "https://gemgarden.herokuapp.com/uploads/video/video_2023-04-06_21-09-29.mp4" }
            ],
        }
    },
    methods: {
        route() {
            console.log(this.$route.path)
        }
    },
    mounted() {
        this.route()
    },

}
</script>

<style scoped>
img {
    width: 100px;
}</style>