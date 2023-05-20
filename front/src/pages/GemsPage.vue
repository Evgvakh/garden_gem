<template>
    <div class="container">
        <Header v-model="searchQuery" placeholder="Find your gem by name" :isSearchNeeded="true" />
        <div class="recently_added">
            <ProgressSpinner v-if="isLoading" class="progress-spinner" 
                strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            <h3 v-if="!isLoading">Recently added</h3>
            <Carousel v-if="!isLoading" :value="items" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions"
                circular :autoplayInterval="4000">
                <template #item="slotProps">
                    <div class="item text-center">
                        <div class="item__img"
                            :style="{ backgroundImage: slotProps.data.titleImg.length > 0 ? `url(http://localhost:8081/${slotProps.data.titleImg})` : 'none' }">
                            <div class="item__text">
                                <h4><a style="cursor: pointer;" @click="$router.push(`/collection/${slotProps.data.id}`)">{{
                                    slotProps.data.color }} {{ slotProps.data.category }}</a></h4>
                                <div class="price_weight">
                                    <h6>${{ (slotProps.data.price * slotProps.data.weight).toFixed(0) }}</h6>
                                    <h6 class="weight">{{ slotProps.data.weight.toFixed(2) }} ct.</h6>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="item__img"
                            :style="{ backgroundImage: `url(https://gemgarden.herokuapp.com/${slotProps.data.images[0]["img"] ? slotProps.data.images[0]["img"] : uploads/img/IMG_0727.jpg})` }">
                            <div class="item__text">
                                <h4><a style="cursor: pointer;" @click="$router.push(`/collection/${slotProps.data.id}`)">{{
                                    slotProps.data.color }} {{ slotProps.data.category }}</a></h4>
                                <div class="price_weight">
                                    <h6>${{ (slotProps.data.price * slotProps.data.weight).toFixed(0) }}</h6>
                                    <h6 class="weight">{{ slotProps.data.weight.toFixed(2) }} ct.</h6>
                                </div>
                            </div>
                        </div> -->

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
            <div class="filters-button">
                <button @click="popUpFilters">{{ filterButtonText[Number(buttonTextIndex)] }}</button>
            </div>
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
                    <Checkbox class="checkbox-block__item" v-for="cat in cats.slice(0, isAllCats ? cats.length + 1 : 8)" :key="cat.id" :label="cat.name"
                        v-model="filterCats" @addCat="addCatToArray" />                    
                </div>
                <div class="checkboxes-button">
                        <button @click="popUpCats">{{ checkboxesButtonText[Number(checkboxButtonTextIndex)] }}</button>
                </div>
                <div v-if="isAllFilters">
                    <div>
                        <p>Cut</p>
                    </div>
                    <div class="checkbox-block cut-filter">
                        <Checkbox class="checkbox-block__item" v-for="item in this.cut" :key="item.id" :label="item"
                            v-model="filterCuts" @addCat="addCutToArray" />
                    </div>
                    <div>
                        <p>Color</p>
                    </div>
                    <div class="checkbox-block cut-filter">
                        <Checkbox class="checkbox-block__item" v-for="item in this.colors" :key="item.id" :label="item"
                            v-model="filterColors" @addCat="addColorToArray" />
                    </div>
                    <div>
                        <p>Sales</p>
                    </div>
                    <div class="checkbox-block cut-filter">
                        <Checkbox class="checkbox-block__item" v-for="item in this.sale" :key="item.id" :label="item"
                            v-model="filterColors" @addCat="addSaleToArray" />
                    </div>
                </div>
            </div>
        </div>        
        <ItemsCards v-if="!isLoading && this.filteredSaleGems.length > 0" :gems="this.filteredSaleGems" />
        <FailedSearch v-else-if="this.filteredSaleGems.length == 0 && !isLoading" />
    </div>
</template>

<script>
import axios from '@/axios';
import ItemsCards from '@/components/items/ItemsCards.vue'
import Header from '@/components/header/Header.vue';
import Filter from '@/components/UI/Filter.vue';
import Checkbox from '@/components/UI/Checkbox.vue';
import FailedSearch from '@/components/FailedSearch.vue';
import 'primeicons/primeicons.css';

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
            colors: [],
            filterColors: [],
            sale: ['sale'],
            filterSale: [],
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
            isAllFilters: false,
            isAllCats: false,
            filterButtonText: ['more filters', 'less filters'],
            checkboxesButtonText: ['more gems', 'less gems'],
            buttonTextIndex: false,
            checkboxButtonTextIndex: false,
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
            this.items = data.filter(el => {
                return el.availability == 'yes'
            });
            this.isLoading = false;
        },
        async fetchItems() {
            this.isLoading = true;
            const { data } = await axios.get(`/gems`);
            this.gems = data.filter(el => {
                return el.availability == 'yes'
            });;
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
            this.maxPrice = Number(sortedArr[0].price * sortedArr[0].weight);
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
        addColorToArray(color) {
             if (!this.filterColors.includes(color)) {
                this.filterColors.push(color);
            } else {
                this.filterColors.splice(this.filterColors.indexOf(color), 1)
            }
        },
        addSaleToArray(sale) {
             if (!this.filterSale.includes(sale)) {
                this.filterSale.push(sale);
            } else {
                this.filterSale.splice(this.filterSale.indexOf(sale), 1)
            }
        },

        popUpFilters() {
            this.isAllFilters = !this.isAllFilters;
            this.buttonTextIndex = !this.buttonTextIndex
            this.filterCuts = []
            this.filterSale = []
            this.filterColors = []            
        },
        popUpCats() {
            this.isAllCats = !this.isAllCats;
            this.checkboxButtonTextIndex = !this.checkboxButtonTextIndex;
            this.resetCatFilters()            
        },

        getCut() {
            let arr = []
            this.gems.map(gem => {
                arr.push(gem.cut)
            })
            let newArr = arr.reduce(function (accumulator, currentValue) {
                if (accumulator.indexOf(currentValue) === -1) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
            this.cut = newArr;
        },
        getColor() {
            let arr = []
            this.gems.map(gem => {
                arr.push(gem.color)
            })
            let newArr = arr.reduce(function (accumulator, currentValue) {
                if (accumulator.indexOf(currentValue) === -1) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
            this.colors = newArr;
        },        

        resetCatFilters() {
            this.filterCats.forEach(cat => {
                if (this.cats.slice(8, this.cats.length + 1).some(item => item.name === cat)) {
                    this.filterCats.splice(this.filterCats.indexOf(cat), 1)
                }
            })
        }
    },

    async mounted() {
        await this.fetchCarouselItems()
        await this.fetchItems();
        await this.fetchCats();
        this.calculateMaxPrice();
        this.calculateMaxWeight();
        this.getCut();
        this.getColor();        
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
        },

        filteredColorGems() {
            if (this.filterColors.length > 0) {
                return this.filteredCutGems.filter(item => {
                    return this.filterColors.some(color => item.color.includes(color))
                })
            } else {
                return this.filteredCutGems;
            }
        },
        filteredSaleGems() {
            if (this.filterSale.length > 0) {
                return this.filteredColorGems.filter(item => {
                    return item.onsale == 'yes'
                })
            } else {
                return this.filteredColorGems;
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
@import 'primeicons/primeicons.css';
h3 {
    line-height: 1em;
    margin: 4em 0 0.6em 0;
    padding: 0;
    text-align: center;
    font-size: 24px;    
    font-family: 'Baloo Tamma 2', cursive;
    animation: changeColor 1s infinite;
}

@keyframes changeColor {
    0% {
        color: rgba(73,153,156,1);
    }

    25% {
        color: #56383896;
    }

    50% {
        color: rgba(73,153,156,1)
    }

    75% {
        color: #ca564e3b;
    }

    100% {
        color: black;
    }
}

.progress-spinner {
    width: 150px;
    height: 150px;
    position: fixed; 
    top:45%; left: 55%
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
    height: 230px;
    
}

.p-carousel-item {
    border-radius: 20px;
}

.item__img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: inset 0px 0px 56px -0px #000000;
    box-shadow: inset 0px 0px 56px 0px #000000;
    
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
    border-top: 2px solid white;
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
    padding: 1.3em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;    
    background-color: rgba(73, 153, 156, 0.100);
    
}

.cat_button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 23px;    
    color: #554c4c;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    width: fit-content;
    min-width: 19%;
    margin-right: 0.3em;
    margin-bottom: 1.5em;
    padding: 0.2em 0.5em;
    cursor: pointer;
    transition: color .3s ease-out;
    transition: background .3s ease-out;
}
.cat_button:hover {    
    color:  rgb(99, 102, 241);
}

.checkbox-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.8em;
}

.checkbox-block__item {
    margin-right: 0.2em;
    margin-bottom: 0.5em;
    width: fit-content;
    min-width: 24%;
}

.checkboxes div p {
    margin-bottom: 0.4em;
    font-weight: 700;
}

.filter-block {
    background-color: #e0e8f349;
    border-top: 1px solid rgba(168, 149, 149, 0.329);
    -webkit-box-shadow: 0px -1px 21px -11px #787878;
    box-shadow: 0px -1px 21px -11px #787878;
    padding: 1em 1.5em 3em 1.5em;
    display: flex;
    position: relative;
}

.filters {
    width: 40%;
}

.checkboxes {
    width: 60%;
    margin-bottom: 1em;
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

.filters-button {
    position: absolute;
    bottom: 2%;
    right: 1%;
}

.filters-button button, .checkboxes-button button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    color: #563838b4;
    text-transform: capitalize;
    font-weight: 700;
}

.checkboxes-button {
    margin: 0 0 0.8em 0;
}

.checkboxes-button button {
    padding: 0;
}

@media (max-width: 1100px) {
    .gemspage-wrapper {
        width: 93%;
    }

    .progress-spinner {
        width: 180px;
        height: 180px;        
        top:45%; left: 40%
    }

    .checkbox-block__item {
        margin-right: 0.3em;
        width: fit-content;
        min-width: 28%;
    }
}

@media (max-width: 745px) {
    .progress-spinner {
        width: 80px;
        height: 80px;        
        top:45%; left: 40%
    }
    .cats {
        padding: 1em;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #eee0e149;
    }

    .cat_button {
        font-size: 13px;
        width: fit-content;
        min-width: 31%;
        text-align: center;
        margin-right: 0.3em;
        margin-bottom: 0.6em;
        padding: 0;
        cursor: pointer;
        transition: color .3s ease-out;
        transition: background .3s ease-out;
    }

    .filter-block {
        display: block;
        padding: 1.5em 1.2em;
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

    .checkbox-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 0.8em;
    }

    .checkbox-block__item {        
        min-width: 30%;        
    }

    .checkbox-block__item {
        margin-right: 1em;
    }    
}

@media (max-width: 745px) {
    .checkbox-block__item {        
        min-width: 40%;        
    }

    .checkbox-block__item label {
        font-size: 14px;
    }
}
</style>