import PassportForm from '../components/PassportForm';
import "../style/Anketa.css"
import AdressData from '../components/AdressData';
import Education from '../components/Education';
import AdmissionInfo from '../components/AdmissionInfo';
import WorkInfo from '../components/WorkInfo';
import Family from '../components/Family'
import Awards from '../components/Awards';
import Points from '../components/Points';
import "../style/Form.css"
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'



const useValidation=(value,validations)=>{
    const[isEmpty,setEmpty]=useState(true)
    const[minLengthError,setMinLengthError]=useState(true)
    const[isRus,setRus]=useState(true)
    const[isEng,setEng]=useState(true)
    const[inputValid,setInputValid]=useState(false)
    useEffect(()=>{
        for(const validation in validations){

            switch(validation){
                case'minLength':
                    value.length<validations[validation]?setMinLengthError(true):setMinLengthError(false)
                break;
                case 'isEmpty':
                    value?setEmpty(false):setEmpty(true)
                break;
                case 'isRus':
                    var re =/[А-ЯЁ]{1}[а-яё]+$/i
                    re.test(String(value).toLowerCase())?setRus(false):setRus(true)
                break;
                case'isEng':
                    var ru=/[A-Z]{1}[a-z]+$/i
                    ru.test(String(value).toLowerCase())?setEng(false):setEng(true)
                break;
            }

        }
    },[value])
    
    useEffect(()=>{
        if(isEmpty||minLengthError||isEng||isRus){
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    },[isEmpty,minLengthError,isEng,isRus])

    return{
        isEmpty,
        minLengthError,
        isRus,
        isEng,
        inputValid

    }
}
const useInput=(InitialValue,validations)=>{
    const [value,setValue]=useState(InitialValue)
    const[isDirty,setDirty]=useState(false)
    const valid=useValidation(value,validations)
    const onChange=(e)=>{
        setValue(e.target.value)
    }
    const onBlur=(e)=>{
        setDirty(true)
    }
    return{
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}
function Anketa() {
    const surname=useInput('',{isEmpty:true,isRus:true})
    const name=useInput('',{isEmpty:true,isRus:true})
    const second_name=useInput('',{isEmpty:true,isRus:true})
    const surname_lat=useInput('',{isEmpty:true,isEng:true})
    const name_lat=useInput('',{isEmpty:true,isEng:true})//ready valid
    const date_of_birth=useInput('',{isEmpty:true})
    const citizenship=useInput('',{isEmpty:true})
    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true})
    const person_id=useInput('',{isEmpty:true})
    const date_of_issue=useInput('',{isEmpty:true})
    const date_of_expiry=useInput('',{isEmpty:true})
    const authority=useInput('',{isEmpty:true})
    return (
    <div>  
        <form >
<legend>Личные и паспортные данные</legend>
                    <div class="row">
                <label class="form-label col-sm">Фамилия<span>*</span>
                        <input  class="form-control "onChange={e=>surname.onChange(e)} onBlur={e=>surname.onBlur(e)} value={surname.value} name="surname" maxlength="50" />
                        {(surname.isDirty&&surname.isEmpty)&&<div style={{color:'red'}}> Поле "Фамилия" обязательно для заполнения.</div>}
                        {(surname.isDirty&&surname.isRus)&&<div style={{color:'red'}}> В поле "Фамилия" допустима только кириллица, первая буква - заглавная.</div>}
                </label> 
                <label class="form-label col-sm" >Имя<span>*</span>
                        <input class="form-control " onChange={e=>name.onChange(e)} onBlur={e=>name.onBlur(e)} value={name.value} name="name" maxlength="50"/>
                        {(name.isDirty&&name.isEmpty)&&<div style={{color:'red'}}> Поле "Имя" обязательно для заполнения.</div>}
                        {(name.isDirty&&name.isRus)&&<div style={{color:'red'}}> В поле "Имя" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                <label class="form-label col-sm">Отчество
                        <input onChange={e=>second_name.onChange(e)} onBlur={e=>second_name.onBlur(e)} value={second_name.value} class="form-control " name="second_name" maxlength="50" />
                        {(second_name.isDirty&&second_name.isRus)&&<div style={{color:'red'}}> В поле "Отчество" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm">Фамилия (латиница)<span >*</span>
                        <input class="form-control is-invalid" onChange={e=>surname_lat.onChange(e)} onBlur={e=>surname_lat.onBlur(e)} value={surname_lat.value} name="surname_lat" maxlength="50" />
                        {(surname_lat.isDirty&&surname_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Фамилия(латиница)" обязательно для заполнения.</div>}
                        {(surname_lat.isDirty&&surname_lat.isEng)&&<div style={{color:'red'}}> В поле "Фамилия(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label> 
                <label class="form-label col-sm">Имя (латиница)<span >*</span>
                        <input onChange={e=>name_lat.onChange(e)} onBlur={e=>name_lat.onBlur(e)} value={name_lat.value} class="form-control is-invalid" name="name_lat" maxlength="50" />
                        {(name_lat.isDirty&&name_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Имя(латиница)" обязательно для заполнения.</div>}
                        {(name_lat.isDirty&&name_lat.isEng)&&<div style={{color:'red'}}> В поле "Имя(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm-3">Пол<span >*</span>
                    <select class="form-select " name="sex">
                        <option value="0" selected="">Женский</option>
                        <option value="1">Мужской</option>
                    </select>
                </label>
                <label class="form-label col-sm-3">Дата рождения<span >*</span>
                    <input class="form-control is-invalid" onChange={e=>date_of_birth.onChange(e)} onBlur={e=>date_of_birth.onBlur(e)} value={date_of_birth.value} name="date_of_birth" maxlength="10" placeholder="дд.мм.гггг" />
                    {(date_of_birth.isDirty&&date_of_birth.isEmpty)&&<div style={{color:'red'}}> Поле "Дата рождения" обязательно для заполнения.</div>}

                </label>
                <label class="form-label col-sm-6">Тип документа<span >*</span>
                    <select class="form-select " name="doc_type">
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
                    </select>
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm-6">Гражданство<span >*</span>
                        <input onChange={e=>citizenship.onChange(e)} onBlur={e=>citizenship.onBlur(e)} value={citizenship.value}class="form-control is-invalid" name="citizenship" maxlength="50" />
                        {(citizenship.isDirty&&citizenship.isEmpty)&&<div style={{color:'red'}}> Поле "Гражданство" обязательно для заполнения.</div>}

                </label>
                <label class="form-label col-sm-2">Серия
                        <input onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} class="form-control " name="serial" maxlength="10" />
                </label>
                <label class="form-label col-sm-4">Номер<span >*</span>
                        <input onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} class="form-control is-invalid" name="number" maxlength="15" />
                        {(number.isDirty&&number.isEmpty)&&<div style={{color:'red'}}> Поле "Номер" обязательно для заполнения.</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm-6">Идентификационный номер
                        <input onChange={e=>person_id.onChange(e)} onBlur={e=>person_id.onBlur(e)} value={person_id.value} class="form-control " name="person_id" maxlength="20" />
                        {(person_id.isDirty&&person_id.isEmpty)&&<div style={{color:'red'}}> Поле "Идентификационный номер" обязательно для заполнения.</div>}
                        {(person_id.isDirty&&person_id.isEmpty)&&<div style={{color:'red'}}>В поле "Личный номер" допустимы только цифры и заглавная латиница.</div>}
                </label>
                <label class="form-label col-sm-3">Дата выдачи<span >*</span>
                        <input onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} class="form-control is-invalid" name="date_of_issue" placeholder="дд.мм.гггг" maxlength="10" />
                        {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div style={{color:'red'}}> Поле "Дата выдачи" обязательно для заполнения.</div>}
                </label>
                <label class="form-label col-sm-3">Срок действия<span >*</span>
                        <input onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value} class="form-control is-invalid" name="date_of_expiry" placeholder="дд.мм.гггг" maxlength="10"/>
                        {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div style={{color:'red'}}> Поле "Срок действия" обязательно для заполнения.</div>}
                </label>
                    </div>
                <label class="form-label w-100">Кем выдан<span >*</span>
                        <input onChange={e=>authority.onChange(e)} onBlur={e=>authority.onBlur(e)} value={authority.value} class="form-control is-invalid" name="authority" maxlength="100" />
                        {(authority.isDirty&&authority.isEmpty)&&<div style={{color:'red'}}> Поле "Кем выдан" обязательно для заполнения.</div>}

                </label>
<legend class="text-center">Адрес места жительства в соответствии со штампом о регистрации, контактные данные</legend>
                <div class="row">
                    <label class="form-label col-sm-4">Почтовый индекс<input class="form-control " name="postcode" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-8">Страна<select class="form-select " name="country">
                        <option value="0">Республика Беларусь</option>
                        <option value="1">Российская Федерация</option>
                        <option value="2">Республика Казахстан</option>
                        <option value="3">Республика Таджикистан</option>
                        <option value="4">Кыргызская Республика</option>
                    </select></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Область<select class="form-select " name="region">
                        <option value="1">г. Минск</option>
                        <option value="2">Брестская область</option>
                        <option value="3">Витебская область</option>
                        <option value="4">Гродненская область</option>
                        <option value="5">Гомельская область</option>
                        <option value="6">Минская область</option>
                        <option value="7">Могилевская область</option>
                    </select><input class="form-control d-none " name="region" maxlength="50" value="" disabled/></label>
                    <label class="form-label col-sm">Район<input class="form-control " name="area" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Тип насел. пункта<select class="form-select " name="settlement_type">
                        <option value="1">Город</option>
                        <option value="2">Городской поселок</option>
                        <option value="3">Агрогородок</option>
                        <option value="4">Поселок</option>
                        <option value="5">Деревня</option>
                        <option value="6">иное</option>
                    </select></label>
                    <label class="form-label col-sm">Населенный пункт<input class="form-control " name="settlement_name" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-4">Микрорайон<input class="form-control " name="district" maxlength="50" value=""/></label>
                    <label class="form-label col-sm-3">Тип улицы<select class="form-select " name="street_type">
                        <option value="1">улица</option>
                        <option value="2">проспект</option>
                        <option value="3">бульвар</option>
                        <option value="4">проезд</option>
                        <option value="5">тупик</option>
                        <option value="6">площадь</option>
                        <option value="7">переулок</option>
                        <option value="9">микрорайон</option>
                        <option value="8">иное (указать в названии)</option>
                    </select></label>
                    <label class="form-label col-sm-5">Название улицы<input class="form-control " name="street_name" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-2">Дом<input class="form-control " name="building" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-2">Корпус<input class="form-control " name="housing" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-2">Квартира<input class="form-control " name="apartment" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-6">Домашний тел.<input class="form-control " name="stat_tel" placeholder="+375XXXXXXXXX" maxlength="20" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Мобильный тел.<span >*</span><input class="form-control " name="mobile_tel" maxlength="20" value="+375" required/></label>
                    <label class="form-label col-sm">E-mail<span >*</span><input class="form-control " name="email" maxlength="50" value="" required/></label>
                </div>
                        <legend class="text-center">Образование, сведения документа об образовании</legend>
                    <label class="form-label w-100">Название УО<span ></span><input class="form-control " name="edu_name" maxlength="150" value="" required/></label>
                <div class="row">
                    <label class="form-label col-sm">Серия Номер<span ></span><input class="form-control " name="edu_serial_number" maxlength="20" value="" required/></label>
                    <label class="form-label col-sm">Дата выдачи<span ></span><input class="form-control " name="edu_date_of_issue" maxlength="10" placeholder="дд.мм.гггг" value="" required/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Средний балл<span ></span><input class="form-control " name="edu_average" maxlength="3" value="" required/></label>
                    <label class="form-label col-sm">Иностранный язык<span></span><select class="form-select " name="edu_foreign_lang" required>
                        <option value="1">Английский</option>
                        <option value="2">Немецкий</option>
                        <option value="3">Французcкий</option>
                        <option value="4">Итальянский</option>
                        <option value="5">Испанский</option>
                        <option value="6">Китайский</option>
                        <option value="7">другой</option>
                    </select></label>
                </div>
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
<legend class="text-center">Работа и стаж</legend>
                <label class="form-label w-100">Место работы, занимаемая должность (профессия)<input class="form-control " name="exp_position" maxlength="150" value=""/></label>
                <p class="lead">Трудовой стаж по профилю избранной специальности:</p>
                <div class="row">
                    <label class="form-label col-sm">Полных лет<input class="form-control " name="exp_years" maxlength="2" value=""/></label>
                    <label class="form-label col-sm">Полных месяцев<input class="form-control " name="exp_months" maxlength="2" value=""/></label>
                </div>
<legend class="text-center">Родители</legend>
                <p class="lead">Отец</p>
                <div class="row">
                    <label class="form-label col-sm">Фамилия<input class="form-control " name="father_surname" maxlength="50" value=""/></label>
                    <label class="form-label col-sm">Имя<input class="form-control " name="father_name" maxlength="50" value=""/></label> 
                    <label class="form-label col-sm">Отчество<input class="form-control " name="father_second_name" maxlength="50" value=""/></label>
                </div>
                <label class="form-label w-100">Место работы<input class="form-control " name="father_job" maxlength="150" value=""/></label>
                <div class="row">
                    <label class="form-label col-sm">Должность<input class="form-control " name="father_position" maxlength="50" value=""/></label>
                    <label class="form-label col-sm">Моб. телефон<input class="form-control " name="father_phone" maxlength="50" value=""/></label>
                </div>
                    <label class="form-label w-100">Полный адрес<input class="form-control " name="father_address" maxlength="150" value=""/></label>
                <p class="lead">Мать</p>
                <div class="row">
                    <label class="form-label col-sm">Фамилия<input class="form-control " name="mother_surname" maxlength="50" value=""/></label>
                    <label class="form-label col-sm">Имя<input class="form-control " name="mother_name" maxlength="50" value=""/></label> 
                    <label class="form-label col-sm">Отчество<input class="form-control " name="mother_second_name" maxlength="50" value=""/></label>
                </div>
                <label class="form-label w-100">Место работы<input class="form-control " name="mother_job" maxlength="150" value=""/></label>
                <div class="row">
                    <label class="form-label col-sm">Должность<input class="form-control " name="mother_position" maxlength="50" value=""/></label>
                    <label class="form-label col-sm">Моб. телефон<input class="form-control " name="mother_phone" maxlength="50" value=""/></label>
                </div>
                    <label class="form-label w-100">Полный адрес<input class="form-control " name="mother_address" maxlength="150" value=""/></label>
<legend class="text-center">Награды по предметам</legend>
                <div class="row">
                    <label class="form-label col-lg">Язык<select class="form-select " name="awards_lang">
                        <option value="0">Нет наград</option>
                        <option value="1">Международная I cт.</option>
                        <option value="2">Международная II cт.</option>
                        <option value="3">Международная III cт.</option>
                        <option value="4">Республиканская I cт.</option>
                        <option value="5">Республиканская II cт.</option>
                        <option value="6">Республиканская III cт.</option>
                        <option value="7">Областная (Минск. гор.) I cт.</option>
                        <option value="9">Лауреат СФП РБ по предмету</option>
                    </select></label>
                    <label class="form-label col-lg">Химия<select class="form-select " name="awards_chem">
                        <option value="0">Нет наград</option>
                        <option value="1">Международная I cт.</option>
                        <option value="2">Международная II cт.</option>
                        <option value="3">Международная III cт.</option>
                        <option value="4">Республиканская I cт.</option>
                        <option value="5">Республиканская II cт.</option>
                        <option value="6">Республиканская III cт.</option>
                        <option value="7">Областная (Минск. гор.) I cт.</option>
                        <option value="9">Лауреат СФП РБ по предмету</option>
                    </select></label>
                    <label class="form-label col-lg">Биология<select class="form-select " name="awards_biol">
                        <option value="0">Нет наград</option>
                        <option value="1">Международная I cт.</option>
                        <option value="2">Международная II cт.</option>
                        <option value="3">Международная III cт.</option>
                        <option value="4">Республиканская I cт.</option>
                        <option value="5">Республиканская II cт.</option>
                        <option value="6">Республиканская III cт.</option>
                        <option value="7">Областная (Минск. гор.) I cт.</option>
                        <option value="8">Диплом с отличием медколледжа</option>
                        <option value="9">Лауреат СФП РБ по предмету</option>
                    </select></label>
                </div>
<legend class="text-center">ЦТ и баллы</legend>
                <p class="lead">Язык</p>
                <div class="row">
                    <label class="form-label col-sm">Серия<input class="form-control " name="cert_lang_serial" maxlength="8" value=""/></label>
                    <label class="form-label col-sm">Номер<input class="form-control " name="cert_lang_number" maxlength="7" value=""/></label> 
                    <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_lang_score" maxlength="3" value=""/></label>
                </div>
                <p class="lead">Химия</p>
                <div class="row">
                    <label class="form-label col-sm">Серия<input class="form-control " name="cert_chem_serial" maxlength="8" value=""/></label>
                    <label class="form-label col-sm">Номер<input class="form-control " name="cert_chem_number" maxlength="7" value=""/></label> 
                    <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_chem_score" maxlength="3" value=""/></label>
                </div>
                <p class="lead">Биология</p>
                <div class="row">
                    <label class="form-label col-sm">Серия<input class="form-control " name="cert_biol_serial" maxlength="8" value=""/></label>
                    <label class="form-label col-sm">Номер<input class="form-control " name="cert_biol_number" maxlength="7" value=""/></label> 
                    <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_biol_score" maxlength="3" value=""/></label>
                </div>
                </form>

            <button type="submit" class="btn btn-outline-primary btn-lg">Отправить</button>
    </div>
    )
  }
  export default Anketa