import "../style/Anketa.css"
import { useEffect, useState } from 'react'
import ButtonForNavigate from '../components/ButtonForNavigate'



const useValidation=(value,validations)=>{
    const[isEmpty,setEmpty]=useState(true)
    const[minLengthError,setMinLengthError]=useState(true)
    const[isRus,setRus]=useState(true)
    const[isEng,setEng]=useState(true)
    const[ismobileNum,setmobileNum]=useState(true)
    const[isemailCheck,setemailCheck]=useState(true)
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
                case'ismobileNum':
                    var ru=/[+]{1}[0-9]+$/i
                    ru.test(String(value).toLowerCase())?setmobileNum(false):setmobileNum(true)

                break;
                case'isemailCheck':
                    var ru=/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
                    ru.test(String(value).toLowerCase())?setemailCheck(false):setemailCheck(true)
                break;
               // case'DatCheck'
                  //  var ru=/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i
                
                 //   break;
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
        inputValid,
        ismobileNum,
        isemailCheck

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


    //For Error-style


  
function Anketa() {



    
    const surname=useInput('',{isEmpty:true,isRus:true})
    const name=useInput('',{isEmpty:true,isRus:true})
    const second_name=useInput('',{isEmpty:true,isRus:true})
    const surname_lat=useInput('',{isEmpty:true,isEng:true})
    const name_lat=useInput('',{isEmpty:true,isEng:true})
    const date_of_birth=useInput('',{isEmpty:true})
    const citizenship=useInput('',{isEmpty:true})
    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true})
    const person_id=useInput('',{isEmpty:true})
    const date_of_issue=useInput('',{isEmpty:true})
    const date_of_expiry=useInput('',{isEmpty:true})
    const authority=useInput('',{isEmpty:true})
    const postcode=useInput('',{isEmpty:true})
    const region=useInput('',{isEmpty:true})
    const settlement_name=useInput('',{isEmpty:true})
    const street_name=useInput('',{isEmpty:true})
    const building=useInput('',{isEmpty:true})
    const housing=useInput('',{isEmpty:true})
    const apartment=useInput('',{isEmpty:true})
    const stat_tel=useInput('',{isEmpty:true})
    const mobile_tel=useInput('+375',{isEmpty:true,ismobileNum:true})
    const email=useInput('',{isEmpty:true,isemailCheck:true})
    const edu_date_of_issue=useInput('',{isEmpty:true})
    const edu_serial_number=useInput('',{isEmpty:true})
    const edu_name=useInput('',{isEmpty:true})
    const edu_average=useInput('',{isEmpty:true})
    const pref_pay=useInput('1',{isEmpty:true})
    const pref_nopay=useInput('1',{isEmpty:true})
    const pref_target=useInput('1',{isEmpty:true})
    const pref_dorm=useInput('1',{isEmpty:true})
    const exp_position=useInput('',{isEmpty:true})
    const exp_years=useInput('',{isEmpty:true})
    const exp_months=useInput('',{isEmpty:true})
    const father_surname=useInput('',{isEmpty:true})
    const father_name=useInput('',{isEmpty:true})
    const father_second_name=useInput('',{isEmpty:true})
    const father_job=useInput('',{isEmpty:true})
    const father_position=useInput('',{isEmpty:true})
    const father_phone=useInput('',{isEmpty:true})
    const father_address=useInput('',{isEmpty:true})
    const mother_surname=useInput('',{isEmpty:true})
    const mother_name=useInput('',{isEmpty:true})
    const mother_second_name=useInput('',{isEmpty:true})
    const mother_job=useInput('',{isEmpty:true})
    const mother_position=useInput('',{isEmpty:true})
    const mother_phone=useInput('',{isEmpty:true})
    const mother_address=useInput('',{isEmpty:true})
    const cert_lang_serial=useInput('',{isEmpty:true})
    const cert_lang_number=useInput('',{isEmpty:true})
    const cert_lang_score=useInput('',{isEmpty:true})
    const cert_chem_serial=useInput('',{isEmpty:true})
    const cert_chem_number=useInput('',{isEmpty:true})
    const cert_chem_score=useInput('',{isEmpty:true})
    const cert_biol_serial=useInput('',{isEmpty:true})
    const cert_biol_score=useInput('',{isEmpty:true})
    const cert_biol_number=useInput('',{isEmpty:true})
    const sex=useInput('1',{isEmpty:true})
    const doc_type=useInput('1',{isEmpty:true})
    const country=useInput('0',{isEmpty:true})
    const area=useInput('',{isEmpty:true})
    const settlement_type=useInput('')
    const street_type=useInput('')
    const edu_foreign_lang=useInput('')
    const pref_faculty=useInput('')
    const awards_lang=useInput('')
    const awards_chem=useInput('')
    const awards_biol=useInput('')
    const DD=useInput('')
    const diplo=useInput('')
    const medal=useInput('')
    const bff=useInput('')
    const mil=useInput('')
    const nop=useInput('')
    const dis=useInput('')
    const stat19_23=useInput('')
    const stat18=useInput('')

    
    return (
    <div class="div">  
        <form   method="POST">
<legend>Личные и паспортные данные</legend>
                    <div class="row">
                <label class="form-label col-sm">Фамилия<span>*</span>
                        <input  className={surname.isDirty&&(surname.isRus||surname.isEmpty)?"input-small-error":"input-small"} onChange={e=>surname.onChange(e)} onBlur={e=>surname.onBlur(e)} value={surname.value}   name="surname" maxlength="50" />
                        {(surname.isDirty&&surname.isEmpty)&&<div  style={{color:'red'}}> Поле "Фамилия" обязательно для заполнения.</div>}
                        {(surname.isDirty&&surname.isRus&&!surname.isEmpty)&&<div  style={{color:'red'}}> В поле "Фамилия" допустима только кириллица, первая буква - заглавная.</div>}
                </label> 
                <label class="form-label col-sm" >Имя<span>*</span>
                        <input className={name.isDirty&&(name.isRus||name.isEmpty)?"input-small-error":"input-small"} onChange={e=>name.onChange(e)} onBlur={e=>name.onBlur(e)} value={name.value} required valid name="name" maxlength="50"/>
                        {(name.isDirty&&name.isEmpty)&&<div style={{color:'red'}}> Поле "Имя" обязательно для заполнения.</div>}
                        {(name.isDirty&&name.isRus&&!name.isEmpty)&&<div style={{color:'red'}}> В поле "Имя" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                <label class="form-label col-sm">Отчество
                        <input className={second_name.isDirty&&second_name.isRus&&!second_name.isEmpty?"input-small-error":"input-small"} onChange={e=>second_name.onChange(e)} onBlur={e=>second_name.onBlur(e)} required valid value={second_name.value}  name="second_name" maxlength="50" />
                        {(second_name.isDirty&&second_name.isRus&&!second_name.isEmpty)&&<div style={{color:'red'}}> В поле "Отчество" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm">Фамилия (латиница)<span >*</span>
                        <input className={surname_lat.isDirty&&(surname_lat.isEng||surname_lat.isEmpty)?"input-medium-error":"input-medium"} onChange={e=>surname_lat.onChange(e)} onBlur={e=>surname_lat.onBlur(e)} value={surname_lat.value} name="surname_lat" maxlength="50" />
                        {(surname_lat.isDirty&&surname_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Фамилия(латиница)" обязательно для заполнения.</div>}
                        {(surname_lat.isDirty&&surname_lat.isEng&&!surname_lat.isEmpty)&&<div style={{color:'red'}}> В поле "Фамилия(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label> 
                <label class="form-label col-sm">Имя (латиница)<span >*</span>
                        <input className={name_lat.isDirty&&(name_lat.isEng||name_lat.isEmpty)?"input-medium-error":"input-medium"} onChange={e=>name_lat.onChange(e)} onBlur={e=>name_lat.onBlur(e)} value={name_lat.value}  name="name_lat" maxlength="50" />
                        {(name_lat.isDirty&&name_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Имя(латиница)" обязательно для заполнения.</div>}
                        {(name_lat.isDirty&&name_lat.isEng&&!name_lat.isEmpty)&&<div style={{color:'red'}}> В поле "Имя(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm">Пол<span >*</span>
                    <select class="select-small " onChange={e=>sex.onChange(e)} onBlur={e=>sex.onBlur(e)} value={sex.value}  name="sex">
                        <option value="0" selected="">Женский</option>
                        <option value="1">Мужской</option>
                    </select>
                </label>
                <label class="form-label col-sm">Дата рождения<span >*</span>
                    <input className={date_of_birth.isDirty&&date_of_birth.isEmpty?"input-verySmall-error":"input-verySmall"} onChange={e=>date_of_birth.onChange(e)} onBlur={e=>date_of_birth.onBlur(e)} value={date_of_birth.value} name="date_of_birth" maxlength="10" placeholder="дд.мм.гггг" />
                    {(date_of_birth.isDirty&&date_of_birth.isEmpty)&&<div style={{color:'red'}}> Поле "Дата рождения" обязательно для заполнения.</div>}

                </label>
                <label class="form-label col-sm-6">Тип документа<span >*</span>
                    <select class="select-medium " onChange={e=>doc_type.onChange(e)} onBlur={e=>doc_type.onBlur(e)} value={doc_type.value}  name="doc_type">
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
                        <input class="input-medium" onChange={e=>citizenship.onChange(e)} onBlur={e=>citizenship.onBlur(e)} value={citizenship.value} name="citizenship" maxlength="50" />
                        {(citizenship.isDirty&&citizenship.isEmpty)&&<div style={{color:'red'}}> Поле "Гражданство" обязательно для заполнения.</div>}

                </label>
                <label class="form-label col-sm-2">Серия
                        <input class="input-verySmall" onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxlength="10" />
                </label>
                <label class="form-label col-sm-4">Номер<span >*</span>
                        <input class="input-verySmall" onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value}  name="number" maxlength="15" />
                        {(number.isDirty&&number.isEmpty)&&<div style={{color:'red'}}> Поле "Номер" обязательно для заполнения.</div>}
                </label>
                    </div>
                    <div class="row">
                <label class="form-label col-sm-6">Идентификационный номер
                        <input class="input-medium" onChange={e=>person_id.onChange(e)} onBlur={e=>person_id.onBlur(e)} value={person_id.value}  name="person_id" maxlength="20" />
                </label>
                <label class="form-label col-sm-3">Дата выдачи<span >*</span>
                        <input class="input-verySmall" onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value}  name="date_of_issue" placeholder="дд.мм.гггг" maxlength="10" />
                        {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div style={{color:'red'}}> Поле "Дата выдачи" обязательно для заполнения.</div>}
                </label>
                <label class="form-label col-sm-3">Срок действия<span >*</span>
                        <input class="input-verySmall" onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value}  name="date_of_expiry" placeholder="дд.мм.гггг" maxlength="10"/>
                        {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div style={{color:'red'}}> Поле "Срок действия" обязательно для заполнения.</div>}
                </label>
                    </div>
                <label class="form-label w-100">Кем выдан<span >*</span>
                        <input class="input-big" onChange={e=>authority.onChange(e)} onBlur={e=>authority.onBlur(e)} value={authority.value}  name="authority" maxlength="100" />
                        {(authority.isDirty&&authority.isEmpty)&&<div style={{color:'red'}}> Поле "Кем выдан" обязательно для заполнения.</div>}

                </label>
                <hr/>
<legend class="text-center">Адрес места жительства в соответствии со штампом о регистрации, контактные данные</legend>
                <div class="row">
                    <label class="form-label col-sm-4">Почтовый индекс
                        <input class="input-verySmall" onChange={e=>postcode.onChange(e)} onBlur={e=>postcode.onBlur(e)} value={postcode.value}  name="postcode" maxlength="10"/></label>
                    <label class="form-label col-sm-8">Страна
                        <select class="select-big" onChange={e=>country.onChange(e)} onBlur={e=>country.onBlur(e)} value={country.value}  name="country">
                        <option value="0">Республика Беларусь</option>
                        <option value="1">Российская Федерация</option>
                        <option value="2">Республика Казахстан</option>
                        <option value="3">Республика Таджикистан</option>
                        <option value="4">Кыргызская Республика</option>
                    </select></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Область
                        <select class="select-medium " onChange={e=>region.onChange(e)} onBlur={e=>region.onBlur(e)} value={region.value} name="region" hidden={country.value!="0"}>
                        <option value="1">г. Минск</option>
                        <option value="2">Брестская область</option>
                        <option value="3">Витебская область</option>
                        <option value="4">Гродненская область</option>
                        <option value="5">Гомельская область</option>
                        <option value="6">Минская область</option>
                        <option value="7">Могилевская область</option>
                    </select>
                        <input class="input-medium" onChange={e=>region.onChange(e)} onBlur={e=>region.onBlur(e)} value={region.value}  name="region" maxlength="50" hidden={country.value=="0"}/></label>
                    <label >Район
                        <input class="input-medium" onChange={e=>area.onChange(e)} onBlur={e=>area.onBlur(e)} value={area.value} name="area" maxlength="50" /></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Тип насел. пункта
                    <select class="select-medium "onChange={e=>settlement_type.onChange(e)} onBlur={e=>settlement_type.onBlur(e)} value={settlement_type.value} name="settlement_type">
                        <option value="1">Город</option>
                        <option value="2">Городской поселок</option>
                        <option value="3">Агрогородок</option>
                        <option value="4">Поселок</option>
                        <option value="5">Деревня</option>
                        <option value="6">иное</option>
                    </select></label>
                    <label class="form-label col-sm">Населенный пункт
                        <input class="input-medium " onChange={e=>settlement_name.onChange(e)} onBlur={e=>settlement_name.onBlur(e)} value={settlement_name.value}  name="settlement_name" maxlength="50" />
                        </label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-3">Тип улицы
                    <select  class="select-medium " onChange={e=>street_type.onChange(e)} onBlur={e=>street_type.onBlur(e)} value={street_type.value} name="м">
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
                    <label class="form-label col-sm-5">Название улицы
                    <input class="input-medium " onChange={e=>street_name.onChange(e)} onBlur={e=>street_name.onBlur(e)} value={street_name.value}  name="street_name" maxlength="50" /></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-2">Дом
                        <input class="input-Small200 " onChange={e=>building.onChange(e)} onBlur={e=>building.onBlur(e)} value={building.value}  name="building" maxlength="10" /></label>
                    <label class="form-label col-sm-2">Корпус
                        <input class="input-Small200 " onChange={e=>housing.onChange(e)} onBlur={e=>housing.onBlur(e)} value={housing.value}  name="housing" maxlength="10" /></label>
                    <label class="form-label col-sm-2">Квартира
                        <input class="input-Small200 " onChange={e=>apartment.onChange(e)} onBlur={e=>apartment.onBlur(e)} value={apartment.value}  name="apartment" maxlength="10" /></label>
                    <label class="form-label col-sm-6">Домашний тел.
                        <input class="input-medium " onChange={e=>stat_tel.onChange(e)} onBlur={e=>stat_tel.onBlur(e)} value={stat_tel.value}  name="stat_tel"  maxlength="20" /></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Мобильный тел.<span >*</span>
                        <input class="input-medium " onChange={e=>mobile_tel.onChange(e)} onBlur={e=>mobile_tel.onBlur(e)} value={mobile_tel.value}  placeholder="+375XXXXXXXXX" name="mobile_tel" maxlength="20"  /></label>
                        {(mobile_tel.isDirty&&mobile_tel.isEmpty)&&<div style={{color:'red'}}> Поле "Мобильный тел." обязательно для заполнения.</div>}
                        {(mobile_tel.isDirty&&mobile_tel.ismobileNum&&!mobile_tel.isEmpty)&&<div style={{color:'red'}}> Поле "Мобильный тел." может содержать только цифры.</div>}
                    <label class="form-label col-sm">E-mail<span >*</span>
                        <input class="input-medium " onChange={e=>email.onChange(e)} onBlur={e=>email.onBlur(e)} value={email.value}  name="email" maxlength="50"/></label>
                        {(email.isDirty&&email.isEmpty)&&<div style={{color:'red'}}> Поле "E-mail" обязательно для заполнения.</div>}
                        {(email.isDirty&&email.isemailCheck&&!email.isEmpty)&&<div style={{color:'red'}}> Поле "E-mail" заполнено неверно.</div>}
                </div>
                <hr/>
<legend class="text-center">Образование, сведения документа об образовании</legend>
                    <label class="form-label w-100">Название УО<span ></span>
                        <input class="input-big "  onChange={e=>edu_name.onChange(e)} onBlur={e=>edu_name.onBlur(e)} value={edu_name.value} name="edu_name" maxlength="150"  /></label>
                <div class="row">
                    <label class="form-label col-sm">Серия Номер<span ></span>
                        <input class="input-medium" onChange={e=>edu_serial_number.onChange(e)} onBlur={e=>edu_serial_number.onBlur(e)} value={edu_serial_number.value}  name="edu_serial_number" maxlength="20"  /></label>
                    <label class="form-label col-sm">Дата выдачи<span ></span>
                        <input class="input-medium" onChange={e=>edu_date_of_issue.onChange(e)} onBlur={e=>edu_date_of_issue.onBlur(e)} value={edu_date_of_issue.value} name="edu_date_of_issue" maxlength="10" placeholder="дд.мм.гггг" /></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Средний балл<span ></span>
                        <input class="input-medium" onChange={e=>edu_average.onChange(e)} onBlur={e=>edu_average.onBlur(e)} value={edu_average.value} name="edu_average" maxlength="3"  /></label>
                    <label class="form-label col-sm">Иностранный язык<span></span>
                    <select class="select-medium " onChange={e=>edu_foreign_lang.onChange(e)} onBlur={e=>edu_foreign_lang.onBlur(e)} value={edu_foreign_lang.value} name="edu_foreign_lang" >
                        <option value="1">Английский</option>
                        <option value="2">Немецкий</option>
                        <option value="3">Французcкий</option>
                        <option value="4">Итальянский</option>
                        <option value="5">Испанский</option>
                        <option value="6">Китайский</option>
                        <option value="7">другой</option>
                    </select></label>
                </div>
                <hr/>
<legend class="text-center">Информация о поступлении</legend>
                    <label class="form-label w-200">Факультет/Институт<span >*</span>
                    <select class="select-big1200 " onChange={e=>pref_faculty.onChange(e)} onBlur={e=>pref_faculty.onBlur(e)} value={pref_faculty.value} name="pref_faculty" >
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
                <div class="row">
                    <div class="row">
                            <input class="custom-radio" onChange={e=>pref_target.onChange(e)} onBlur={e=>pref_target.onBlur(e)} value={pref_target.value} id="prform_chbx_1"  name="pref_target" type="checkbox" />
                        <label for="prform_chbx_1">На условиях целевой подготовки</label>
                    </div>
                    <div class="row">
                            <input class="custom-radio" onChange={e=>pref_nopay.onChange(e)} onBlur={e=>pref_nopay.onBlur(e)} value={pref_nopay.value} id="prform_chbx_2" name="pref_nopay" type="checkbox" />
                        <label for="prform_chbx_2" >За счет средств бюджета</label>
                    </div>
                    <div class="row">
                            <input class="custom-radio" onChange={e=>pref_pay.onChange(e)} onBlur={e=>pref_pay.onBlur(e)} value={pref_pay.value} id="prform_chbx_3"  name="pref_pay" type="checkbox" />
                        <label for="prform_chbx_3" >На платной основе</label>
                    </div>
                </div>
                    <div class="row">
                            <input class="custom-radio" onChange={e=>pref_dorm.onChange(e)} onBlur={e=>pref_dorm.onBlur(e)} value={pref_dorm.value} id="prform_chbx_4"  name="pref_dorm" type="checkbox" />
                        <label for="prform_chbx_4">Нуждаюсь в общежитии</label>
                    </div>
                    <hr/>
<legend class="text-center">Работа и стаж</legend>
                <label class="form-label w-100">Место работы, занимаемая должность (профессия)
                    <input class="input-big" onChange={e=>exp_position.onChange(e)} onBlur={e=>exp_position.onBlur(e)} value={exp_position.value}  name="exp_position" maxlength="150" /></label>
                <p class="lead">Трудовой стаж по профилю избранной специальности:</p>
                <div class="row">
                    <label class="form-label col-sm">Полных лет
                        <input class="input-medium "  onChange={e=>exp_years.onChange(e)} onBlur={e=>exp_years.onBlur(e)} value={exp_years.value} name="exp_years" maxlength="2" /></label>
                    <label class="form-label col-sm">Полных месяцев
                        <input class="input-medium " onChange={e=>exp_months.onChange(e)} onBlur={e=>exp_months.onBlur(e)} value={exp_months.value}  name="exp_months" maxlength="2" /></label>
                </div>
                <hr/>
<legend class="text-center">Родители</legend>
                <p class="lead">Отец</p>
                <div class="row">
                    <label class="form-label col-sm">Фамилия
                        <input class="input-small"  onChange={e=>father_surname.onChange(e)} onBlur={e=>father_surname.onBlur(e)} value={father_surname.value} name="father_surname" maxlength="50" /></label>
                    <label class="form-label col-sm">Имя
                        <input class="input-small"  onChange={e=>father_name.onChange(e)} onBlur={e=>father_name.onBlur(e)} value={father_name.value}  name="father_name" maxlength="50" /></label> 
                    <label class="form-label col-sm">Отчество
                        <input class="input-small"  onChange={e=>father_second_name.onChange(e)} onBlur={e=>father_second_name.onBlur(e)} value={father_second_name.value} name="father_second_name" maxlength="50" /></label>
                </div>
                <label class="form-label w-100">Место работы
                    <input class="input-big" onChange={e=>father_job.onChange(e)} onBlur={e=>father_job.onBlur(e)} value={father_job.value} name="father_job" maxlength="150" /></label>
                <div class="row">
                    <label class="form-label col-sm">Должность
                        <input class="input-medium" onChange={e=>father_position.onChange(e)} onBlur={e=>father_position.onBlur(e)} value={father_position.value}  name="father_position" maxlength="50" /></label>
                    <label class="form-label col-sm">Моб. телефон
                        <input class="input-medium" onChange={e=>father_phone.onChange(e)} onBlur={e=>father_phone.onBlur(e)} value={father_phone.value}  name="father_phone" maxlength="50" /></label>
                </div>
                    <label class="form-label w-100">Полный адрес
                        <input class="input-big" onChange={e=>father_address.onChange(e)} onBlur={e=>father_address.onBlur(e)} value={father_address.value}  name="father_address" maxlength="150" /></label>
                <p class="lead">Мать</p>
                <div class="row">
                    <label class="form-label col-sm">Фамилия
                        <input class="input-small"  onChange={e=>mother_surname.onChange(e)} onBlur={e=>mother_surname.onBlur(e)} value={mother_surname.value}  name="mother_surname" maxlength="50" /></label>
                    <label class="form-label col-sm">Имя
                        <input class="input-small"  onChange={e=>mother_name.onChange(e)} onBlur={e=>mother_name.onBlur(e)} value={mother_name.value} name="mother_name" maxlength="50" /></label> 
                    <label class="form-label col-sm">Отчество
                        <input class="input-small"   onChange={e=>mother_second_name.onChange(e)} onBlur={e=>mother_second_name.onBlur(e)} value={mother_second_name.value}  name="mother_second_name" maxlength="50" /></label>
                </div>
                    <label class="form-label w-100">Место работы
                        <input class="input-big"  onChange={e=>mother_job.onChange(e)} onBlur={e=>mother_job.onBlur(e)} value={mother_job.value} name="mother_job" maxlength="150" /></label>
                <div class="row">
                    <label class="form-label col-sm">Должность
                        <input class="input-medium"  onChange={e=>mother_position.onChange(e)} onBlur={e=>mother_position.onBlur(e)} value={mother_position.value} name="mother_position" maxlength="50" /></label>
                    <label class="form-label col-sm">Моб. телефон
                        <input class="input-medium"  onChange={e=>mother_phone.onChange(e)} onBlur={e=>mother_phone.onBlur(e)} value={mother_phone.value}  name="mother_phone" maxlength="50" /></label>
                </div>
                    <label class="form-label w-100">Полный адрес
                        <input class="input-big" onChange={e=>mother_address.onChange(e)} onBlur={e=>mother_address.onBlur(e)} value={mother_address.value}  name="mother_address" maxlength="150" /></label>
                        <hr/>

<legend class="text-center">Льготы</legend>
                <div class="row">
                    <input id="pr_chbx_1" class="custom-radio" onChange={e=>stat18.onChange(e)} onBlur={e=>stat18.onBlur(e)} value={stat18.value} name="stat18" type="checkbox" />
                    <label for="pr_chbx_1" >Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статья Ч18)</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_2" class="custom-radio" onChange={e=>stat19_23.onChange(e)} onBlur={e=>stat19_23.onBlur(e)} value={stat19_23.value} name="stat19_23" type="checkbox" />
                    <label for="pr_chbx_2" >Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статьи Ч19, Ч20, Ч21, Ч22, Ч23)</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_3" class="custom-radio" onChange={e=>dis.onChange(e)} onBlur={e=>dis.onBlur(e)} value={dis.value} name="dis" type="checkbox" />
                    <label for="pr_chbx_3" >Ребенок-инвалид, инвалид I, II, III гр.</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_4" class="custom-radio"  onChange={e=>nop.onChange(e)} onBlur={e=>nop.onBlur(e)} value={nop.value} name="nop" type="checkbox" />
                    <label for="pr_chbx_4">Сирота или ребенок, оставшийся без попечения родителей</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_5" class="custom-radio" onChange={e=>mil.onChange(e)} onBlur={e=>mil.onBlur(e)} value={mil.value} name="mil" type="checkbox" />
                    <label for="pr_chbx_5" >Ребенок лица, погибшего (получившего ранения, инвалидность) при исполнении воинского долга (служебной обязанности)</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_6" class="custom-radio" onChange={e=>bff.onChange(e)} onBlur={e=>bff.onBlur(e)} value={bff.value} name="bff" type="checkbox"/>
                    <label for="pr_chbx_6">Из многодетной семьи</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_7" class="custom-radio" onChange={e=>medal.onChange(e)} onBlur={e=>medal.onBlur(e)} value={medal.value} name="medal" type="checkbox" />
                    <label for="pr_chbx_7" >Имею аттестат с медалью</label>
                </div>
                <div class="row">
                    <input id="pr_chbx_8" class="custom-radio" onChange={e=>diplo.onChange(e)} onBlur={e=>diplo.onBlur(e)} value={diplo.value}   name="diplo" type="checkbox" />
                    <label for="pr_chbx_8" >Имею диплом с отличием</label> 
                </div>
                <hr/>
<legend class="text-center">Награды по предметам</legend>
                <div class="row">
                    <label class="form-label col-lg">Язык
                    <select class="select-medium400" onChange={e=>awards_lang.onChange(e)} onBlur={e=>awards_lang.onBlur(e)} value={awards_lang.value} name="awards_lang">
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
                    <label class="form-label col-lg">Химия
                    <select class="select-medium400" onChange={e=>awards_chem.onChange(e)} onBlur={e=>awards_chem.onBlur(e)} value={awards_chem.value} name="awards_chem">
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
                    <label class="form-label col-lg">Биология
                    <select class="select-medium400" onChange={e=>awards_biol.onChange(e)} onBlur={e=>awards_biol.onBlur(e)} value={awards_biol.value} name="awards_biol">
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
                <hr/>
<legend class="text-center">ЦТ и баллы</legend>
                <p class="lead">Язык</p>
                <div class="row">
                    <label class="form-label col-sm">Серия
                        <input onChange={e=>cert_lang_serial.onChange(e)} onBlur={e=>cert_lang_serial.onBlur(e)} value={cert_lang_serial.value} class="input-small " name="cert_lang_serial" maxlength="8" /></label>
                    <label class="form-label col-sm">Номер
                        <input onChange={e=>cert_lang_number.onChange(e)} onBlur={e=>cert_lang_number.onBlur(e)} value={cert_lang_number.value} class="input-small " name="cert_lang_number" maxlength="7" /></label> 
                    <label class="form-label col-sm-2">Балл
                        <input onChange={e=>cert_lang_score.onChange(e)} onBlur={e=>cert_lang_score.onBlur(e)} value={cert_lang_score.value} class="input-small "name="cert_lang_score" maxlength="3" /></label>
                </div>
                <p class="lead">Химия</p>
                <div class="row">
                    <label class="form-label col-sm">Серия
                        <input onChange={e=>cert_chem_serial.onChange(e)} onBlur={e=>cert_chem_serial.onBlur(e)} value={cert_chem_serial.value} class="input-small " name="cert_chem_serial" maxlength="8" /></label>
                    <label class="form-label col-sm">Номер
                        <input onChange={e=>cert_chem_number.onChange(e)} onBlur={e=>cert_chem_number.onBlur(e)} value={cert_chem_number.value} class="input-small " name="cert_chem_number" maxlength="7" /></label> 
                    <label class="form-label col-sm-2">Балл
                        <input onChange={e=>cert_chem_score.onChange(e)} onBlur={e=>cert_chem_score.onBlur(e)} value={cert_chem_score.value} class="input-small " name="cert_chem_score" maxlength="3" /></label>
                </div>
                <p class="lead">Биология</p>
                <div class="row">
                    <label class="form-label col-sm">Серия
                        <input onChange={e=>cert_biol_serial.onChange(e)} onBlur={e=>cert_biol_serial.onBlur(e)} value={cert_biol_serial.value} class="input-small " name="cert_biol_serial" maxlength="8" /></label>
                    <label class="form-label col-sm">Номер
                        <input onChange={e=>cert_biol_number.onChange(e)} onBlur={e=>cert_biol_number.onBlur(e)} value={cert_biol_number.value} class="input-small " name="cert_biol_number" maxlength="7" /></label> 
                    <label class="form-label col-sm-2">Балл
                        <input onChange={e=>cert_biol_score.onChange(e)} onBlur={e=>cert_biol_score.onBlur(e)} value={cert_biol_score.value} class="input-small " name="cert_biol_score" maxlength="3" /></label>
                </div>
                <hr/>
                <div >
                    <input  id="agreement" class="custom-radio" onChange={e=>DD.onChange(e)} onBlur={e=>DD.onBlur(e)} value={DD.value} name="DD"type="checkbox"></input>
<label for="agreement" >Даю согласие на обработку, хранение и использование персональных данных для участия в конкурсе на получение высшего образования I ступени и зачисления.</label>
                </div>
                <div align ="center" >
                    <button type="submit" class="btn-three">Отправить</button>
                </div>
                        
                </form>
    </div>
    )
  }
  export default Anketa