<template>
    <Header v-model="searchQuery" placeholder="Search your gem here" :isSearchNeeded="false"/>
    <div class="container">
        <div class="filter-block">
            <div class="filters">
                <div class="filter-container">
                    <div class="label"><p>Price</p></div>
                    <Filter class="filter filter-price" v-model="priceQuery" :max="maxPrice" step="5" />
                </div>
                <div class="filter-container">
                    <div class="label"><p>Weight</p></div>
                    <Filter class="filter filter-weight" v-model="weightQuery" :max="maxWeight" step=0.025 />
                </div>
            </div>
            <div class="checkboxes">        
                <div><p>Cut</p></div>
                <div class="checkbox-block cut-filter">                
                    <Checkbox class="checkbox-block__item" v-for="item in cut" :key="item.id" :label="item"  v-model="filterCuts"
                        @addCat="addCutToArray"/>
                </div>
            </div>
        </div>    
        <ItemsCards v-if="this.filteredCutGems.length > 0 && !isLoading" :gems="this.filteredCutGems" />
    </div>
</template>

<script>
import axios from "@/axios";
import Header from "@/components/header/Header.vue";
import ItemsCards from "@/components/items/ItemsCards.vue";
import Filter from "@/components/UI/Filter.vue";
import Checkbox from "@/components/UI/Checkbox.vue";

export default {
    components: {
        Header,
        ItemsCards,
        Filter,
        Checkbox
    },
    data() {
        return {            
            gems: [],            
            cut: [],
            filterCuts: [],
            maxPrice: 0,
            maxWeight: 0,
            priceQuery: {
                min: 0,
                max: 1000000
            },
            weightQuery: {
                min: 0,
                max: 1000000
            },
            isLoading: false,
            limit: 20,
            offset: 0,
            categoryNumber: 0,
            searchQuery: "",
            priceQuery: {
                min: 0,
                max: 1000000
            }
        };
    },
    methods: {
        async fetchItems() {
            this.isLoading = true;
            const { data } = await axios.get(`/gems/${this.categoryNumber}`);
            this.gems = data;            
            this.isLoading = false;
        },

        setCategoryNumber() {
            this.categoryNumber = this.$route.params.id
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
        },

        clearCutFilter() {
            this.cut = []
        }        
    },

    async mounted() {
        this.setCategoryNumber();
        await this.fetchItems();
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

        filteredCutGems() {
            if (this.filterCuts.length > 0) {
                return this.searchedAndFilteredGems.filter(item => {
                    return this.filterCuts.some(cut => item.cut.includes(cut))
                })
            } else {
                return this.searchedAndFilteredGems;
            }
        }        
    },

    watch: {
        async "$route.params.id"() {
            this.categoryNumber = this.$route.params.id;
            await this.fetchItems();
            this.calculateMaxPrice();
            this.calculateMaxWeight();
            this.clearCutFilter();
            this.getCut()
        },
    },
};
</script>

<style scoped>
.container {
    margin: 0 auto;
    margin-top: 8vh;
    width: 90%;
}

h3 {
    line-height: 1em;
    margin: 0;
    padding: 0;
    font-family: 'PT Serif', serif;
    color: white;
}

h4 a {
    font-family: 'PT Serif', serif;
    font-size: 22px;
}

h4 a:hover {
    font-weight: 500;
}

* p {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0; 
}

.container h4, .container h6, .container p {       
    color: white;
    margin: 0; padding: 0;
    font-family: 'Open Sans', sans-serif;
}

.sorted_gemspage-wrapper {
    width: 90%;
    margin: 0 auto;
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

@media (max-width: 700px) {

    .container {
        width: 97%;
    }    
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
}
</style>
