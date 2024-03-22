import "../style/Anketa.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { FileUploader } from '../components/FileUploadComponent'

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
    const { t, i18n } = useTranslation()
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
      /*surname: '',*/
      surname_info:'',
      second_name:'',
      surname_lat:'',
      name_lat:'',
      date_of_birth:'',
      citizenship:'',
      serial:'',
      number:'',
      PlaceOfIssue:'',
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
      stat18:'',
      religion:'',
      DataYourPeople:'',
      NameSurname:'',
      PhoneRepresantative:'',
      country_pass:'',
      NatPassw:'',
      HostelLive:'',
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
                toast.error("Что-то пошло не так, поробуйте позже", {
                position: "top-right"
                });
              console.error('Error fetching data:', error);
            }
          };
          console.log(data)
          fetchData();
          
        }, [ButtonClick]);

    function handleClick(e) {
        setButtonClick(true)
        e.preventDefault()
      }

    const surname=useInput(data.surname,{isEmpty:true,isEng:true})
    const name=useInput(data.name,{isEmpty:true,isEng:true})
    /*const second_name=useInput(data.second_name,{isEmpty:true,isRus:true})*/
    const surname_info=useInput(data.surname_info,{})

    const date_of_birth=useInput(data.date_of_birt,{isEmpty:true,inputData:true})
    const citizenship=useInput(data.citizenship,{isEmpty:true})
    const serial=useInput(data.serial)
    const number=useInput(data.number,{isEmpty:true, Num:true})
    const PlaceOfIssue=useInput(data.PlaceOfIssue,{isEmpty:true})
    const date_of_issue=useInput(data.date_of_issue,{isEmpty:true,inputData:true})
    const date_of_expiry=useInput(data.date_of_expiry,{isEmpty:true,inputData:true})
    const authority=useInput(data.authority,{isEmpty:true})
    const postcode=useInput(data.postcode)
    const region=useInput(data.region)
    const settlement_name=useInput(data.settlement_name,{isEmpty:true})
    const street_name=useInput(data.street_name)
    const building=useInput(data.building)
    const housing=useInput(data.housing)
    const apartment=useInput(data.apartment)
    const stat_tel=useInput(data.stat_tel)
    const mobile_tel=useInput(data.mobile_tel,{isEmpty:true,ismobileNum:true})
    const email=useInput(data.email,{isEmpty:true,isemailCheck:true})
    const edu_date_of_issue=useInput(data.edu_date_of_issue,{isEmpty:true, inputData:true})
    const edu_serial_number=useInput(data.edu_serial_number)
    const edu_name=useInput(data.edu_name)
    const edu_average=useInput(data.edu_average,{isEmpty:true})
    const pref_pay=useInput(data.pref_pay)
    const pref_nopay=useInput(data.pref_nopay)
    const pref_target=useInput(data.pref_target)
    const pref_dorm=useInput(data.pref_dorm)
    const exp_position=useInput(data.exp_position,{isEmpty:true})
    const exp_years=useInput(data.exp_years,{isEmpty:true})
    const exp_months=useInput(data.exp_months,{isEmpty:true})
    const father_surname=useInput(data.father_surname)
    const father_name=useInput(data.father_name)
    const father_second_name=useInput(data.father_second_name)
    const father_job=useInput(data.father_job)
    const father_position=useInput(data.father_position)
    const father_phone=useInput(data.father_phone,{isEmpty:true,ismobileNum:true })
    const father_address=useInput(data.father_address)
    const mother_surname=useInput(data.mother_surname)
    const mother_name=useInput(data.mother_name)
    const mother_second_name=useInput(data.mother_second_name)
    const mother_job=useInput(data.mother_job)
    const mother_position=useInput(data.mother_position)
    const mother_phone=useInput(data.mother_phone,{isEmpty:true,ismobileNum:true})
    const mother_address=useInput(data.mother_address)
    const cert_lang_serial=useInput(data.cert_lang_serial)
    const cert_lang_number=useInput(data.cert_lang_number)
    const cert_lang_score=useInput(data.cert_lang_score)
    const cert_chem_serial=useInput(data.cert_chem_serial)
    const cert_chem_number=useInput(data.cert_chem_number)
    const cert_chem_score=useInput(data.cert_chem_score)
    const cert_biol_serial=useInput(data.cert_biol_serial)
    const cert_biol_score=useInput(data.cert_biol_score)
    const cert_biol_number=useInput(data.cert_biol_number)
    const sex=useInput(data.sex,{isEmpty:true})
    const country=useInput(data.country)
    const area=useInput(data.area)
    const settlement_type=useInput(data.settlement_type)
    const street_type=useInput(data.street_type)
    const edu_foreign_lang=useInput(data.edu_foreign_lang)
    const pref_faculty=useInput(data.pref_faculty)
    const awards_lang=useInput(data.awards_lang)
    const awards_chem=useInput(data.awards_chem)
    const awards_biol=useInput(data.awards_biol)
    const DD=useInput(data.DD)
    const diplo=useInput(data.diplo)
    const medal=useInput(data.medal)
    const bff=useInput(data.bff)
    const mil=useInput(data.mil)
    const nop=useInput(data.nop)
    const dis=useInput(data.dis)
    const stat19_23=useInput(data.stat19_23)
    const stat18=useInput(data.stat18)
    const religion=useInput(data.religion) 
    const DataYourPeople=useInput(data.DataYourPeople,{isEmpty:true})
    const NameSurname=useInput(data.NameSurname)
    const PhoneRepresantative=useInput(data.PhoneRepresantative,{ismobileNum:true})
    const country_pass=useInput(data.country_pass)
    const NatPassw=useInput(data.NatPassw)
    const HostelLive=useInput(data.HostelLive)
    
    const body = {
      name: name.value,
      surname: surname.value,
      /*second_name:second_name.value,*/
      surname_info:surname_info.value,
      date_of_birth:date_of_birth.value,
      citizenship:citizenship.value,
      serial:serial.value,
      number:number.value,
      PlaceOfIssue:PlaceOfIssue.value,
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
      stat18:stat18.checked,
      religion:religion.value,
      DataYourPeople:DataYourPeople.value,
      NameSurname:NameSurname.value,
      PhoneRepresantative:PhoneRepresantative.value,
      country_pass:country_pass.value,
      NatPassw:NatPassw.value,
      HostelLive:HostelLive.value,

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
<legend>{t('AppDetails')}</legend>
                <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option>Choose language</option>
                <option value="ru">Russian</option>
                <option value="en">English</option>
                </select>
 
                    <div className="row">
                <label className="form-label col-sm">{t('Surname')}<span>*</span>
                        <input  className={surname.isDirty&&(surname.isEng||surname.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>surname.onChange(e)} onBlur={e=>surname.onBlur(e)} value={surname.value}   name="surname" maxLength="40" />
                        {(surname.isDirty&&surname.isEmpty)&&<div  style={{color:'red'}}> {t('SurnameErrorEmpty')}</div>}
                        {(surname.isDirty&&surname.isEng&&!surname.isEmpty)&&<div  style={{color:'red'}}> {t('SurnameError')}</div>}
                </label> 
                <label className="form-label col-sm" >{t('Name')}<span>*</span>
                        <input className={name.isDirty&&(name.isEng||name.isEmpty)?"input_w600-error":"input_w600"}  onChange={e=>name.onChange(e)} onBlur={e=>name.onBlur(e)} value={name.value} name="name" maxLength="40"/>
                        {(name.isDirty&&name.isEmpty)&&<div style={{color:'red'}}> {t('NameErrorEmpty')}</div>}
                        {(name.isDirty&&name.isEng&&!name.isEmpty)&&<div style={{color:'red'}}> {t('NameError')}</div>}
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm">{t('Surname_info')}<span>*</span>
                        <input className={surname_info.isDirty&&surname_info.isRus&&!surname_info.isEmpty?"input_w1210-error":"input_w1210"}  onChange={e=>surname_info.onChange(e)} onBlur={e=>surname_info.onBlur(e)} value={surname_info.value}  name="second_name" maxLength="100" />
                        {(surname_info.isDirty&&surname_info.isEmpty)&&<div style={{color:'red'}}>{t('Surname_infoError')}</div>}
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm">{t('Gender')}<span >*</span>
                    <select className="select_w300 " onChange={e=>sex.onChange(e)} onBlur={e=>sex.onBlur(e)} value={sex.value}  name="sex">
                        <option value="0">{t('Female')}</option>
                        <option value="1">{t('Male')}</option>
                    </select>
                </label>
                <label className="form-label col-sm-6">{t('Nationality')}<span >*</span>
                        <input className={citizenship.isDirty&&citizenship.isEmpty?"input_w600-error":"input_w600"} onChange={e=>citizenship.onChange(e)} onBlur={e=>citizenship.onBlur(e)} value={citizenship.value} name="citizenship" maxLength="40" />
                        {(citizenship.isDirty&&citizenship.isEmpty)&&<div style={{color:'red'}}> {t('NationalityError')}</div>}

                </label>
                <label className="form-label col-sm">{t('DateOfBirth')}<span >*</span>
                <input className={date_of_birth.isDirty&&(date_of_birth.inputData||date_of_birth.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_birth.onChange(e)} onBlur={e=>date_of_birth.onBlur(e)} value={date_of_birth.value}  name="date_of_birth" placeholder="дд.мм.гггг" maxLength="10" />
                        {(date_of_birth.isDirty&&date_of_birth.isEmpty)&&<div style={{color:'red'}}> {t('DateOfBirthErrorEmpty')}</div>}
                        {(date_of_birth.isDirty&&date_of_birth.inputData&&!date_of_birth.isEmpty)&&<div style={{color:'red'}}> {t('DateOfBirthError')}</div>}

                </label>
                </div>
                <div className="row">
                <label className="form-label col-sm">{t('Town')}<span>*</span>
                        <input className={settlement_name.isDirty&&settlement_name.isEmpty?"input_w600-error":"input_w600"}  onChange={e=>settlement_name.onChange(e)} onBlur={e=>settlement_name.onBlur(e)} value={settlement_name.value}  name="settlement_name" maxLength="40" />
                        {(settlement_name.isDirty&&settlement_name.isEmpty)&&<div style={{color:'red'}}> {t('TownError')}</div>}

                </label>
                <label className="form-label col-sm-8">{t('Country')} <span>*</span>
                        <select className="select_w595" onChange={e=>country.onChange(e)} onBlur={e=>country.onBlur(e)} value={country.value}  name="country">
                        <option value="0">{t('Сou0')}</option>
                        <option value="1">{t('Сou1')}</option>
                        <option value="2">{t('Сou2')}</option>
                        <option value="3">{t('Сou3')}</option>
                        <option value="4">{t('Сou4')}</option>
                    </select>
                </label>
                    </div>
                    <div className="row">
                    <label className="form-label col-sm-4">{t('Number')}
                        <input className="input_w600" onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value}  name="number" maxLength="15" />
                    </label>
                    <label className="form-label col-sm-4">{t('Religion')}
                        <input className="input_w600" onChange={e=>religion.onChange(e)} onBlur={e=>religion.onBlur(e)} value={religion.value}  name="religion" maxLength="15" />
                    </label>
                    </div>
                    <div className="row">
                    <label className="form-label col-sm">{t('PhoneNumber')}<span >*</span>
                        <input className={mobile_tel.isDirty&&(mobile_tel.ismobileNum||mobile_tel.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>mobile_tel.onChange(e)} onBlur={e=>mobile_tel.onBlur(e)} value={mobile_tel.value}  placeholder="+375XXXXXXXXX" name="mobile_tel" maxLength="20"  />
                        {(mobile_tel.isDirty&&mobile_tel.isEmpty)&&<div  style={{color:'red'}}>{t('PhoneNumberErrorEmpty')} </div>}
                        {(mobile_tel.isDirty&&mobile_tel.ismobileNum&&!mobile_tel.isEmpty)&&<div  style={{color:'red'}}>{t('PhoneNumberError')} </div>}
                        </label>
                    <label className="form-label col-sm">{t('Email')}<span >*</span>
                        <input className={email.isDirty&&(email.isemailCheck||email.isEmpty)?"input_w590-error":"input_w590"} onChange={e=>email.onChange(e)} onBlur={e=>email.onBlur(e)} value={email.value}  name="email" maxLength="40"/>
                        {(email.isDirty&&email.isEmpty)&&<div style={{color:'red'}}>{t('EmailErrorEmpty')} </div>}
                        {(email.isDirty&&email.isemailCheck&&!email.isEmpty)&&<div style={{color:'red'}}> {t('EmailError')}</div>}
                    </label>
                </div>
                <div className="row">
                <label className="form-label w-100">{t('DataYourPeople')}<span >*</span>
                        <input className={DataYourPeople.isDirty&&DataYourPeople.isEmpty?"input_w1210-error":"input_w1210"} onChange={e=>DataYourPeople.onChange(e)} onBlur={e=>DataYourPeople.onBlur(e)} value={DataYourPeople.value}  name="DataYourPeople" maxLength="200" />
                        {(DataYourPeople.isDirty&&DataYourPeople.isEmpty)&&<div style={{color:'red'}}> {t('DataYourPeopleErrorEmpty')}</div>}

                </label>
                </div>
                <div className="row">
                <label className="form-label col-sm">{t('NameSurname')}
                        <input  className="input_w600" onChange={e=>NameSurname.onChange(e)} onBlur={e=>NameSurname.onBlur(e)} value={NameSurname.value}   name="NameSurname" maxLength="40" />
                </label> 
                <label className="form-label col-sm" >{t('PhoneRepresantative')}<span>*</span>
                <input className={(PhoneRepresantative.isDirty&&PhoneRepresantative.ismobileNum&&!PhoneRepresantative.isEmpty)?"input_w600-error":"input_w600"}  onChange={e=>PhoneRepresantative.onChange(e)} onBlur={e=>PhoneRepresantative.onBlur(e)} value={PhoneRepresantative.value}  placeholder="+375XXXXXXXXX" name="PhoneRepresantative" maxLength="50" />
                        {(PhoneRepresantative.isDirty&&PhoneRepresantative.ismobileNum&&!PhoneRepresantative.isEmpty)&&<div  style={{color:'red'}}> {t('PhoneRepresantativeError')}</div>}
                        
                </label>
                </div>
                <hr/>
                <legend className="text-center">{t('Passport')}</legend>
                    <div className="row">
                <label className="form-label col-sm-4">{t('PassNumber')}<span >*</span>
                        <input className={number.isDirty&&number.isEmpty?"input_w295-error":"input_w295"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value}  name="number" maxLength="15" />
                        {(number.isDirty&&number.isEmpty)&&<div style={{color:'red'}}> {t('PassNumberErrorEmpty')}</div>}
                </label>
                <label className="form-label col-sm-8">{t('CountryPass')} <span>*</span>
                        <select className="select_w900" onChange={e=>country_pass.onChange(e)} onBlur={e=>country_pass.onBlur(e)} value={country_pass.value}  name="country_pass">
                        <option value="0">{t('Сou0')}</option>
                        <option value="1">{t('Сou1')}</option>
                        <option value="2">{t('Сou2')}</option>
                        <option value="3">{t('Сou3')}</option>
                        <option value="4">{t('Сou4')}</option>
                    </select>
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm-6">{t('PlaceOfIssue')}<span>*</span>
                        <input className="input_w600" onChange={e=>PlaceOfIssue.onChange(e)} onBlur={e=>PlaceOfIssue.onBlur(e)} value={PlaceOfIssue.value}  name="PlaceOfIssue" maxLength="20" />
                        {(PlaceOfIssue.isDirty&&PlaceOfIssue.isEmpty)&&<div style={{color:'red'}}> {t('PlaceOfIssueErrorEmpty')}</div>}
                </label>
                <label className="form-label col-sm-3">{t('DataOfIssue')}<span >*</span>
                        <input className={date_of_issue.isDirty&&(date_of_issue.inputData||date_of_issue.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value}  name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" />
                        {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div style={{color:'red'}}> {t('DataOfIssueErrorEmpty')}</div>}
                        {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div style={{color:'red'}}>{t('DataOfIssueError')}</div>}

                </label>
                <label className="form-label col-sm-3">{t('DateOfExiry')}<span >*</span>
                        <input className={date_of_expiry.isDirty&&(date_of_expiry.inputData||date_of_expiry.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value}  name="date_of_expiry" placeholder="дд.мм.гггг" maxLength="10"/>
                        {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div style={{color:'red'}}>  {t('DateOfExpiryErrorEmpty')}</div>}
                        {(date_of_expiry.isDirty&&date_of_expiry.inputData&&!date_of_expiry.isEmpty)&&<div style={{color:'red'}}> {t('DateOfExpiryError')}</div>}

                </label>
                    </div>
                    <div className="row">
                <label className="form-label w-100">{t('NatPassw')}<span >*</span>
                        <input className={NatPassw.isDirty&&NatPassw.isEmpty?"input_w1210-error":"input_w1210"} onChange={e=>NatPassw.onChange(e)} onBlur={e=>NatPassw.onBlur(e)} value={NatPassw.value}  name="authority" maxLength="100" />
                </label>
                </div>
                <hr/>
{/*<legend className="text-center">Адрес места жительства в соответствии со штампом о регистрации, контактные данные</legend>
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
                
    <hr/> */}
<legend className="text-center">{t('EducationInfo')}</legend>
                    <label className="form-label w-100">{t('EducationInst')}<span ></span>
                        <input className="input_w1210"  onChange={e=>edu_name.onChange(e)} onBlur={e=>edu_name.onBlur(e)} value={edu_name.value} name="edu_name" maxLength="150"  /></label>
                <div className="row">
                    <label className="form-label col-sm">{t('EduSerialNumber')}<span ></span>
                        <input className="input_w600" onChange={e=>edu_serial_number.onChange(e)} onBlur={e=>edu_serial_number.onBlur(e)} value={edu_serial_number.value}  name="edu_serial_number" maxLength="20"  /></label>
                    <label className="form-label col-sm">{t('DataOfIssue')}<span ></span>
                        <input className={(edu_date_of_issue.isDirty&&edu_date_of_issue.ismobileNum&&!edu_date_of_issue.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>edu_date_of_issue.onChange(e)} onBlur={e=>edu_date_of_issue.onBlur(e)} value={edu_date_of_issue.value} name="edu_date_of_issue" maxLength="10" placeholder="дд.мм.гггг" />
                        {(edu_date_of_issue.isDirty&&edu_date_of_issue.inputData&&!edu_date_of_issue.isEmpty)&&<div style={{color:'red'}}>{t('DataOfIssueError')}</div>}
                        </label>
                </div>
    {/*           <div className="row">
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
    */}
                <hr/>
                
<legend className="text-center">{t('InfoAdmission')}</legend>
                    <label className="form-label w-200">{t('Faculty')}
                    <select className="select_w1210" onChange={e=>pref_faculty.onChange(e)} onBlur={e=>pref_faculty.onBlur(e)} value={pref_faculty.value} name="pref_faculty" >
                        <optgroup label={t('FacName1')}>	
                            <option value="1">{t('Fac1')}</option>
                            <option value="2">{t('Fac2')}</option>
                            <option value="3">{t('Fac3')}</option>
                            <option value="4">{t('Fac4')}</option>
                            <option value="6">{t('Fac6')}</option>
                            <option value="20">{t('Fac20')}</option>
                            <option value="7">{t('Fac7')}</option>
                        </optgroup>
                        <optgroup label={t('FacName2')}>
                            <option value="10">{t('Fac10')}</option>
                            <option value="11">{t('Fac11')}</option>
                            <option value="12">{t('Fac12')}</option>
                            <option value="13">{t('Fac13')}</option>
                            <option value="14">{t('Fac14')}</option>
                            <option value="15">{t('Fac15')}</option>
                            <option value="16">{t('Fac16')}</option>
                            <option value="21">{t('Fac21')}</option>
                        </optgroup>
                        <optgroup label={t('FacName3')}>
                            <option value="8">{t('Fac8')}</option>
                            <option value="19">{t('Fac19')}</option>
                            <option value="17">{t('Fac17')}</option>
                            <option value="5">{t('Fac5')}</option>
                            <option value="9">{t('Fac9')}</option>
                            <option value="18">{t('Fac18')}</option>
                        </optgroup>
                    </select></label>
                    <label className="form-label w-200">{t('HostelLive')}
                        <input className="input_w1210"  onChange={e=>HostelLive.onChange(e)} onBlur={e=>HostelLive.onBlur(e)} value={HostelLive.value} name="edu_name" maxLength="150"  /></label>
                    <hr/>    

<legend className="text-center">{t('AddDoc')}</legend>
                <div className="row">
                    <label  className="form-label w-200">{t('AddFile1')}
                    <FileUploader/>
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile2')}
                    <FileUploader/>
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile3')}
                    <FileUploader/>
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile4')}
                    <FileUploader/>

                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile5')}
                    <FileUploader/>
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile6')}
                    <FileUploader/>

                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile7')}
                    <FileUploader/>

                    </label>
                </div>
                    <hr/>
                    
                    <legend className="text-center">{t('WarningMessageOne')}</legend>
                    <legend className="text-center">{t('WarningMessageTwo')}</legend>
                    <legend className="text-center">{t('WarningMessageThree')}</legend>
                    <hr/>
                    {/*<div className="row">
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
                        <label htmlFor="prform_chbx_4">Нуждаюсь в общежитии</label>*/}


{/*<legend className="text-center">Работа и стаж</legend>
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
                </div>*/}
                

                <div >
                    <input  id="agreement" className="custom-radio" onChange={e=>DD.onChange(e)} onBlur={e=>DD.onBlur(e)} checked={DD.checked} name="DD"type="checkbox"></input>
<label htmlFor="agreement" >{t('DD')}</label>
                </div>
                <div align ="center" >
                    <button disabled={(name.isEmpty||name.isEng)||(surname.isEng||surname.isEmpty)||(date_of_birth.inputData||date_of_birth.isEmpty)||citizenship.isEmpty||(number.Num||number.isEmpty)||(date_of_issue.isEmpty||date_of_issue.inputData)||(date_of_expiry.isEmpty||date_of_expiry.inputData)||authority.isEmpty||(mobile_tel.isEmpty||mobile_tel.ismobileNum)||(email.isemailCheck||email.isEmpty)||!DD.checked}
                    onClick={handleClick}
                        type="submit" className="glow-button" >{t('ButtonUpload')}</button>     
                    </div>



        </form>

    )
  }
  export default Anketa