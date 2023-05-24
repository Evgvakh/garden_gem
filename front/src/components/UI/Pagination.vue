<template>
    <div class="pagination-main" :class="[isTop ? 'top' : 'bottom']">
        <div class="pagination__list-wrapper">
            <div>
                <ul>
                    <li v-for="(page, index) in pages" :class="[currentPage == index ? 'active' : '']">
                        <a :id="index" @click="$emit('setPage', index)">
                            {{ index + 1 }}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <Select v-if="isTop" :options="pagesOptions" :name="'Gems per page'" :itemsNumber="itemsNumber"
                    v-model="itemsPerPage" />
            </div>
        </div>
    </div>
</template>

<script>
import Select from '@/components/UI/Select.vue';
export default {
    components: {
        Select
    },
    props: {
        pages: Number,
        currentPage: Number,
        itemsNumber: Number,
        isTop: Boolean
    },
    data() {
        return {
            pagesOptions: [5, 10, 15, 20, 30, 50],
            itemsPerPage: 20
        }
    },
    methods: {
        addTotalItemsNumber() {
            if (this.itemsNumber > this.pagesOptions) {
                this.pagesOptions.push(this.itemsNumber)
            }
        }
    },
    watch: {
        itemsPerPage(curr, prev) {
            this.$emit('setItemsNumber', curr)
        }
    },
    mounted() {
        this.itemsPerPage = this.itemsNumber
        this.addTotalItemsNumber()
    }
}
</script>

<style scoped>
.pagination-main.top {    
    background: rgb(73,153,156);
    background: linear-gradient(90deg, rgba(73, 153, 156, 0.854) 20%, rgba(163,211,111,0.8799894957983193) 50%, rgba(73, 153, 156, 0.854) 80%);
    -webkit-box-shadow: inset 0px 0px 21px -15px #000000;
    box-shadow: inset 0px 0px 21px -15px #000000;
    border-radius: 2px;    
}

.top .pagination__list-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2em 1.5em;
}

.top .pagination__list-wrapper ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
}

.top .pagination__list-wrapper ul li {
    margin-right: 0.4em;
    border: 1px solid white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top .pagination__list-wrapper ul li.active {
    border: 3px solid rgb(255, 255, 255);
    cursor: default;
    box-shadow: inset 0px 0px 25px -11px #fffefe;
}

.top .pagination__list-wrapper ul li a {
    font-size: 16px;
    padding: 0.2em 0.4em;
    text-decoration: none;
    color: white;
    line-height: 1em;
}

.pagination-main.bottom {
    background-color: #eee0e149;
    margin-bottom: 2em;
}

.bottom .pagination__list-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.7em;
}

.bottom .pagination__list-wrapper ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
}

.bottom .pagination__list-wrapper ul li {
    margin-right: 0.6em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom .pagination__list-wrapper ul li.active {
    font-weight: 700;
    text-decoration: underline;
    cursor: default;
}

.bottom .pagination__list-wrapper ul li a {
    font-size: 16px;
    padding: 0.2em 0.4em;
    text-decoration: none;
    color: #121212;
    line-height: 1em;
}

@media (max-width: 450px) {
  .top .pagination__list-wrapper ul li a {
    font-size: 12px;
    padding: 0.2em 0.4em;
    text-decoration: none;
    color: white;
    line-height: 1em;
}
}

</style>