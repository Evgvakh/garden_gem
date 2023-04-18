<template>    
    <div class="add-item__wrapper">
        <div class="add-item__header">
            <h2>Внимание!</h2>
            <p>Все данные в виде выпадающих списках (category, subcategory и т.д.) обязательны к заполнению.</p>
            <p>Все текстовые данные также обязательны к заполнению. Если на момент заполнения данные для отправки в базу данных вам не известны,
                введите случайный текст <u>(например "выаыкаауывымып")</u> и измените его в дальнейшем с помощью меню редактирования.
            </p>
            <p>Поля добавления фото и сертификата к заполнению не обязательны, можно дополнить при редактировании.</p>
            <p>Для добавления нескольких фото - клик по полю выбора, выбрать файл, добавить и снова клик по меню выбора.</p>
            <p>При редактировании камня, всплывающие меню необходимо проставить заново. Изначальные значения находятся в первом, неактивном всплывающем меню. 
                Остальные значения (цена, вес, описние и т.д.) выводятся автоматически и, при отсутствии необходимости их изменения, можно их не модифицировать.</p>
        </div>
        <div v-if="menuType == 'edit'"><h5>Вы хотите изменить: {{ gem.color }} {{ gem.category }} {{ gem.weight.toFixed(2) }}ct. 
            {{ gem.cut }} cut ${{ (gem.weight * gem.price).toFixed(0) }}, ${{ gem.price.toFixed(2) }}/кт</h5></div>
        <div class="selects">
            <div class="select-group">
                <label for="cats">Category</label>
                <Select id="cats" :options="cats" :title="'Category'" :name="'category'" v-model="id_category" :optionId="this.id_category" />
            </div>
            <div class="select-group">
                <label for="subcats">Subcategory</label>
                <Select id="subcats" :options="subcats" :title="'Subcategory'" :name="'subcategory'"
                    v-model="id_subcategory" :optionId="this.id_subcategory"/>
            </div>
            <div class="select-group">
                <label for="colors">Color</label>
                <Select id="colors" :options="colors" :title="'Color'" :name="'color'" v-model="id_color" :optionId="this.id_color"/>
            </div>
            <div class="select-group">
                <label for="origins">Origin</label>
                <Select id="origins" :options="origins" :title="'Origin'" :name="'origin'" v-model="id_origin" :optionId="this.id_origin"/>
            </div>
            <div class="select-group">
                <label for="sets">Set</label>
                <Select id="sets" :options="sets" :title="'Set'" :name="'set'" v-model="id_set" :optionId="this.id_set"/>
            </div>
            <div class="select-group">
                <label for="cuts">Cut</label>
                <Select id="cuts" :options="cuts" :title="'Cut'" :name="'cut'" v-model="id_cut" :optionId="this.id_cut"/>
            </div>
            <div class="select-group">
                <label for="treatmts">Treatment</label>
                <Select id="treatmts" :options="treatments" :title="'Treatment'" :name="'treatment'"
                    v-model="id_treatment" :optionId="this.id_treatment"/>
            </div>
            <div class="select-group">
                <label for="clars">Clarity</label>
                <Select id="clars" :options="clarities" :title="'Clarity'" :name="'clarity'" v-model="id_clarity" :optionId="this.id_clarity"/>
            </div>
            <div class="select-group">
                <label for="avails">Available</label>
                <Select id="avails" :options="avails" :title="'Available'" :name="'available'" v-model="id_avail" :optionId="this.id_avail"/>
            </div>
            <div class="select-group">
                <label for="sales">Sale?</label>
                <Select id="sales" :options="sales" :title="'Sale'" :name="'sale'" v-model="id_sale" :optionId="this.id_sale"/>
            </div>
        </div>
        <div class="inputs">
            <div class="inputs-group">
                <label for="weight">Weight <span>(ввод через точку)</span></label>
                <input type="number" step="0.01" id="weight" v-model="weight"> 
            </div>
            <div class="inputs-group">
                <label for="price">Price <span>(за карат, ввод через точку)</span></label>
                <input type="number" step="1" id="price" v-model="price">
            </div>
            <div class="inputs-group">
                <label for="saleprice">Sale price <span>(указать 0 если нет акции)</span></label>
                <input type="number" step="1" id="saleprice" v-model="saleprice">
            </div>
        </div>
        <div class="textareas">
            <div class="textareas-group">
                <label for="name">Name <span>(общие данные о камне свободным текстом для поиска строке поиска, на странице нигде выводиться не будет. 
                    Пример: red ruby singe set cushion cut 2.32 ct mozambique )</span></label>
                <textarea name="" id="name" cols="30" rows="2" v-model="name"></textarea>
            </div>
            <div class="textareas-group">
                <label for="descriprion">Description</label>
                <textarea name="" id="descriprion" cols="30" rows="6" v-model="description"></textarea>
            </div>
            <div class="textareas-group">
                <label for="video">Video link <span>(ссылка на  видео)</span></label>
                <textarea name="" id="video" cols="30" rows="1" v-model="video"></textarea>
            </div>
        </div>
        <div class="delete-img__wrapper" v-if="menuType === 'edit'">
            <div class="delete-img" v-for="img in gem.images">
                <div class="delete-img__img" :style="{backgroundImage: `url(http://localhost:8081/${img.img})`}"></div>
                <div> 
                    <button :id="img.id" class="delete-img__button" @click.prevent="handleDeleteImgFromDB(img.id)">Delete / Удалить</button>                   
                </div>
            </div>
        </div>
        <div class="confirm-delete-img">
            <div></div>
        </div>
        <div >
            <q-file filled bottom-slots v-model="imgToUpload" multiple append label="Images/Фото" counter style="margin-bottom: 1em;">
                <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template v-slot:append>
                    <q-icon name="close" @click.stop.prevent="imgToUpload = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                    Первой загружать фото для обложки, потом остальные
                </template>
            </q-file>
            <q-file filled bottom-slots v-model="certificateToUpload" label="Certificate/Сертификат" counter>
                <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <template v-slot:append>
                    <q-icon name="close" @click.stop.prevent="certificateToUpload = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                    Сертификат
                </template>
            </q-file>
            <!-- <button @click.prevent="imgTest">ADD IMAGES</button> -->
        </div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <button class="main-button" v-if="this.menuType === 'add'" @click.prevent="confirm1()">Add item</button>
        <button class="main-button" v-if="this.menuType === 'edit'" @click.prevent="confirm2()">Edit item</button>
    </div>
</template>

<script>
import axios from '../../axios';
import Select from './Select.vue'
import ConfirmDialog from "primevue/confirmdialog";

export default {
    components: {
        Select
    },

    props: {
        gem: Object,
        menuType: String
    },

    data() {
        return {
            name: '',
            description: '',
            video: '',
            weight: 0,
            price: 0,
            saleprice: 0,
            id_category: 0,
            cats: [],
            id_subcategory: 0,
            subcats: [],
            id_color: 0,
            colors: [],
            id_origin: 0,
            origins: [],
            id_set: 0,
            sets: [],
            id_cut: 0,
            cuts: [],
            id_treatment: 0,
            treatments: [],
            id_clarity: 0,
            clarities: [],
            id_avail: 0,
            avails: [],
            id_sale: 0,
            sales: [],
            imgToUpload: [],
            certificateToUpload: '',
        }
    },
    methods: {
        async getCats() {
            const { data } = await axios.get('/cats')
            this.cats = data;
        },
        async getSubcats() {
            const { data } = await axios.get('/subcats')
            this.subcats = data;
        },
        async getColors() {
            const { data } = await axios.get('/colors')
            this.colors = data;
        },
        async getOrigins() {
            const { data } = await axios.get('/origins')
            this.origins = data;
        },
        async getSets() {
            const { data } = await axios.get('/sets')
            this.sets = data;
        },
        async getCuts() {
            const { data } = await axios.get('/cuts')
            this.cuts = data;
        },
        async getTreatments() {
            const { data } = await axios.get('/treatments')
            this.treatments = data;
        },
        async getClarities() {
            const { data } = await axios.get('/clarities')
            this.clarities = data;
        },
        async getAvails() {
            const { data } = await axios.get('/avails')
            this.avails = data;
        },
        async getSale() {
            const { data } = await axios.get('/sales')
            this.sales = data;
        },

        async handleForm() {
            const res = await axios.post('/admin/add', {
                name: this.name,
                description: this.description,
                weight: this.weight,
                price: this.price,
                video: this.video,
                saleprice: this.saleprice,
                cat: this.id_category,
                subcat: this.id_subcategory,
                color: this.id_color,
                origin: this.id_origin,
                set: this.id_set,
                cut: this.id_cut,
                treatment: this.id_treatment,
                clarity: this.id_clarity,
                avail: this.id_avail,
                sale: this.id_sale
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })     
                
            const item_id = res.data.Message
            if (this.imgToUpload.length > 0) await this.addMedia(item_id, this.imgToUpload, '/upload/img', 'img');
            if (this.certificateToUpload !== '') await this.addMedia(item_id, this.certificateToUpload, '/upload/certs', 'certificate');         
        },

        async addMedia(id, items, url, type) {
            let formData = new FormData();

            if (Array.isArray(items)) {
                items.forEach(item => {
                    formData.append(type, item);
                })
            } else {
                formData.append(type, items);
            }

            const headers = {
                "Content-Type": "multipart/form-data",
            };

            const { data: imgData } = await axios.post(url, formData, headers);

            if (type == 'img') {
                imgData.forEach(async img => {
                    const res = await axios.post("/admin/addImgs", {
                        item_id: id,
                        imgUrl: img
                    },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    console.log(res)
                })
            } else if (type == 'certificate') {
                const res = await axios.post("/admin/addCertificate", {
                    item_id: id,
                    imgUrl: imgData
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res)
            }
        },
        
        confirm1() {
            this.$confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.handleForm();
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },

        confirm2() {
            this.$confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.handleEditForm();
                    this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },

        handleDeleteImgFromDB(id) {
            console.log(id)
        },

        bindValues() {
            if (this.gem) {
                this.id_category = this.gem.id_category
                this.id_subcategory = this.gem.id_subcategory
                this.id_clarity = this.gem.id_clarity
                this.id_color = this.gem.id_color
                this.id_cut = this.gem.id_cut
                this.id_origin = this.gem.id_origin
                this.id_set = this.gem.id_set
                this.id_treatment = this.gem.id_treatment
                this.id_sale = this.gem.id_is_onsale
                this.id_avail = this.gem.id_availability
                this.description = this.gem.description
                this.video = this.gem.video
                this.price = this.gem.price
                this.saleprice = this.gem.sale_price
                this.weight = this.gem.weight.toFixed(2)
                this.name = this.gem.name
            }
        }
    },

    async mounted() {
        await this.getCats();
        await this.getSubcats();
        await this.getColors();
        await this.getOrigins();
        await this.getSets();
        await this.getCuts();
        await this.getTreatments();
        await this.getClarities();
        await this.getAvails();
        await this.getSale();
        this.bindValues();
    }
}
</script>

<style scoped>

.add-item__wrapper {
    padding: 3em;
}

.add-item__header {
    text-align: center;
    font-size: 16px;
    margin-bottom: 4em;
}

.add-item__header h2 {
    padding: 0; margin: 0;
    font-size: 42px;
    color: red;
}
.selects {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 3em;    
}

.select-group {
    width: 44%;
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    font-size: 16px;
    border-bottom: 2px solid rgba(128, 128, 128, 0.281);
    padding-bottom: 1em;
}

.select-group label {
    min-width: 20%;
    margin-right: 1em;
    font-weight: 700;
}

.inputs {
    font-size: 16px;
    margin-bottom: 2em;
    display: flex;
    justify-content: space-between;
}

.inputs-group {
    width: 28%;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.inputs-group input {
    padding: 0.2em 0.4em;
    margin-top: 1em;
    width: 100%;    
    border: 1px solid transparent;
    background-color: rgba(214, 231, 240, 0.438);
    border-radius: 10px;
}

.inputs-group label {
    display: block;
    max-width: 272px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 700;
}

.textareas {
    margin-top: 1em;
    font-size: 16px;
}

.textareas-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
}

.textareas-group label {
    margin-bottom: 0.2em;
    font-weight: 700;
}

.add-item__wrapper label span {
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.596);
}

.textareas-group textarea {
    padding: 0.7em;
    background-color: rgba(214, 231, 240, 0.438);
    border-radius: 10px;
}

.delete-img__wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 2em 0;
}

.delete-img {    
    width: 30%;   
}

.delete-img__img {
    height: 200px;
    width: 200px;
    margin: 0 auto;
    background-position: center center;
    background-size: cover;
    border-radius: 6px;
}

button.delete-img__button {
    display: block;
    margin: 0 auto;
    font-size: 15px;
    margin-top: 1em;
}
button.main-button {
    display: block;
    width: 100%;
    padding: .5em 0;
    font-size: 20px;
    background-color: rgba(214, 231, 240, 0.438);
    margin-top: 1em; margin-bottom: 3em;
    font-weight: 700;
    color: rgb(207, 56, 56);
}

h5 {
    color: blue;
}
</style>