<template>
    <Header v-model="searchQuery" placeholder="Search your gem here" :isSearchNeeded="false" :isCategory="true" :category="categoryName" :subCategory="subCategoryName" />    
    <div v-if="!isLoading" class="category-description__main" :style="{backgroundImage: `url(http://localhost:8081/uploads/assets/360_F_196924770_obZVTtzRj4lofwUBRuXfa50rj9zbosZT.jpg)`}">
        <p :style="{textShadow: '10px 12px 3px rgba(18,18,18,0.11)'}">{{ description }}</p>
        <button @click="$router.push('/glossarium')">Learn more about <strong>{{ subCategoryName || categoryName }}</strong> in our Glossarium</button>
    </div>
    <div class="container">        
        <div v-if="!isLoading" class="filter-block">
            <div class="filters">
                <div class="filter-container">
                    <div class="label"><p>Price</p></div>
                    <Filter class="filter filter-price" v-model="priceQuery" :max="maxPrice" step=5 />
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
                <div>
                    <p>Color</p>
                </div>
                <div class="checkbox-block cut-filter">
                    <Checkbox class="checkbox-block__item" v-for="item in this.colors" :key="item.id" :label="item"
                        v-model="filterColors" @addCat="addColorToArray" />
                </div>
            </div>
        </div>    
        <ItemsCards v-if="this.filteredColorGems.length > 0 && !isLoading" :gems="this.filteredColorGems" />
        <FailedSearch v-else-if="this.filteredColorGems.length == 0 && !isLoading" />
    </div>
</template>

<script>
import axios from "@/axios";
import Header from "@/components/header/Header.vue";
import ItemsCards from "@/components/items/ItemsCards.vue";
import Filter from "@/components/UI/Filter.vue";
import Checkbox from "@/components/UI/Checkbox.vue";
import FailedSearch from "@/components/FailedSearch.vue";

export default {
    components: {
        Header,
        ItemsCards,
        Filter,
        Checkbox,
        FailedSearch
    },
    data() {
        return {            
            gems: [],            
            cut: [],
            filterCuts: [],
            colors: [],
            filterColors: [],
            description: '',            
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
            subCategoryNumber: 0,
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
            let data
            if (this.subCategoryNumber == 0) {
                let res = await axios.get(`/gems/${this.categoryNumber}`);
                data = res.data
            } else {
                let res = await axios.get(`/gems/${this.categoryNumber}`);
                data = res.data.filter(gem => {
                    return gem.id_subcategory == this.subCategoryNumber
                })
            }
            this.gems = data;            
            this.isLoading = false;
        },        

        async fetchDescription() {
            this.isLoading = true;
            let data
            if(this.subCategoryNumber !== 0) {
               let res = await axios.get(`/descr/subcategories/${this.subCategoryNumber}`)
               data = res.data
            } else {
               let res = await axios.get(`/descr/categories/${this.categoryNumber}`)
               data = res.data
            }
            this.description = data;            
            this.isLoading = false;            
        },

        setCategoryNumber() {
            this.categoryNumber = Number(this.$route.params.id)
        },

        setSubCategoryNumber() {
            if (this.$route.params.subcatId) {
                this.subCategoryNumber = this.$route.params.subcatId
            } else {
                this.subCategoryNumber = 0
            }
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

        addColorToArray(color) {
             if (!this.filterColors.includes(color)) {
                this.filterColors.push(color);
            } else {
                this.filterColors.splice(this.filterColors.indexOf(color), 1)
            }
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
        this.setSubCategoryNumber();
        await this.fetchItems();
        await this.fetchDescription();        
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

        filteredCutGems() {
            if (this.filterCuts.length > 0) {
                return this.searchedAndFilteredGems.filter(item => {
                    return this.filterCuts.some(cut => item.cut.includes(cut))
                })
            } else {
                return this.searchedAndFilteredGems;
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

        categoryName() {
            if(this.gems.length > 0) return this.gems[0].category
        },

        subCategoryName() {
            if (this.gems.length > 0 && this.subCategoryNumber !== 0) {
                return this.gems[0].subcategory
            } else {
                return ''
            }
        },

        storeVar() {
            return process.env.VUE_APP_PROD_STORE
        }
    },

    watch: {
        async "$route.params.id"() {
            this.setCategoryNumber();
            this.setSubCategoryNumber();
            await this.fetchItems();
            await this.fetchDescription();  
            this.calculateMaxPrice();
            this.calculateMaxWeight();
            this.clearCutFilter();
            this.getCut()
        },
        async "$route.params.subcatId"() {
            this.setCategoryNumber();
            this.setSubCategoryNumber();
            await this.fetchItems();
            await this.fetchDescription();  
            this.calculateMaxPrice();
            this.calculateMaxWeight();
            this.clearCutFilter();
            this.getCut()
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.container {
    margin: 0 auto;
    
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

.category-description__main {
    padding: 3em;    
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;    
    margin-top: 8vh;
}

.category-description__main p {
    color: rgb(43, 36, 36);
    font-size: 20px;
    text-align: left;
    width: 50%;
    font-family: 'Oldenburg', cursive;
}

.category-description__main button {
    border: 2px solid #00000096;
    padding: 0.5em 1em;
    background: transparent;
    margin-top: 3em;
    font-size: 18px;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Oldenburg', cursive;
    cursor: pointer;
    transition: .3s all ease;
}

.category-description__main button:hover {
    border: 2px solid transparent;    
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
}

@media (max-width: 700px) {

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
        width: 45%;        
    }

    .checkbox-block__item {
        margin-right: 1em;
    }
}
</style>
