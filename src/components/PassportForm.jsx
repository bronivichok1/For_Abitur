import "../style/Form.css"


export default function PassportForm(){

    return(
        <fieldset>
            <legend>Личные и паспортные данные</legend>
                    <div class="row">
                <label class="form-label col-sm">Фамилия<span>*</span><input class="form-control is-invalid" name="surname" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Фамилия" допустима только кириллица, первая буква - заглавная.
                </div></label> 
                <label class="form-label col-sm">Имя<span>*</span><input class="form-control is-invalid" name="name" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Имя" допустима только кириллица, первая буква - заглавная.
                </div></label>
                <label class="form-label col-sm">Отчество<input class="form-control " name="second_name" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Отчество" допустима только кириллица, первая буква - заглавная.
                </div></label>
                    </div>
                <div class="row">
                    <label class="form-label col-sm">Фамилия (латиница)<span >*</span><input class="form-control is-invalid" name="surname_lat" maxlength="50" value=""/>
                    <div class="invalid-feedback">
                        В поле "Фамилия (латиница)" допустима только латиница, первая буква - заглавная.
                    </div></label> 
                    <label class="form-label col-sm">Имя (латиница)<span >*</span><input class="form-control is-invalid" name="name_lat" maxlength="50" value=""/>
                    <div class="invalid-feedback">
                        В поле "Имя (латиница)" допустима только латиница, первая буква - заглавная.
                    </div></label>
                </div>
                <label class="form-label w-100 d-none">Фамилия Имя (до 23 символов)<span >*</span><input class="form-control " name="short_full_name" maxlength="23" value="" disabled=""/>
                <div class="invalid-feedback">
                        В поле "Фамилия Имя (до 23 символов)" допустима только латиница, первая буква - заглавная.
                </div></label>
                <label class="form-label w-100 d-none">Фамилия Имя (латиница, до 23 символов)<span>*</span><input class="form-control " name="short_full_name_lat" maxlength="23" value="" disabled=""/></label>
                <div class="row">
                    <label class="form-label col-sm-3">Пол<span >*</span><select class="form-select " name="sex">
                        <option value="0" selected="">Женский</option>
                        <option value="1">Мужской</option>
                    </select></label>
                    <label class="form-label col-sm-3">Дата рождения<span >*</span><input class="form-control is-invalid" name="date_of_birth" maxlength="10" placeholder="дд.мм.гггг" value=""/></label>
                    <label class="form-label col-sm-6">Тип документа<span >*</span><select class="form-select " name="doc_type">
                        <option value="1" selected="">паспорт гражданина РБ</option>
                        <option value="2">паспорт иностранного гражданина</option>
                        <option value="3">вид на жительство РБ</option>
                        <option value="4">справка об освобождении</option>
                        <option value="5">ид. карта гражданина РБ</option>
                        <option value="6">биометр. ВНЖ РБ иностранного гражданина</option>
                        <option value="7">биометр. ВНЖ РБ лица без гражданства</option>
                        <option value="8">удостоверение беженца</option>
                        <option value="9">проездной док. лица без гражданства</option>
                        <option value="10">биометр. паспорт иностранного гражданина</option>
                        <option value="11">ид. карта иностранного гражданина</option>
                    </select></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-6">Гражданство<span >*</span><select class="form-select is-invalid" name="citizenship" required>
                        <option value="0">Республика Беларусь</option>
                        <option value="1">Российская Федерация</option>
                        <option value="2">Республика Казахстан</option>
                        <option value="3">Республика Таджикистан</option>
                        <option value="4">Кыргызская Республика</option>
                    </select></label>
                    <label class="form-label col-sm-6">Гражданство<span >*</span><input class="form-control is-invalid" name="citizenship" maxlength="50" value=""/></label>
                    <label class="form-label col-sm-2">Серия<input class="form-control " name="serial" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-4">Номер<span >*</span><input class="form-control is-invalid" name="number" maxlength="15" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-6">Идентификационный номер<input class="form-control " name="person_id" maxlength="20" value=""/>
                    <div class="invalid-feedback">
                        В поле "Личный номер" допустимы только цифры и заглавная латиница.
                    </div>
                    </label>
                    <label class="form-label col-sm-3">Дата выдачи<span >*</span><input class="form-control is-invalid" name="date_of_issue" placeholder="дд.мм.гггг" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-3">Срок действия<span >*</span><input class="form-control is-invalid" name="date_of_expiry" placeholder="дд.мм.гггг" maxlength="10" value=""/></label>
                </div>
                    <label class="form-label w-100">Кем выдан<span >*</span><input class="form-control is-invalid" name="authority" maxlength="100" value=""/></label>
        </fieldset>
    )
}
