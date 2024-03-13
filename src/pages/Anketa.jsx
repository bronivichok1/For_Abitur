import "../style/Anketa.css"
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const useValidation=(value,validations)=>{
    const[isEmpty,setEmpty]=useState(true)
    const[isRus,setRus]=useState(true)
    const[isEng,setEng]=useState(true)
    const[ismobileNum,setmobileNum]=useState(true)
    const[isemailCheck,setemailCheck]=useState(true)
    const[inputData,setInputData]=useState(true)
    const[Num,setInputNum]=useState(true)


    useEffect(()=>{
        for(const validation in validations){

            switch(validation){

                case 'isEmpty':
                    value?setEmpty(false):setEmpty(true)  //work
                break;
                case 'isRus':
                    var ru =/^[А-ЯЁ]{1}[а-яё]+(-[А-ЯЁ]{1}[а-яё]+)?( [А-ЯЁ]{1}[а-яё]+(-[А-ЯЁ]{1}[а-яё]+)?)?$/i
                    ru.test(String(value).toLowerCase())?setRus(false):setRus(true) //work
                break;
                case'isEng':
                    var eng=/^[A-Z]{1}[a-z]+(-[A-Z]{1}[a-z]+)?( [A-Z]{1}[-a-z]+(-[A-Z]{1}[a-z]+)?)?$/i
                    eng.test(String(value).toLowerCase())?setEng(false):setEng(true)   //work
                break;
                case'ismobileNum':
                    var num=/^\+375\d{9}$/
                    num.test(String(value).toLowerCase())?setmobileNum(false):setmobileNum(true) //work

                break;
                case'isemailCheck':
                    var mail=/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
                    mail.test(String(value).toLowerCase())?setemailCheck(false):setemailCheck(true) //work
                break;
                case'inputData':
                    var data=/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/
                    data.test(String(value).toLowerCase())?setInputData(false):setInputData(true)  //work
                break;
                case'Num':
                    var num= /^\d+$/
                    num.test(String(value).toLowerCase())?setInputNum(false):setInputNum(true)  //work
                break;

            }

        }
    },[value,isEmpty,isEng,isRus,inputData,isemailCheck,ismobileNum])

    return{
        isEmpty,
        isRus,
        isEng,
        ismobileNum,
        isemailCheck,
        inputData,
        Num

    }
}


const useInput=(InitialValue,validations)=>{
    const [value,setValue]=useState(InitialValue)
    const [checked, setChecked] = useState(false);
    const [isDirty,setDirty]=useState(false)
    const valid=useValidation(value,validations)
    const onChange=(e)=>{
        setValue(e.target.value)
        setChecked(e.target.checked)
    }
    const onBlur=(e)=>{
        setDirty(true)
    }
    
    return{
        value,
        checked,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}


function Anketa() {
    

    
    const requestURL = 'https://jsonplaceholder.typicode.com/users'

    function sendRequest(method, url, body = null) {
        const headers = {
          'Content-Type': 'application/json'
        }
      
        return fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: headers
        }).then(response => {
          if (response.ok) {
            return response.json()
          }
      
          return response.json().then(error => {
            const e = new Error('Что-то пошло не так')
            e.data = error
            throw e
          })
        })
      }
    const [data, setData] = useState({
        name: '',
      surname: '',
      second_name:'',
      surname_lat:'',
      name_lat:'',
      date_of_birth:'',
      citizenship:'',
      serial:'',
      number:'',
      person_id:'',
      date_of_issue:'',
      date_of_expiry:'',
      authority:'',
      postcode:'',
      region: '1',
      settlement_name:'',
      street_name:'',
      building:'',
      housing:'',
      apartment:'',
      stat_tel:'',
      mobile_tel:'+375',
      email:'',
      edu_date_of_issue:'',
      edu_serial_number:'',
      edu_name:'',
      edu_average:'',
      pref_pay:'1',
      pref_nopay:'1',
      pref_target:'1',
      pref_dorm:'1',
      exp_position:'',
      exp_years:'',
      exp_months:'',
      father_surname:'',
      father_name:'',
      father_second_name:'',
      father_job:'',
      father_position:'',
      father_phone:'+375',
      father_address:'',
      mother_surname:'',
      mother_name:'',
      mother_second_name:'',
      mother_job:'',
      mother_position:'',
      mother_phone:'+375',
      mother_address:'',
      cert_lang_serial:'',
      cert_lang_number:'',
      cert_lang_score:'',
      cert_chem_serial:'',
      cert_chem_number:'',
      cert_chem_score:'',
      cert_biol_serial:'',
      cert_biol_score:'',
      cert_biol_number:'',
      sex:'1',
      doc_type:'1',
      country:'0',
      area:'',
      settlement_type:'',
      street_type:'',
      edu_foreign_lang:'',
      pref_faculty:'',
      awards_lang:'',
      awards_chem:'',
      awards_biol:'',
      DD:'',
      diplo:'',
      medal:'',
      bff:'',
      mil:'',
      nop:'',
      dis:'',
      stat19_23:'',
      stat18:''
    });
    const [ButtonClick,setButtonClick]=useState(false)
    useEffect(()=>{
        if(ButtonClick==true){
            toast.success('Форма отправлена', {
                position: "top-right"
            })
            setButtonClick(false)
            sendRequest('POST', requestURL, body)
            .then(body => console.log(body))
            .catch(err => console.log(err))
        }
        const fetchData = async () => {
            try {
              const response = await fetch(requestURL);
              const result = await response.json();
              setData(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          console.log(data)
          fetchData();
        }, []);

    function handleClick(e) {
        setButtonClick(true)
        e.preventDefault()
      }

    const surname=useInput(data.surname,{isEmpty:true,isRus:true})
    const name=useInput(data.name,{isEmpty:true,isRus:true})
    const second_name=useInput(data.second_name,{isEmpty:true,isRus:true})
    const surname_lat=useInput(data.surname_lat,{isEmpty:true,isEng:true})
    const name_lat=useInput(data.name_lat,{isEmpty:true,isEng:true})
    const date_of_birth=useInput(data.date_of_birt,{isEmpty:true,inputData:true})
    const citizenship=useInput(data.citizenship,{isEmpty:true})
    const serial=useInput(data.serial,{isEmpty:true})
    const number=useInput(data.number,{isEmpty:true, Num:true})
    const person_id=useInput(data.person_id,{isEmpty:true})
    const date_of_issue=useInput(data.date_of_issue,{isEmpty:true,inputData:true})
    const date_of_expiry=useInput(data.date_of_expiry,{isEmpty:true,inputData:true})
    const authority=useInput(data.authority,{isEmpty:true})
    const postcode=useInput(data.postcode,{isEmpty:true})
    const region=useInput(data.region,{isEmpty:true})
    const settlement_name=useInput(data.settlement_name,{isEmpty:true})
    const street_name=useInput(data.street_name,{isEmpty:true})
    const building=useInput(data.building,{isEmpty:true})
    const housing=useInput(data.housing,{isEmpty:true})
    const apartment=useInput(data.apartment,{isEmpty:true})
    const stat_tel=useInput(data.stat_tel,{isEmpty:true})
    const mobile_tel=useInput(data.mobile_tel,{isEmpty:true,ismobileNum:true})
    const email=useInput(data.email,{isEmpty:true,isemailCheck:true})
    const edu_date_of_issue=useInput(data.edu_date_of_issue,{isEmpty:true, inputData:true})
    const edu_serial_number=useInput(data.edu_serial_number,{isEmpty:true})
    const edu_name=useInput(data.edu_name,{isEmpty:true})
    const edu_average=useInput(data.edu_average,{isEmpty:true})
    const pref_pay=useInput(data.pref_pay,{isEmpty:true})
    const pref_nopay=useInput(data.pref_nopay,{isEmpty:true})
    const pref_target=useInput(data.pref_target,{isEmpty:true})
    const pref_dorm=useInput(data.pref_dorm,{isEmpty:true})
    const exp_position=useInput(data.exp_position,{isEmpty:true})
    const exp_years=useInput(data.exp_years,{isEmpty:true})
    const exp_months=useInput(data.exp_months,{isEmpty:true})
    const father_surname=useInput(data.father_surname,{isEmpty:true})
    const father_name=useInput(data.father_name,{isEmpty:true})
    const father_second_name=useInput(data.father_second_name,{isEmpty:true})
    const father_job=useInput(data.father_job,{isEmpty:true})
    const father_position=useInput(data.father_position,{isEmpty:true})
    const father_phone=useInput(data.father_phone,{isEmpty:true,ismobileNum:true })
    const father_address=useInput(data.father_address,{isEmpty:true})
    const mother_surname=useInput(data.mother_surname,{isEmpty:true})
    const mother_name=useInput(data.mother_name,{isEmpty:true})
    const mother_second_name=useInput(data.mother_second_name,{isEmpty:true})
    const mother_job=useInput(data.mother_job,{isEmpty:true})
    const mother_position=useInput(data.mother_position,{isEmpty:true})
    const mother_phone=useInput(data.mother_phone,{isEmpty:true,ismobileNum:true})
    const mother_address=useInput(data.mother_address,{isEmpty:true})
    const cert_lang_serial=useInput(data.cert_lang_serial,{isEmpty:true})
    const cert_lang_number=useInput(data.cert_lang_number,{isEmpty:true})
    const cert_lang_score=useInput(data.cert_lang_score,{isEmpty:true})
    const cert_chem_serial=useInput(data.cert_chem_serial,{isEmpty:true})
    const cert_chem_number=useInput(data.cert_chem_number,{isEmpty:true})
    const cert_chem_score=useInput(data.cert_chem_score,{isEmpty:true})
    const cert_biol_serial=useInput(data.cert_biol_serial,{isEmpty:true})
    const cert_biol_score=useInput(data.cert_biol_score,{isEmpty:true})
    const cert_biol_number=useInput(data.cert_biol_number,{isEmpty:true})
    const sex=useInput(data.sex,{isEmpty:true})
    const doc_type=useInput(data.doc_type,{isEmpty:true})
    const country=useInput(data.country,{isEmpty:true})
    const area=useInput(data.area,{isEmpty:true})
    const settlement_type=useInput(data.settlement_type)
    const street_type=useInput(data.street_type)
    const edu_foreign_lang=useInput(data.edu_foreign_lang)
    const pref_faculty=useInput(data.pref_faculty)
    const awards_lang=useInput(data.awards_lang)
    const awards_chem=useInput(data.awards_chem)
    const awards_biol=useInput(data.awards_biol)
    const DD=useInput(data.DD,{isEmpty:true})
    const diplo=useInput(data.diplo)
    const medal=useInput(data.medal)
    const bff=useInput(data.bff)
    const mil=useInput(data.mil)
    const nop=useInput(data.nop)
    const dis=useInput(data.dis)
    const stat19_23=useInput(data.stat19_23)
    const stat18=useInput(data.stat18)
    
    const body = {
      name: name.value,
      surname: surname.value,
      second_name:second_name.value,
      surname_lat:surname_lat.value,
      name_lat:name_lat.value,
      date_of_birth:date_of_birth.value,
      citizenship:citizenship.value,
      serial:serial.value,
      number:number.value,
      person_id:person_id.value,
      date_of_issue:date_of_issue.value,
      date_of_expiry:date_of_expiry.value,
      authority:authority.value,
      postcode:postcode.value,
      region:region.value,
      settlement_name:settlement_name.value,
      street_name:street_name.value,
      building:building.value,
      housing:housing.value,
      apartment:apartment.value,
      stat_tel:stat_tel.value,
      mobile_tel:mobile_tel.value,
      email:email.value,
      edu_date_of_issue:edu_date_of_issue.value,
      edu_serial_number:edu_serial_number.value,
      edu_name:edu_name.value,
      edu_average:edu_average.value,
      pref_pay:pref_pay.checked,
      pref_nopay:pref_nopay.checked,
      pref_target:pref_target.checked,
      pref_dorm:pref_dorm.checked,
      exp_position:exp_position.value,
      exp_years:exp_years.value,
      exp_months:exp_months.value,
      father_surname:father_surname.value,
      father_name:father_name.value,
      father_second_name:father_second_name.value,
      father_job:father_job.value,
      father_position:father_position.value,
      father_phone:father_phone.value,
      father_address:father_address.value,
      mother_surname:mother_surname.value,
      mother_name:mother_name.value,
      mother_second_name:mother_second_name.value,
      mother_job:mother_job.value,
      mother_position:mother_position.value,
      mother_phone:mother_phone.value,
      mother_address:mother_address.value,
      cert_lang_serial:cert_lang_serial.value,
      cert_lang_number:cert_lang_number.value,
      cert_lang_score:cert_lang_score.value,
      cert_chem_serial:cert_chem_serial.value,
      cert_chem_number:cert_chem_number.value,
      cert_chem_score:cert_chem_score.value,
      cert_biol_serial:cert_biol_serial.value,
      cert_biol_score:cert_biol_score.value,
      cert_biol_number:cert_biol_number.value,
      sex:sex.value,
      doc_type:doc_type.value,
      country:country.value,
      area:area.value,
      settlement_type:settlement_type.value,
      street_type:street_type.value,
      edu_foreign_lang:edu_foreign_lang.value,
      pref_faculty:pref_faculty.value,
      awards_lang:awards_lang.value,
      awards_chem:awards_chem.value,
      awards_biol:awards_biol.value,
      DD:DD.checked,
      diplo:diplo.checked,
      medal:medal.checked,
      bff:bff.checked,
      mil:mil.checked,
      nop:nop.checked,
      dis:dis.checked,
      stat19_23:stat19_23.checked,
      stat18:stat18.checked
    }

    
    

     /*toast.error("Error Notification !", {
       position: "top-center"
     });
   
     toast.warn("Warning Notification !", {
       position: "top-center"
     });
   
     toast.info("Info Notification !", {
       position: "top-center"
     });*/


    return (

            
        <form  className="form" autoComplete="off">
<legend>Личные и паспортные данные</legend>
                    <div className="row">
                <label className="form-label col-sm">Фамилия<span>*</span>
                        <input  className={surname.isDirty&&(surname.isRus||surname.isEmpty)?"input_w400-error":"input_w400"} onChange={e=>surname.onChange(e)} onBlur={e=>surname.onBlur(e)} value={surname.value}   name="surname" maxLength="40" />
                        {(surname.isDirty&&surname.isEmpty)&&<div  style={{color:'red'}}> Поле "Фамилия" обязательно для заполнения.</div>}
                        {(surname.isDirty&&surname.isRus&&!surname.isEmpty)&&<div  style={{color:'red'}}> В поле "Фамилия" допустима только кириллица, первая буква - заглавная.</div>}
                </label> 
                <label className="form-label col-sm" >Имя<span>*</span>
                        <input className={name.isDirty&&(name.isRus||name.isEmpty)?"input_w400-error":"input_w400"}  onChange={e=>name.onChange(e)} onBlur={e=>name.onBlur(e)} value={name.value} name="name" maxLength="40"/>
                        {(name.isDirty&&name.isEmpty)&&<div style={{color:'red'}}> Поле "Имя" обязательно для заполнения.</div>}
                        {(name.isDirty&&name.isRus&&!name.isEmpty)&&<div style={{color:'red'}}> В поле "Имя" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                <label className="form-label col-sm">Отчество
                        <input className={second_name.isDirty&&second_name.isRus&&!second_name.isEmpty?"input_w390-error":"input_w390"}  onChange={e=>second_name.onChange(e)} onBlur={e=>second_name.onBlur(e)} value={second_name.value}  name="second_name" maxLength="40" />
                        {(second_name.isDirty&&second_name.isRus&&!second_name.isEmpty)&&<div style={{color:'red'}}> В поле "Отчество" допустима только кириллица, первая буква - заглавная.</div>}
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm">Фамилия (латиница)<span >*</span>
                        <input className={surname_lat.isDirty&&(surname_lat.isEng||surname_lat.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>surname_lat.onChange(e)} onBlur={e=>surname_lat.onBlur(e)} value={surname_lat.value} name="surname_lat" maxLength="40" />
                        {(surname_lat.isDirty&&surname_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Фамилия(латиница)" обязательно для заполнения.</div>}
                        {(surname_lat.isDirty&&surname_lat.isEng&&!surname_lat.isEmpty)&&<div style={{color:'red'}}> В поле "Фамилия(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label> 
                <label className="form-label col-sm">Имя (латиница)<span >*</span>
                        <input className={name_lat.isDirty&&(name_lat.isEng||name_lat.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>name_lat.onChange(e)} onBlur={e=>name_lat.onBlur(e)} value={name_lat.value}  name="name_lat" maxLength="40" />
                        {(name_lat.isDirty&&name_lat.isEmpty)&&<div style={{color:'red'}}> Поле "Имя(латиница)" обязательно для заполнения.</div>}
                        {(name_lat.isDirty&&name_lat.isEng&&!name_lat.isEmpty)&&<div style={{color:'red'}}> В поле "Имя(латиница)" допустима только латиница,первая буква - заглавная .</div>}
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm">Пол<span >*</span>
                    <select className="select_w300 " onChange={e=>sex.onChange(e)} onBlur={e=>sex.onBlur(e)} value={sex.value}  name="sex">
                        <option value="0">Женский</option>
                        <option value="1">Мужской</option>
                    </select>
                </label>
                <label className="form-label col-sm">Дата рождения<span >*</span>
                <input className={date_of_birth.isDirty&&(date_of_birth.inputData||date_of_birth.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_birth.onChange(e)} onBlur={e=>date_of_birth.onBlur(e)} value={date_of_birth.value}  name="date_of_birth" placeholder="дд.мм.гггг" maxLength="10" />
                        {(date_of_birth.isDirty&&date_of_birth.isEmpty)&&<div style={{color:'red'}}> Поле "Дата рождения" обязательно для заполнения.</div>}
                        {(date_of_birth.isDirty&&date_of_birth.inputData&&!date_of_birth.isEmpty)&&<div style={{color:'red'}}> Поле "Дата рождения" должно соответствовать формату "дд.мм.гггг".</div>}

                </label>
                <label className="form-label col-sm-6">Тип документа<span >*</span>
                    <select className="select_w595" onChange={e=>doc_type.onChange(e)} onBlur={e=>doc_type.onBlur(e)} value={doc_type.value}  name="doc_type">
                        <option value="1" >паспорт гражданина РБ</option>
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
                    <div className="row">
                <label className="form-label col-sm-6">Гражданство<span >*</span>
                        <input className={citizenship.isDirty&&citizenship.isEmpty?"input_w600-error":"input_w600"} onChange={e=>citizenship.onChange(e)} onBlur={e=>citizenship.onBlur(e)} value={citizenship.value} name="citizenship" maxLength="40" />
                        {(citizenship.isDirty&&citizenship.isEmpty)&&<div style={{color:'red'}}> Поле "Гражданство" обязательно для заполнения.</div>}

                </label>
                <label className="form-label col-sm-2">Серия
                        <input className="input_w295" onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxLength="10" />
                
                </label>
                <label className="form-label col-sm-4">Номер<span >*</span>
                        <input className={number.isDirty&&(number.isEmpty||number.Num)?"input_w295-error":"input_w295"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value}  name="number" maxLength="15" />
                        {(number.isDirty&&number.isEmpty)&&<div style={{color:'red'}}> Поле "Номер" обязательно для заполнения.</div>}
                        {(number.isDirty&&number.Num&&!number.isEmpty)&&<div style={{color:'red'}}> Поле "Номер" может содержать только цифры.</div>}

                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm-6">Идентификационный номер
                        <input className="input_w600" onChange={e=>person_id.onChange(e)} onBlur={e=>person_id.onBlur(e)} value={person_id.value}  name="person_id" maxLength="20" />
                </label>
                <label className="form-label col-sm-3">Дата выдачи<span >*</span>
                        <input className={date_of_issue.isDirty&&(date_of_issue.inputData||date_of_issue.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value}  name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" />
                        {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div style={{color:'red'}}> Поле "Дата выдачи" обязательно для заполнения.</div>}
                        {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div style={{color:'red'}}> Поле "Дата выдачи" должно соответствовать формату "дд.мм.гггг".</div>}

                </label>
                <label className="form-label col-sm-3">Срок действия<span >*</span>
                        <input className={date_of_expiry.isDirty&&(date_of_expiry.inputData||date_of_expiry.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value}  name="date_of_expiry" placeholder="дд.мм.гггг" maxLength="10"/>
                        {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div style={{color:'red'}}> Поле "Срок действия" обязательно для заполнения.</div>}
                        {(date_of_expiry.isDirty&&date_of_expiry.inputData&&!date_of_expiry.isEmpty)&&<div style={{color:'red'}}> Поле "Срок действия" должно соответствовать формату "дд.мм.гггг".</div>}

                </label>
                    </div>
                    <div className="row">
                <label className="form-label w-100">Кем выдан<span >*</span>
                        <input className={authority.isDirty&&authority.isEmpty?"input_w1210-error":"input_w1210"} onChange={e=>authority.onChange(e)} onBlur={e=>authority.onBlur(e)} value={authority.value}  name="authority" maxLength="100" />
                        {(authority.isDirty&&authority.isEmpty)&&<div style={{color:'red'}}> Поле "Кем выдан" обязательно для заполнения.</div>}

                </label>
                </div>
                <hr/>
<legend className="text-center">Адрес места жительства в соответствии со штампом о регистрации, контактные данные</legend>
                <div className="row">
                    <label className="form-label col-sm-4">Почтовый индекс
                        <input className="input_w295" onChange={e=>postcode.onChange(e)} onBlur={e=>postcode.onBlur(e)} value={postcode.value}  name="postcode" maxLength="10"/></label>
                    <label className="form-label col-sm-8">Страна
                        <select className="select_w900" onChange={e=>country.onChange(e)} onBlur={e=>country.onBlur(e)} value={country.value}  name="country">
                        <option value="0">Республика Беларусь</option>
                        <option value="1">Российская Федерация</option>
                        <option value="2">Республика Казахстан</option>
                        <option value="3">Республика Таджикистан</option>
                        <option value="4">Кыргызская Республика</option>
                    </select>
                    </label>
                </div>
                <div className="row">
                    <label className="form-label col-sm">Область
                        <select className="select_w595" onChange={e=>region.onChange(e)} onBlur={e=>region.onBlur(e)} value={region.value} name="region" hidden={country.value!="0"}>
                        <option value="1">г. Минск</option>
                        <option value="2">Брестская область</option>
                        <option value="3">Витебская область</option>
                        <option value="4">Гродненская область</option>
                        <option value="5">Гомельская область</option>
                        <option value="6">Минская область</option>
                        <option value="7">Могилевская область</option>
                    </select>
                        <input className="input_w600" onChange={e=>region.onChange(e)} onBlur={e=>region.onBlur(e)} value={region.value}  name="region" maxLength="40" hidden={country.value=="0"}/></label>
                    <label >Район
                        <input className="input_w600" onChange={e=>area.onChange(e)} onBlur={e=>area.onBlur(e)} value={area.value} name="area" maxLength="40" /></label>
                </div>
                <div className="row">
                    <label className="form-label col-sm">Тип насел. пункта
                    <select className="select_w595"onChange={e=>settlement_type.onChange(e)} onBlur={e=>settlement_type.onBlur(e)} value={settlement_type.value} name="settlement_type">
                        <option value="1">Город</option>
                        <option value="2">Городской поселок</option>
                        <option value="3">Агрогородок</option>
                        <option value="4">Поселок</option>
                        <option value="5">Деревня</option>
                        <option value="6">иное</option>
                    </select>
                    </label>
                    <label className="form-label col-sm">Населенный пункт
                        <input className="input_w600" onChange={e=>settlement_name.onChange(e)} onBlur={e=>settlement_name.onBlur(e)} value={settlement_name.value}  name="settlement_name" maxLength="40" />
                    </label>
                </div>
                <div className="row">
                    <label className="form-label col-sm-3">Тип улицы
                    <select  className="select_w595" onChange={e=>street_type.onChange(e)} onBlur={e=>street_type.onBlur(e)} value={street_type.value} name="м">
                        <option value="1">улица</option>
                        <option value="2">проспект</option>
                        <option value="3">бульвар</option>
                        <option value="4">проезд</option>
                        <option value="5">тупик</option>
                        <option value="6">площадь</option>
                        <option value="7">переулок</option>
                        <option value="9">микрорайон</option>
                        <option value="8">иное (указать в названии)</option>
                    </select>
                    </label>
                    <label className="form-label col-sm-5">Название улицы
                    <input className="input_w600" onChange={e=>street_name.onChange(e)} onBlur={e=>street_name.onBlur(e)} value={street_name.value}  name="street_name" maxLength="40" /></label>
                </div>
                <div className="row">
                    <label className="form-label col-sm-2">Дом
                        <input className="input_w200" onChange={e=>building.onChange(e)} onBlur={e=>building.onBlur(e)} value={building.value}  name="building" maxLength="10" /></label>
                    <label className="form-label col-sm-2">Корпус
                        <input className="input_w200" onChange={e=>housing.onChange(e)} onBlur={e=>housing.onBlur(e)} value={housing.value}  name="housing" maxLength="10" /></label>
                    <label className="form-label col-sm-2">Квартира
                        <input className="input_w200" onChange={e=>apartment.onChange(e)} onBlur={e=>apartment.onBlur(e)} value={apartment.value}  name="apartment" maxLength="10" /></label>
                    <label className="form-label col-sm-6">Домашний тел.
                        <input className="input_w580 " onChange={e=>stat_tel.onChange(e)} onBlur={e=>stat_tel.onBlur(e)} value={stat_tel.value}  name="stat_tel"  maxLength="20" /></label>
                </div>
                <div className="row">
                    <label className="form-label col-sm">Мобильный тел.<span >*</span>
                        <input className={mobile_tel.isDirty&&(mobile_tel.ismobileNum||mobile_tel.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>mobile_tel.onChange(e)} onBlur={e=>mobile_tel.onBlur(e)} value={mobile_tel.value}  placeholder="+375XXXXXXXXX" name="mobile_tel" maxLength="20"  />
                        {(mobile_tel.isDirty&&mobile_tel.isEmpty)&&<div  style={{color:'red'}}> Поле "Мобильный тел." обязательно для заполнения.</div>}
                        {(mobile_tel.isDirty&&mobile_tel.ismobileNum&&!mobile_tel.isEmpty)&&<div  style={{color:'red'}}> Поле "Мобильный тел." должно соответствовать формату "+375XXXXXXXXX".</div>}
                        </label>
                    <label className="form-label col-sm">E-mail<span >*</span>
                        <input className={email.isDirty&&(email.isemailCheck||email.isEmpty)?"input_w590-error":"input_w590"} onChange={e=>email.onChange(e)} onBlur={e=>email.onBlur(e)} value={email.value}  name="email" maxLength="40"/>
                        {(email.isDirty&&email.isEmpty)&&<div style={{color:'red'}}> Поле "E-mail" обязательно для заполнения.</div>}
                        {(email.isDirty&&email.isemailCheck&&!email.isEmpty)&&<div style={{color:'red'}}> Поле "E-mail" заполнено неверно.</div>}
                    </label>
                </div>
                <hr/>
<legend className="text-center">Образование, сведения документа об образовании</legend>
                    <label className="form-label w-100">Название УО<span ></span>
                        <input className="input_w1210"  onChange={e=>edu_name.onChange(e)} onBlur={e=>edu_name.onBlur(e)} value={edu_name.value} name="edu_name" maxLength="150"  /></label>
                <div className="row">
                    <label className="form-label col-sm">Серия Номер<span ></span>
                        <input className="input_w600" onChange={e=>edu_serial_number.onChange(e)} onBlur={e=>edu_serial_number.onBlur(e)} value={edu_serial_number.value}  name="edu_serial_number" maxLength="20"  /></label>
                    <label className="form-label col-sm">Дата выдачи<span ></span>
                        <input className={(edu_date_of_issue.isDirty&&edu_date_of_issue.ismobileNum&&!edu_date_of_issue.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>edu_date_of_issue.onChange(e)} onBlur={e=>edu_date_of_issue.onBlur(e)} value={edu_date_of_issue.value} name="edu_date_of_issue" maxLength="10" placeholder="дд.мм.гггг" />
                        {(edu_date_of_issue.isDirty&&edu_date_of_issue.inputData&&!edu_date_of_issue.isEmpty)&&<div style={{color:'red'}}> Поле "Дата выдачи" должно соответствовать формату "дд.мм.гггг".</div>}
                        </label>
                </div>
                <div className="row">
                    <label className="form-label col-sm">Средний балл<span ></span>
                        <input className="input_w600" onChange={e=>edu_average.onChange(e)} onBlur={e=>edu_average.onBlur(e)} value={edu_average.value} name="edu_average" maxLength="3"  /></label>
                    <label className="form-label col-sm">Иностранный язык<span></span>
                    <select className="select_w595" onChange={e=>edu_foreign_lang.onChange(e)} onBlur={e=>edu_foreign_lang.onBlur(e)} value={edu_foreign_lang.value} name="edu_foreign_lang" >
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
<legend className="text-center">Информация о поступлении</legend>
                    <label className="form-label w-200">Факультет/Институт<span >*</span>
                    <select className="select_w1210" onChange={e=>pref_faculty.onChange(e)} onBlur={e=>pref_faculty.onBlur(e)} value={pref_faculty.value} name="pref_faculty" >
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
                <div className="row">
                    <div className="row">
                            <input className="custom-radio" onChange={e=>pref_target.onChange(e)} onBlur={e=>pref_target.onBlur(e)} checked={pref_target.checked} id="prform_chbx_1"  name="pref_target" type="checkbox" />
                        <label htmlFor="prform_chbx_1">На условиях целевой подготовки</label>
                    </div>
                    <div className="row">
                            <input className="custom-radio" onChange={e=>pref_nopay.onChange(e)} onBlur={e=>pref_nopay.onBlur(e)} checked={pref_nopay.checked} id="prform_chbx_2" name="pref_nopay" type="checkbox" />
                        <label htmlFor="prform_chbx_2" >За счет средств бюджета</label>
                    </div>
                    <div className="row">
                            <input className="custom-radio" onChange={e=>pref_pay.onChange(e)} onBlur={e=>pref_pay.onBlur(e)} checked={pref_pay.checked} id="prform_chbx_3"  name="pref_pay" type="checkbox" />
                        <label htmlFor="prform_chbx_3" >На платной основе</label>
                    </div>
                </div>
                    <div className="row">
                            <input className="custom-radio" onChange={e=>pref_dorm.onChange(e)} onBlur={e=>pref_dorm.onBlur(e)} checked={pref_dorm.checked} id="prform_chbx_4"  name="pref_dorm" type="checkbox" />
                        <label htmlFor="prform_chbx_4">Нуждаюсь в общежитии</label>
                    </div>
                    <hr/>
<legend className="text-center">Работа и стаж</legend>
                <label className="form-label w-100">Место работы, занимаемая должность (профессия)
                    <input className="input_w1210" onChange={e=>exp_position.onChange(e)} onBlur={e=>exp_position.onBlur(e)} checked={exp_position.checked}  name="exp_position" maxLength="150" /></label>
                <p className="lead">Трудовой стаж по профилю избранной специальности:</p>
                <div className="row">
                    <label className="form-label col-sm">Полных лет
                        <input className="input_w600"  onChange={e=>exp_years.onChange(e)} onBlur={e=>exp_years.onBlur(e)} checked={exp_years.checked} name="exp_years" maxLength="2" /></label>
                    <label className="form-label col-sm">Полных месяцев
                        <input className="input_w600" onChange={e=>exp_months.onChange(e)} onBlur={e=>exp_months.onBlur(e)} checked={exp_months.checked}  name="exp_months" maxLength="2" /></label>
                </div>
                <hr/>
<legend className="text-center">Родители</legend>
                <p className="lead">Отец</p>
                <div className="row">
                    <label className="form-label col-sm">Фамилия
                        <input className="input_w400"  onChange={e=>father_surname.onChange(e)} onBlur={e=>father_surname.onBlur(e)} value={father_surname.value} name="father_surname" maxLength="40" /></label>
                    <label className="form-label col-sm">Имя
                        <input className="input_w400"  onChange={e=>father_name.onChange(e)} onBlur={e=>father_name.onBlur(e)} value={father_name.value}  name="father_name" maxLength="40" /></label> 
                    <label className="form-label col-sm">Отчество
                        <input className="input_w390"  onChange={e=>father_second_name.onChange(e)} onBlur={e=>father_second_name.onBlur(e)} value={father_second_name.value} name="father_second_name" maxLength="40" /></label>
                </div>
                <label className="form-label w-100">Место работы
                    <input className="input_w1210" onChange={e=>father_job.onChange(e)} onBlur={e=>father_job.onBlur(e)} value={father_job.value} name="father_job" maxLength="150" /></label>
                <div className="row">
                    <label className="form-label col-sm">Должность
                        <input className="input_w600" onChange={e=>father_position.onChange(e)} onBlur={e=>father_position.onBlur(e)} value={father_position.value}  name="father_position" maxLength="40" /></label>
                    <label className="form-label col-sm">Моб. телефон
                        <input className={(father_phone.isDirty&&father_phone.ismobileNum&&!father_phone.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>father_phone.onChange(e)} onBlur={e=>father_phone.onBlur(e)} value={father_phone.value}  name="father_phone" placeholder="+375XXXXXXXXX" maxLength="50" />
                        {(father_phone.isDirty&&father_phone.ismobileNum&&!father_phone.isEmpty)&&<div  style={{color:'red'}}> Поле "Моб. тел." должно соответствовать формату "+375XXXXXXXXX".</div>}
                        </label>
                </div>
                    <label className="form-label w-100">Полный адрес
                        <input className="input_w1210" onChange={e=>father_address.onChange(e)} onBlur={e=>father_address.onBlur(e)} value={father_address.value}  name="father_address" maxLength="150" /></label>
                <p className="lead">Мать</p>
                <div className="row">
                    <label className="form-label col-sm">Фамилия
                        <input className="input_w400"  onChange={e=>mother_surname.onChange(e)} onBlur={e=>mother_surname.onBlur(e)} value={mother_surname.value}  name="mother_surname" maxLength="40" /></label>
                    <label className="form-label col-sm">Имя
                        <input className="input_w400"  onChange={e=>mother_name.onChange(e)} onBlur={e=>mother_name.onBlur(e)} value={mother_name.value} name="mother_name" maxLength="40" /></label> 
                    <label className="form-label col-sm">Отчество
                        <input className="input_w390"   onChange={e=>mother_second_name.onChange(e)} onBlur={e=>mother_second_name.onBlur(e)} value={mother_second_name.value}  name="mother_second_name" maxLength="40" /></label>
                </div>
                    <label className="form-label w-100">Место работы
                        <input className="input_w1210"  onChange={e=>mother_job.onChange(e)} onBlur={e=>mother_job.onBlur(e)} value={mother_job.value} name="mother_job" maxLength="150" /></label>
                <div className="row">
                    <label className="form-label col-sm">Должность
                        <input className="input_w600"  onChange={e=>mother_position.onChange(e)} onBlur={e=>mother_position.onBlur(e)} value={mother_position.value} name="mother_position" maxLength="40" /></label>
                    <label className="form-label col-sm">Моб. телефон
                        <input className={(mother_phone.isDirty&&mother_phone.ismobileNum&&!mother_phone.isEmpty)?"input_w600-error":"input_w600"}  onChange={e=>mother_phone.onChange(e)} onBlur={e=>mother_phone.onBlur(e)} value={mother_phone.value}  placeholder="+375XXXXXXXXX" name="mother_phone" maxLength="50" />
                        {(mother_phone.isDirty&&mother_phone.ismobileNum&&!mother_phone.isEmpty)&&<div  style={{color:'red'}}> Поле "Моб. тел." должно соответствовать формату "+375XXXXXXXXX".</div>}
                        </label>
                </div>
                    <label className="form-label w-100">Полный адрес
                        <input className="input_w1210" onChange={e=>mother_address.onChange(e)} onBlur={e=>mother_address.onBlur(e)} value={mother_address.value}  name="mother_address" maxLength="150" /></label>
                        <hr/>

<legend className="text-center">Льготы</legend>
                <div className="row">
                    <input id="pr_chbx_1" className="custom-radio" onChange={e=>stat18.onChange(e)} onBlur={e=>stat18.onBlur(e)} checked={stat18.checked} name="stat18" type="checkbox" />
                    <label htmlFor="pr_chbx_1" >Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статья Ч18)</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_2" className="custom-radio" onChange={e=>stat19_23.onChange(e)} onBlur={e=>stat19_23.onBlur(e)} checked={stat19_23.checked} name="stat19_23" type="checkbox" />
                    <label htmlFor="pr_chbx_2" >Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статьи Ч19, Ч20, Ч21, Ч22, Ч23)</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_3" className="custom-radio" onChange={e=>dis.onChange(e)} onBlur={e=>dis.onBlur(e)} checked={dis.checked} name="dis" type="checkbox" />
                    <label htmlFor="pr_chbx_3" >Ребенок-инвалид, инвалид I, II, III гр.</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_4" className="custom-radio"  onChange={e=>nop.onChange(e)} onBlur={e=>nop.onBlur(e)} checked={nop.checked} name="nop" type="checkbox" />
                    <label htmlFor="pr_chbx_4">Сирота или ребенок, оставшийся без попечения родителей</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_5" className="custom-radio" onChange={e=>mil.onChange(e)} onBlur={e=>mil.onBlur(e)} checked={mil.checked} name="mil" type="checkbox" />
                    <label htmlFor="pr_chbx_5" >Ребенок лица, погибшего (получившего ранения, инвалидность) при исполнении воинского долга (служебной обязанности)</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_6" className="custom-radio" onChange={e=>bff.onChange(e)} onBlur={e=>bff.onBlur(e)} checked={bff.checked} name="bff" type="checkbox"/>
                    <label htmlFor="pr_chbx_6">Из многодетной семьи</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_7" className="custom-radio" onChange={e=>medal.onChange(e)} onBlur={e=>medal.onBlur(e)} checked={medal.checked} name="medal" type="checkbox" />
                    <label htmlFor="pr_chbx_7" >Имею аттестат с медалью</label>
                </div>
                <div className="row">
                    <input id="pr_chbx_8" className="custom-radio" onChange={e=>diplo.onChange(e)} onBlur={e=>diplo.onBlur(e)} checked={diplo.checked}   name="diplo" type="checkbox" />
                    <label htmlFor="pr_chbx_8" >Имею диплом с отличием</label> 
                </div>
                <hr/>
<legend className="text-center">Награды по предметам</legend>
                <div className="row">
                    <label className="form-label col-lg">Язык
                    <select className="select_w400" onChange={e=>awards_lang.onChange(e)} onBlur={e=>awards_lang.onBlur(e)} value={awards_lang.value} name="awards_lang">
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
                    <label className="form-label col-lg">Химия
                    <select className="select_w400" onChange={e=>awards_chem.onChange(e)} onBlur={e=>awards_chem.onBlur(e)} value={awards_chem.value} name="awards_chem">
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
                    <label className="form-label col-lg">Биология
                    <select className="select_w400" onChange={e=>awards_biol.onChange(e)} onBlur={e=>awards_biol.onBlur(e)} value={awards_biol.value} name="awards_biol">
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
<legend className="text-center">ЦТ и баллы</legend>
                <p className="lead">Язык</p>
                <div className="row">
                    <label className="form-label col-sm">Серия
                        <input onChange={e=>cert_lang_serial.onChange(e)} onBlur={e=>cert_lang_serial.onBlur(e)} value={cert_lang_serial.value} className="input_w400 " name="cert_lang_serial" maxLength="8" /></label>
                    <label className="form-label col-sm">Номер
                        <input onChange={e=>cert_lang_number.onChange(e)} onBlur={e=>cert_lang_number.onBlur(e)} value={cert_lang_number.value} className="input_w400" name="cert_lang_number" maxLength="7" /></label> 
                    <label className="form-label col-sm-2">Балл
                        <input onChange={e=>cert_lang_score.onChange(e)} onBlur={e=>cert_lang_score.onBlur(e)} value={cert_lang_score.value} className="input_w400 "name="cert_lang_score" maxLength="3" /></label>
                </div>
                <p className="lead">Химия</p>
                <div className="row">
                    <label className="form-label col-sm">Серия
                        <input onChange={e=>cert_chem_serial.onChange(e)} onBlur={e=>cert_chem_serial.onBlur(e)} value={cert_chem_serial.value} className="input_w400" name="cert_chem_serial" maxLength="8" /></label>
                    <label className="form-label col-sm">Номер
                        <input onChange={e=>cert_chem_number.onChange(e)} onBlur={e=>cert_chem_number.onBlur(e)} value={cert_chem_number.value} className="input_w400" name="cert_chem_number" maxLength="7" /></label> 
                    <label className="form-label col-sm-2">Балл
                        <input onChange={e=>cert_chem_score.onChange(e)} onBlur={e=>cert_chem_score.onBlur(e)} value={cert_chem_score.value} className="input_w400" name="cert_chem_score" maxLength="3" /></label>
                </div>
                <p className="lead">Биология</p>
                <div className="row">
                    <label className="form-label col-sm">Серия
                        <input onChange={e=>cert_biol_serial.onChange(e)} onBlur={e=>cert_biol_serial.onBlur(e)} value={cert_biol_serial.value} className="input_w400" name="cert_biol_serial" maxLength="8" /></label>
                    <label className="form-label col-sm">Номер
                        <input onChange={e=>cert_biol_number.onChange(e)} onBlur={e=>cert_biol_number.onBlur(e)} value={cert_biol_number.value} className="input_w400" name="cert_biol_number" maxLength="7" /></label> 
                    <label className="form-label col-sm-2">Балл
                        <input onChange={e=>cert_biol_score.onChange(e)} onBlur={e=>cert_biol_score.onBlur(e)} value={cert_biol_score.value} className="input_w400" name="cert_biol_score" maxLength="3" /></label>
                </div>
                <hr/>
                <div >
                    <input  id="agreement" className="custom-radio" onChange={e=>DD.onChange(e)} onBlur={e=>DD.onBlur(e)} checked={DD.checked} name="DD"type="checkbox"></input>
<label htmlFor="agreement" >Даю согласие на обработку, хранение и использование персональных данных для участия в конкурсе на получение высшего образования I ступени и зачисления.</label>
                </div>
                <div align ="center" >
                    <button disabled={(name.isEmpty||name.isRus)||(surname.isRus||surname.isEmpty)||second_name.isRus||(surname_lat.isEmpty||surname_lat.isEng)||(name_lat.isEng||name_lat.isEmpty)||(date_of_birth.inputData||date_of_birth.isEmpty)||citizenship.isEmpty||(number.Num||number.isEmpty)||(date_of_issue.isEmpty||date_of_issue.inputData)||(date_of_expiry.isEmpty||date_of_expiry.inputData)||authority.isEmpty||(mobile_tel.isEmpty||mobile_tel.ismobileNum)||(email.isemailCheck||email.isEmpty)||!DD.checked}
                    onClick={handleClick}
                        type="submit" className="glow-button" >Отправить</button>     
  
                </div>
                        
        </form>

    )
  }
  export default Anketa