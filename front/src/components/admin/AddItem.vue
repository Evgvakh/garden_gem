<template>    
    <div class="add-item__wrapper">
        <Hints :style="{marginBottom: '3em'}"/>
        <div>
            <h4 style="text-transform: uppercase; margin-bottom: 0.6em;">{{ menuType }} item</h4>
            <div v-if="menuType == 'edit'">
                <h5>Вы хотите изменить: ID {{ gem.id }}, {{ gem.color }} {{ gem.category }} {{ gem.weight.toFixed(2) }}ct., 
            {{ gem.cut }} cut, ${{ (gem.weight * gem.price).toFixed(0) }}, ${{ gem.price.toFixed(2) }}/кт</h5>
            </div>
        </div>
        <div class="selects">
            <div class="select-group">
                <label for="cats">Category</label>
                <AdminSelect id="cats" :options="cats" :title="'Category'" :name="'category'" v-model="id_category" :optionId="this.id_category" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_category', this.id_category, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="subcats">Subcategory</label>
                <AdminSelect id="subcats" :options="subcats" :title="'Subcategory'" :name="'subcategory'"
                    v-model="id_subcategory" :optionId="this.id_subcategory" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_subcategory', this.id_subcategory, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="colors">Color</label>
                <AdminSelect id="colors" :options="colors" :title="'Color'" :name="'color'" v-model="id_color" :optionId="this.id_color" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_color', this.id_color, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="origins">Origin</label>
                <AdminSelect id="origins" :options="origins" :title="'Origin'" :name="'origin'" v-model="id_origin" :optionId="this.id_origin" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_origin', this.id_origin, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="sets">Set</label>
                <AdminSelect id="sets" :options="sets" :title="'Set'" :name="'set'" v-model="id_set" :optionId="this.id_set" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_set', this.id_set, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="cuts">Cut</label>
                <AdminSelect id="cuts" :options="cuts" :title="'Cut'" :name="'cut'" v-model="id_cut" :optionId="this.id_cut" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_cut', this.id_cut, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="treatmts">Treatment</label>
                <AdminSelect id="treatmts" :options="treatments" :title="'Treatment'" :name="'treatment'"
                    v-model="id_treatment" :optionId="this.id_treatment" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_treatment', this.id_treatment, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="clars">Clarity</label>
                <AdminSelect id="clars" :options="clarities" :title="'Clarity'" :name="'clarity'" v-model="id_clarity" :optionId="this.id_clarity" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_clarity', this.id_clarity, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="avails">Available</label>
                <AdminSelect id="avails" :options="avails" :title="'Available'" :name="'available'" v-model="id_avail" :optionId="this.id_avail" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_availability', this.id_availability, this.gem.id)">Edit</button>
            </div>
            <div class="select-group">
                <label for="sales">Sale?</label>
                <AdminSelect id="sales" :options="sales" :title="'Sale'" :name="'sale'" v-model="id_sale" :optionId="this.id_sale" />
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('id_is_onsale', this.id_sale, this.gem.id)">Edit</button>
            </div>
        </div>
        <div class="inputs">
            <div class="inputs-group">
                <label for="weight">Weight <span>(ввод через точку)</span></label>
                <input type="number" step="0.01" id="weight" v-model="weight">
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('weight', this.weight, this.gem.id)">Edit</button> 
            </div>
            <div class="inputs-group">
                <label for="price">Price <span>(за карат, ввод через точку)</span></label>
                <input type="number" step="1" id="price" v-model="price">
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('price', this.price, this.gem.id)">Edit</button>
            </div>
            <div class="inputs-group">
                <label for="saleprice">Sale price <span>(указать 0 если нет акции)</span></label>
                <input type="number" step="1" id="saleprice" v-model="saleprice">
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('sale_price', this.saleprice, this.gem.id)">Edit</button>
            </div>
        </div>
        <div class="textareas">
            <div class="textareas-group">
                <label for="name">Name <span>(общие данные о камне свободным текстом для поиска строке поиска, на странице нигде выводиться не будет. 
                    Пример: red ruby singe set cushion cut 2.32 ct mozambique )</span></label>
                <textarea name="" id="name" cols="30" rows="2" v-model="name"></textarea>
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('name', this.name, this.gem.id)">Edit</button>
            </div>
            <div class="textareas-group">
                <label for="descriprion">Description</label>
                <textarea name="" id="descriprion" cols="30" rows="6" v-model="description"></textarea>
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('description', this.description, this.gem.id)">Edit</button>
            </div>
            <div class="textareas-group">
                <label for="video">Video link <span>(ссылка на  видео)</span></label>
                <textarea name="" id="video" cols="30" rows="1" v-model="video"></textarea>
                <button v-if="menuType == 'edit'" @click.prevent="editOneField('video', this.video, this.gem.id)">Edit</button>
            </div>
        </div>
        <div v-if="menuType === 'edit'" class="delete-img__main">
            <h4>Images / Фото</h4>
            <div class="delete-img__wrapper">
                <div class="delete-img" v-for="img in gem.images">
                    <div class="delete-img__img" :style="{backgroundImage: `url(http://localhost:8081/${img.img})`}"></div>
                    <div>
                        <button :id="img.id" class="delete-img__button" @click.prevent="handleDeleteImgFromDB(img.id, gem.id)">Delete / Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="menuType === 'edit' && this.gem.certificate.length > 0" class="delete-cert__main">
            <h4>Certificate / Сертификат</h4>
            <div class="delete-cert">
                <div class="delete-cert__item"  :style="{backgroundImage: `url(http://localhost:8081/${this.gem.certificate})`}"></div>
                <button @click.prevent="handleDeleteCertFromDB(this.gem.id)">Delete</button>
            </div>
        </div>
        
        <div class="add-media__main">
            <q-file filled bottom-slots v-model="imgToUpload" multiple append label="Images/Фото" counter>
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
            <button v-if="menuType === 'edit'" class="addMedia" @click.prevent="addMedia(gem.id, this.imgToUpload, '/upload/img', 'img')">Add Image / Добавить Фото</button>
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
            <button v-if="menuType === 'edit'" class="addMedia" @click.prevent="addMedia(gem.id, this.certificateToUpload, '/upload/certs', 'certificate')">Add Certificate / Добавить Сертификат</button>
        </div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <button class="main-button" v-if="this.menuType === 'add'" @click.prevent="confirm1()">Add item</button>        
    </div>
</template>

<script>
import axios from '../../axios';
import AdminSelect from '@/components/admin/AdminSelect.vue'
import ConfirmDialog from "primevue/confirmdialog";
import Hints from '@/components/admin/Hints.vue'
import { date } from 'quasar';
export default {
    components: {
        AdminSelect, Hints        
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
            serverResponse: ''
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
                sale: this.id_sale,                
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })     
                
            const item_id = res.data.Message
            if (this.imgToUpload.length > 0) await this.addMedia(item_id, this.imgToUpload, '/upload/img', 'img');
            if (this.certificateToUpload !== '') await this.addMedia(item_id, this.certificateToUpload, '/upload/certs', 'certificate');
            this.serverResponse = res.data.Message
            console.log(this.serverResponse)        
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
            console.log(imgData)
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
            }
        },
        
        confirm1() {
            this.$confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async  () => {
                    await this.handleForm();
                    if (this.serverResponse) {
                        this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: `Item added with ID: ${this.serverResponse} / Товар с ID  ${this.serverResponse} успешно добавлен`, life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Confirmed', detail: `Item was not added, please verify al the fields / Не добавлено. Проверьте заполнение всех полей`, life: 3000 });
                    }
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

        async handleDeleteImgFromDB(id, gemId) {
            const { data } = await axios.delete(`/admin/deleteImg/${id}`);
            this.$emit('confirmEdit', 'image', gemId)
        },

        async handleDeleteCertFromDB(id) {
            const { data } = await axios.patch(`/admin/deleteCert/${id}`);
            this.$emit('confirmEdit', 'certificate', id)            
        }, 

        async editOneField(type, field, id) {
            const { data } = await axios.patch(`/admin/editfield/${type}`, {
                field: field,
                id: id
            })
            if (data.Message.affectedRows >= 1) {
                this.$emit('confirmEdit', type, id)
            }
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

* button {
    cursor: pointer;
    padding: 0.3em 0.7em;
    border-radius: 7px;
    font-size: 15px;
}
.add-item__wrapper {
    padding: 3em;
}

h4 {
    line-height: 1em;
    font-size: 26px;
    padding: 0; margin: 0;
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
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1em;
    font-size: 16px;
    border-bottom: 2px solid rgba(128, 128, 128, 0.281);
    padding-bottom: 1em;
}

.select-group label {
    min-width: 25%;    
    font-weight: 700;
}

.selects button {
    margin-left: auto;
    margin-right: 1em;
    width: 20%;    
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

.inputs button {    
    margin-top: 1em;
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

.textareas button {        
    width: 50%; margin: 0 auto;
    margin-top: 1em;
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
    margin-bottom: 1em;   
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
    margin-top: 0.6em;
}

.delete-cert {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 2em;
}

.delete-cert__item {
    width: 200px; height: 200px;
    background-position: center center;
    background-size: cover;
}

.addMedia {
    margin: 1em 0 2em 0;
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
    color:  #523838;
    margin: 1em 0;
}
</style>