import "../style/Anketa.css"
import { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import {dataEdit,Data,edit, errorCod, ForLan,filesName} from '../data/DataForInput'
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';

const useValidation=(value,validations)=>{
  const[isEmpty,setEmpty]=useState(true)
  const[inputData,setInputData]=useState(true)
  const[Num,setInputNum]=useState(true)

  useEffect(()=>{
    for(const validation in validations){

        switch(validation){
          case 'isEmpty':
              value?setEmpty(false):setEmpty(true)
          break;
          case'inputData':
            var data=/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/
            data.test(String(value).toLowerCase())?setInputData(false):setInputData(true)
          break;
          case'Num':
            var num= /^\d+$/
            num.test(String(value).toLowerCase())?setInputNum(false):setInputNum(true)
          break;
          default:

        }       
    }
},[value,validations,isEmpty,inputData,Num])

return{
  isEmpty,
  inputData,
  Num 
}}

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
}}

function ForRead() {

  const { t, i18n } = useTranslation()
  const PATH = process.env.REACT_APP_PATH;
  const [lan,setLan]=useState(ForLan.lan)
  const RequestURL=PATH+'/auth/login';
  
  function sendRequestFiles(method, url, body = null) {
    const headers = {
      'Content-Type': 'application/json'
        }
    return fetch(url, {
      method: method,
      body: body,
      headers:headers
    }).then(async response => {
      if (!response.ok) {
        throw  toast.error(t('ErrorFiles'), {
          position: "top-right"
        }); 
    }
    const data = await response.json();
    filesName.filesArr=data;
    navigate("/Drop", { replace: false })
  })}

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
        return  response.json()
      }else{// eslint-disable-next-line eqeqeq
        if(errorCod=='3'||response.status==404){
          toast.error(t('Error2'), {
          position: "top-right"
        });
      }else{
          toast.error(t('ErrorIDK'), {
          position: "top-right"
        });
      }
      }}) 
    .then(dataAbitur=>{
        dataEdit.id=dataAbitur.id
        dataEdit.surname=dataAbitur.surname
        dataEdit.name=dataAbitur.name
        dataEdit.namerus=dataAbitur.namerus
        dataEdit.surnamerus=dataAbitur.surnamerus
        dataEdit.surname_info=dataAbitur.surname_info
        dataEdit.date_of_birth=dataAbitur.date_of_birth
        dataEdit.citizenship=dataAbitur.citizenship
        dataEdit.number=dataAbitur.number
        dataEdit.PlaceOfIssue=dataAbitur.PlaceOfIssue
        dataEdit.date_of_issue=dataAbitur.date_of_issue
        dataEdit.date_of_expiry=dataAbitur.date_of_expiry
        dataEdit.settlement_name=dataAbitur.settlement_name
        dataEdit.mobile_tel=dataAbitur.mobile_tel
        dataEdit.email=dataAbitur.email
        dataEdit.edu_date_of_issue=dataAbitur.edu_date_of_issue
        dataEdit.edu_serial_number=dataAbitur.edu_serial_number
        dataEdit.edu_name=dataAbitur.edu_name
        dataEdit.sex=dataAbitur.sex
        dataEdit.country=dataAbitur.country
        dataEdit.DD=dataAbitur.DD
        dataEdit.religion=dataAbitur.religion
        dataEdit.DataYourPeople=dataAbitur.DataYourPeople
        dataEdit.NameSurname=dataAbitur.NameSurname
        dataEdit.PhoneRepresantative=dataAbitur.PhoneRepresantative
        dataEdit.country_pass=dataAbitur.country_pass
        dataEdit.NatPassw=dataAbitur.NatPassw
        dataEdit.HostelLive=dataAbitur.HostelLive
        dataEdit.numberNational=dataAbitur.numberNational
        dataEdit.pref_faculty=dataAbitur.pref_faculty
        dataEdit.Files=dataAbitur.Files
        edit.Edit=true
        sendRequestFiles('GET',PATH+'/auth/'+dataEdit.id)
      })
      .catch(error=>{
        })
  }

  const navigate = useNavigate();
  const number=useInput('',{isEmpty:true})
  const date_of_issue=useInput('',{isEmpty:true,inputData:true})
  const [ButtonClick,setButtonClick]=useState(false)

  useEffect(()=>{
    if(ButtonClick===true){
      Data.number=number.value
      Data.date_of_issue=date_of_issue.value

      if(Data.number!==''&&Data.date_of_issue!==''){
        sendRequest('POST', RequestURL, Data)
        }
        setButtonClick(false)
      }
    if(lan===true){
        i18n.changeLanguage('en');
      }else{
        i18n.changeLanguage('ru');
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lan,ButtonClick,RequestURL,date_of_issue.value,i18n,number.value])

function handleClick(e) {
    setButtonClick(true)
    e.preventDefault()
  }

const handleToggleChange = () => {
    ForLan.lan=!lan; 
    setLan(!lan);
  };

return (
  <div className="div">
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input checked={ForLan.lan} id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
        <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" htmlFor="color_mode" ></label>
      </label>
    </div>
    <form className="form-ForRead" >
      <legend className="lead" >{t('ForReadData')}</legend>
        <label className="form-label">{t('ForReadDataNum')}
          <input className={number.isDirty&&number.isEmpty?"input_error input_w600-error":"input input_w600"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxLength="15"  autoComplete="off"/>
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> {t('ForReadDataNumErr')}</div>}
        </label>
        <label className="form-label">{t('ForReadDataVid')}
          <input className={date_of_issue.isDirty&&(date_of_issue.isEmpty||date_of_issue.inputData)?"input_error input_w600-error":"input input_w600"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder={t('DataInp')} maxLength="10" autoComplete="off"/>
            {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div  style={{color:'red'}}> {t('ForReadDataVidErr1')}</div>}
            {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div  style={{color:'red'}}>{t('ForReadDataVidErr2')}</div>}
        </label>
        <div align ="center" >
          <button disabled={number.isEmpty||date_of_issue.inputData||date_of_issue.isEmpty}
            onClick={handleClick}
            type="submit" className="btn btn-1 btn-sep">{t('Next')}</button>
        </div>
    </form>
  </div>
  )
} export default ForRead