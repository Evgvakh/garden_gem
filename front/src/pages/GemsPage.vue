<template>
    <div class="container">
        <Header v-model="searchQuery" placeholder="Find your gem by name" :isSearchNeeded="true" />
        <div class="recently_added">
            <ProgressSpinner v-if="isLoading" style="width: 150px; height: 150px; position: fixed; top:45%; left: 55%"
                strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            <h3 v-if="!isLoading">Recently added</h3>
            <Carousel v-if="!isLoading" :value="items" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions"
                circular :autoplayInterval="4000">
                <template #item="slotProps">
                    <div class="item text-center">
                        <div class="item__img"
                            :style="{ backgroundImage: `url(https://gemgarden.herokuapp.com/uploads/img/IMG_0727.jpg)` }">
                            <div class="item__text">
                                <h4><a style="cursor: pointer;" @click="$router.push(`/collection/${slotProps.data.id}`)">{{
                                    slotProps.data.color }} {{
        slotProps.data.category }}</a></h4>
                                <div class="price_weight">
                                    <h6>${{ (slotProps.data.price * slotProps.data.weight).toFixed(0) }}</h6>
                                    <h6 class="weight">{{ slotProps.data.weight.toFixed(2) }} ct.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>
    <div class="gemspage-wrapper">
        <div v-if="!isLoading" class="cats">
            <button class="cat_button" v-for="cat in cats" @click="$router.push(`/gems/${cat.id}`)"> {{ cat.name }}</button>
        </div>
        <div v-if="!isLoading" class="filter-block">
            <div class="filters">
                <div class="filter-container">
                    <div class="label">
                        <p>Price</p>
                    </div>
                    <Filter class="filter filter-price" v-model="priceQuery" :max="maxPrice" step="5" />
                </div>
                <div class="filter-container">
                    <div class="label">
                        <p>Weight</p>
                    </div>
                    <Filter class="filter filter-weight" v-model="weightQuery" :max="maxWeight" step=0.025 />
                </div>
            </div>
            <div class="checkboxes">
                <div>
                    <p>Gem</p>
                </div>
                <div class="checkbox-block cat-filter">
                    <Checkbox class="checkbox-block__item" v-for="cat in cats" :key="cat.id" :label="cat.name"
                        v-model="filterCats" @addCat="addCatToArray" />
                </div>
                <div>
                    <p>Cut</p>
                </div>
                <div class="checkbox-block cut-filter">
                    <Checkbox class="checkbox-block__item" v-for="item in cut" :key="item.id" :label="item"
                        v-model="filterCuts" @addCat="addCutToArray" />
                </div>
            </div>
        </div>
        <ItemsCards v-if="!isLoading && this.filteredCutGems.length > 0" :gems="this.filteredCutGems" />
        <FailedSearch v-else-if="this.filteredCutGems.length == 0 && !isLoading" />
    </div>
</template>

<script>
import axios from '@/axios';
import ItemsCards from '@/components/items/ItemsCards.vue'
import Header from '@/components/header/Header.vue';
import Filter from '@/components/UI/Filter.vue';
import Checkbox from '@/components/UI/Checkbox.vue';
import FailedSearch from '@/components/FailedSearch.vue';

export default {
    components: {
        ItemsCards,
        Header,
        Filter,
        Checkbox,
        FailedSearch
    },

    data() {
        return {
            items: [],
            gems: [],
            cats: [],
            filterCats: [],
            cut: [],
            filterCuts: [],
            isLoading: false,
            limit: 20,
            offset: 0,
            searchQuery: "",
            priceQuery: {
                min: 0,
                max: 1000000
            },
            weightQuery: {
                min: 0,
                max: 1000000
            },
            minPrice: 0,
            minWeight: 0,
            maxPrice: 0,
            maxWeight: 0,
            responsiveOptions: [
                {
                    breakpoint: '1524px',
                    numVisible: 3,
                    numScroll: 1
                },
                {
                    breakpoint: '1230px',
                    numVisible: 3,
                    numScroll: 1
                },
                {
                    breakpoint: '1100px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '631px',
                    numVisible: 1,
                    numScroll: 1
                }
            ]
        }
    },
    methods: {
        async fetchCarouselItems() {
            this.isLoading = true;
            const { data } = await axios.get('/gemscarousel');
            this.items = data;
            this.isLoading = false;
        },

        async fetchItems() {
            this.isLoading = true;
            const { data } = await axios.get(`/gems`);
            this.gems = data;
            this.isLoading = false;
        },

        async fetchCats() {
            this.isLoading = true;
            const { data } = await axios.get(`/cats`);
            this.cats = data;
            this.isLoading = false;
        },

        calculateMaxPrice() {
            const sortedArr = [...this.gems].sort((gem1, gem2) => {
                return gem2.price - gem1.price
            })
            this.maxPrice = Number(sortedArr[0].price);
        },

        calculateMaxWeight() {
            const sortedArr = [...this.gems].sort((gem1, gem2) => {
                return gem2.weight - gem1.weight
            })
            this.maxWeight = Number(sortedArr[0].weight.toFixed(2));
        },

        addCatToArray(cat) {
            if (!this.filterCats.includes(cat)) {
                this.filterCats.push(cat);
            } else {
                this.filterCats.splice(this.filterCats.indexOf(cat), 1)
            }
        },

        addCutToArray(cut) {
            if (!this.filterCuts.includes(cut)) {
                this.filterCuts.push(cut);
            } else {
                this.filterCuts.splice(this.filterCuts.indexOf(cut), 1)
            }
        },

        getCut() {
            this.gems.map(gem => {
                this.cut.push(gem.cut)
            })
            let newArr = this.cut.reduce(function (accumulator, currentValue) {
                if (accumulator.indexOf(currentValue) === -1) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
            this.cut = newArr;
        }

    },

    async mounted() {
        await this.fetchCarouselItems()
        await this.fetchItems();
        await this.fetchCats();
        this.calculateMaxPrice();
        this.calculateMaxWeight();
        this.getCut()
    },

    computed: {
        searchedGems() {
            return this.gems.filter((gem) =>
                gem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        searchedAndFilteredGems() {
            return this.searchedGems.filter((gem) => {
                return gem.price >= this.priceQuery.min && gem.price <= this.priceQuery.max && gem.weight >= this.weightQuery.min && gem.weight <= this.weightQuery.max
            })
        },

        filteredGems() {
            if (this.filterCats.length > 0) {
                return this.searchedAndFilteredGems.filter(item => {
                    return this.filterCats.some(cat => item.category.includes(cat))
                })
            } else {
                return this.searchedAndFilteredGems;
            }
        },

        filteredCutGems() {
            if (this.filterCuts.length > 0) {
                return this.filteredGems.filter(item => {
                    return this.filterCuts.some(cut => item.cut.includes(cut))
                })
            } else {
                return this.filteredGems;
            }
        }

    },

    watch: {
    }
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;700&display=swap');

h3 {
    line-height: 1em;
    margin: 4em 0 0.6em 0;
    padding: 0;
    text-align: center;
    font-size: 22px;
    font-family: 'PT Serif', serif;
    font-family: 'Baloo Tamma 2', cursive;
    animation: changeColor 1s infinite;
}

@keyframes changeColor {
    0% {
        color: black;
    }

    25% {
        color: #563838;
    }

    50% {
        color: #77262bbb;
    }

    75% {
        color: #ca564e3b;
    }

    100% {
        color: black;
    }
}

h4 a {
    font-family: 'PT Serif', serif;
    font-size: 22px;
    text-transform: capitalize;
}

h4 a:hover {
    font-weight: 500;
}

* p {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
}

.container h4,
.container h6,
.container p {
    color: white;
    margin: 0;
    padding: 0;
}

.container {
    margin: 0 auto;
}

.gemspage-wrapper {
    width: 85%;
    margin: 0 auto;
}

.recently_added {
    background-color: rgb(253, 253, 253);
    margin-top: 12vh;
}

.item {
    padding: 0;
    margin: 0 2em;
    background-color: #563838;
    height: 220px;
    min-width: 200px;

}

.item__img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: inset 0px 0px 26px -6px #000000;
    box-shadow: inset 0px 0px 26px -6px #000000;
}

.item__text {
    padding: 4em 0.2em;
    position: absolute;
    top: 100%;
    opacity: 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(170deg, rgba(0, 0, 0, 0.541) 35%, rgba(0, 0, 0, 0.842) 68%);
    width: 100%;
    height: 100%;
    transition: all .4s ease-out;
}

.item__img:hover .item__text {
    top: 0;
    opacity: 1;
}

.price_weight {
    display: flex;
    justify-content: space-between;
    width: 65%;
    margin: 0 auto;
}

.cats {
    padding: 2em 5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #eee0e149;
}

.cat_button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 23px;
    color: #77262bbb;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    width: fit-content;
    min-width: 13%;
    margin-right: 0.7em;
    margin-bottom: 0.6em;
    padding: 0.3em;
    cursor: pointer;
    transition: color .3s ease-out;
    transition: background .3s ease-out;
}

.cat_button:hover {
    background-color: #77262bbb;
    color: white;
}

.checkbox-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.8em;
}

.checkbox-block__item {
    margin-right: 0.3em;
    width: fit-content;
    min-width: 23%;
}

.checkboxes div p {
    margin-bottom: 0.4em;
    font-weight: 700;
}

.filter-block {
    background-color: #e0e8f349;
    border-top: 1px solid rgba(168, 149, 149, 0.329);
    -webkit-box-shadow: 0px -1px 29px -15px #787878;
    box-shadow: 0px -1px 29px -15px #787878;
    padding: 1em 3em;
    display: flex;
}

.filters {
    width: 40%;
}

.checkboxes {
    width: 60%;
}

.filter-container {
    width: 100%;
    margin-bottom: 0.4em;
}

.filter-container label {
    width: 20%;
}

.filter-container div p,
.checkboxes div p {
    color: #121212;
    font-size: 20px;
    font-weight: 700;
    line-height: 1em;
    margin-bottom: 0.2em;
}

.filter {
    width: 80%;
}

@media (max-width: 1100px) {
    .gemspage-wrapper {
        width: 93%;
    }
}

@media (max-width: 700px) {
    .filter-block {
        display: block;
    }

    .filters {
        width: 100%;
    }

    .checkboxes {
        width: 100%;
    }

    .filter {
        width: 100%;
    }

    .checkbox-block__item {
        margin-right: 1em;
    }
}
</style>