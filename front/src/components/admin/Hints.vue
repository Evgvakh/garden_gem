<template>
    <div class="add-item__header">
        <h2>Краткое руководство пользователя</h2>
        <h4>Внесение нового камня в Базу Данных (ADD ITEM): </h4>
        <p>Все данные в виде выпадающих списках (category, subcategory и т.д.) обязательны к заполнению.</p>
        <p>Все текстовые данные также обязательны к заполнению. Если на момент заполнения данные для отправки в базу данных
            вам не известны,
            введите случайный текст <u>(например "выаыкаауывымып")</u> и измените его в дальнейшем с помощью меню
            редактирования.
        </p>
        <p>Поля добавления фото и сертификата к заполнению не обязательны, можно дополнить при редактировании.</p>
        <p>Для добавления нескольких фото - клик по полю выбора, выбрать файл, добавить и снова клик по меню выбора.</p>

        <h4>Редактирование имеющегося камня из БД (EDIT ITEM):</h4>        
        <p>При редактировании каждого свойства отдельно - выставить (вписать) новое значение и нажать EDIT рядом (или ниже)
            с полем.</p>
        <p>Если фото не отображается правильно в меню редактирования - на клиентском сайте оно также не отобразится. Проверьте чтобы фото было в формате JPG/JPEG</p>
        <p>Если при редактировании камня поле "Сертификат" не появляется после поля "Фото", это означает, что сертификат к
            камню не прикреплен.</p>
        <p>Для добавления краткого описания категории или субкатегории (наверху страницы минерала в рубрике GEMS/КАТАЛОГ): в разделе Add/Edit/Delete fields, выбрать categories или subcategories,
            спуститься вниз, в выпадающем меню выбрать нужную категорию и ввести краткое описаие в поле ввода ниже. Если описание уже имеется - оно будет добавлено в поле ввода текста. 
            Если при выборе категории поле ввода текста остается пустым - значит у категории / субкатегории пока нет описания.
            Вводить максимум 4 строки, без заголовков и абзацев, иначе блок на странице пользователя будет слишком круный!!!</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    h2 {
        color: red;
        font-size: 34px;
        margin: 0 0 0.8em 0;
        line-height: 1em;
    }

    h4 {
        font-size: 26px;
        line-height: 1em;
        margin: 1.2em 0 0.6em 0;
    }

    p {
        font-size: 16px;
        line-height: 1.3em;
    }
</style>