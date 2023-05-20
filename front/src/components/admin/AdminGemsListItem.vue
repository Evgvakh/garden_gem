<template>
    <div class="list-item__main">
        <div class="list-item__wrapper">
            
            <div class="list-item__text">
                <div class="list-item__text-item">
                    <p><span class="text-item__span">ID:</span> {{ gem.id }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Category:</span> {{ gem.category }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Subcategory:</span> {{ gem.subcategory }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Color:</span> {{ gem.color }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Origin:</span> {{ gem.origin }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Set:</span> {{ gem.item_set }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Cut:</span> {{ gem.cut }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Treatment:</span> {{ gem.treatment }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Clarity:</span> {{ gem.clarity }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Available:</span> {{ gem.availability }}</p>
                </div>
                <div class="list-item__text-item">
                    <p><span class="text-item__span">Sale?:</span> {{ gem.onsale }}</p>
                </div>
            </div>
            <div class="list-item__price">
                <div class="list-item__price-item">
                    <p><p><span class="text-item__span">Price:</span> $ {{ gem.price }}</p></p>
                </div>
                <div class="list-item__price-item">
                    <p><p><span class="text-item__span">Sale Price:</span> $ {{ gem.sale_price }}</p></p>
                </div>
                <div class="list-item__price-item">
                    <p><span class="text-item__span">Weight:</span> {{ gem.weight.toFixed(2) }} ct.</p>
                </div>
                <div class="list-item__price-item">
                    <p><span class="text-item__span">Total price:</span> $ {{ (gem.weight * gem.price).toFixed(0) }}</p>
                </div>
            </div>            
            <div class="list-item__buttons-block">
                <button @click="editThisItem">Edit / Редактировать</button>
                <Toast />
                <ConfirmPopup></ConfirmPopup>
                <button @click="confirm1($event)">Delete / Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    props: {
        gem: Object
    },

    data() {
        return {

        }
    },

    methods: {
        editThisItem() {
            this.$emit('editItem', this.gem.id)            
        },
        deleteThisItem() {
            this.$emit('deleteItem', this.gem.id)            
        },
        confirm1(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Are you sure you want to proceed? / Вы уверены, что хотите удалить данный элемент?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.deleteThisItem();
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: '"Элемент удален"', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'Delete reject / Отмена удаления', life: 3000 });
                }
            });
        },        
    }
}
</script>

<style scoped>

h1, h2, h3, h4, h4, p {
    padding: 0; margin: 0;
}
.list-item__main {
    padding: 1em;
    border: 2px solid grey;
    border-radius: 7px;
    margin-bottom: 1em;
}

span.text-item__span {
    color: rgb(97, 95, 95);
}
.list-item__text {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1em;    
}

.list-item__text-item {
    margin-right: 2em;
}

.list-item__text-item p {
    text-transform: capitalize;
    font-size: 18px;
}

.list-item__price {

}

.list-item__price p {
    font-size: 18px;
}

.list-item__buttons-block {
    margin-top: 2em;
}

.list-item__buttons-block button{
    font-size: 16px;
    padding: 0.3em 0.6em;
    margin-right: 1em;
    cursor: pointer;
}
</style>