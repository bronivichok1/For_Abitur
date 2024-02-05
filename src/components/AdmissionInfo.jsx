import "../style/Form.css"


export default function AdmissionInfo(){

    return(
        <fieldset>
        <legend class="text-center">Информация о поступлении</legend>
            <label class="form-label w-100">Факультет/Институт<span >*</span><select class="form-select " name="pref_faculty" required>
                <optgroup label="Факультеты">	
                    <option value="1">Лечебный</option>
                    <option value="2">Педиатрический</option>
                    <option value="3">Медико-профилактический</option>
                    <option value="4">Стоматологический</option>
                    <option value="6">Фармацевтический</option>
                    <option value="20">Фармацевтический (заочно)</option>
                    <option value="7">Профориентации и довузовской подготовки</option>
                </optgroup>
                <optgroup label="Медицинский факультет иностранных учащихся">
                    <option value="10">Лечебный, русский язык обучения</option>
                    <option value="11">Лечебный, английский язык обучения</option>
                    <option value="12">Стоматологический, русский язык обучения</option>
                    <option value="13">Стоматологический, английский язык обучения</option>
                    <option value="14">Медико-профилактический, русский язык обучения</option>
                    <option value="15">Фармацевтический, русский язык обучения</option>
                    <option value="16">Фармацевтический, английский язык обучения</option>
                    <option value="21">Фармацевтический, русский язык обучения (заочно)</option>
                </optgroup>
                <optgroup label="Военно-медицинский институт">
                    <option value="8">Вооруженные Силы</option>
                    <option value="19">Вооруженные Силы (лица женского пола)</option>
                    <option value="17">Внутренние войска</option>
                    <option value="5">Государственный пограничный комитет</option>
                    <option value="9">Министерство внутренних дел</option>
                    <option value="18">МЧС</option>
                </optgroup>
            </select></label>
        <div class="row row-cols-lg-auto g-3 align-items-center">
            <div class="form-check form-check-inline mb-3 me-5">
                <input id="prform_chbx_1" class="form-check-input " name="pref_target" type="checkbox" value="1"/>
                <label for="prform_chbx_1" class="form-check-label">На условиях целевой подготовки</label>
            </div>
            <div class="form-check form-check-inline mb-3 me-5">
                <input id="prform_chbx_2" class="form-check-input " name="pref_nopay" type="checkbox" value="1"/>
                <label for="prform_chbx_2" class="form-check-label">За счет средств бюджета</label>
            </div>
            <div class="form-check form-check-inline mb-3 me-5">
                <input id="prform_chbx_3" class="form-check-input " name="pref_pay" type="checkbox" value="1"/>
                <label for="prform_chbx_3" class="form-check-label">На платной основе</label>
            </div>
        </div>
            <div class="form-check mb-3">
                <input id="prform_chbx_4" class="form-check-input " name="pref_dorm" type="checkbox" value="1"/>
                <label for="prform_chbx_4" class="form-check-label">Нуждаюсь в общежитии</label>
            </div>
        </fieldset>
    )
}