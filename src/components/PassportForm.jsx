import "../style/Form.css"
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'



export const useValidation=(value,validations)=>{
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
export const useInput=(InitialValue,validations)=>{
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

export default function PassportForm(){

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

    return(
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
        </form>
    )
}
