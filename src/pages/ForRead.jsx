import "../style/Anketa.css"
import { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import {data,Data,edit} from '../data/DataForInput'
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';



const useValidation=(value,validations)=>{
  const[isEmpty,setEmpty]=useState(true)
  const[inputData,setInputData]=useState(true)
  const[Num,setInputNum]=useState(true)

  useEffect(()=>{
    for(const validation in validations){

        switch(validation){
          case 'isEmpty':
              value?setEmpty(false):setEmpty(true)  //work
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
},[value])

return{
  isEmpty,
  inputData,
  Num
  
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
}}

function ForRead() {

  const { t, i18n } = useTranslation()

  let Jsondata={}
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
      }else{
      toast.error(t('ErrorIDK'), {
        position: "top-right"
      });
      }
    })
    .then(dataAbitur=>{
        Jsondata=dataAbitur
        data.surname=Jsondata.surname
        data.name=Jsondata.name
        data.surname_info=Jsondata.surname_info
        data.date_of_birth=Jsondata.date_of_birth
        data.citizenship=Jsondata.citizenship
        data.number=Jsondata.number
        data.PlaceOfIssue=Jsondata.PlaceOfIssue
        data.date_of_issue=Jsondata.date_of_issue
        data.date_of_expiry=Jsondata.date_of_expiry
        data.settlement_name=Jsondata.settlement_name
        data.mobile_tel=Jsondata.mobile_tel
        data.email=Jsondata.email
        data.edu_date_of_issue=Jsondata.edu_date_of_issue
        data.edu_serial_number=Jsondata.edu_serial_number
        data.edu_name=Jsondata.edu_name
        data.sex=Jsondata.sex
        data.country=Jsondata.country
        data.DD=Jsondata.DD
        data.religion=Jsondata.religion
        data.DataYourPeople=Jsondata.DataYourPeople
        data.NameSurname=Jsondata.NameSurname
        data.PhoneRepresantative=Jsondata.PhoneRepresantative
        data.country_pass=Jsondata.country_pass
        data.NatPassw=Jsondata.NatPassw
        data.HostelLive=Jsondata.HostelLive
        data.numberNational=Jsondata.numberNational
        data.pref_faculty=Jsondata.pref_faculty
        data.Files=Jsondata.Files
        navigate("/FillData", { replace: false })
      })
  }

    const navigate = useNavigate();
    const number=useInput('',{isEmpty:true})
    const date_of_expiry=useInput('',{isEmpty:true,inputData:true})
    const body = {
      number: number.value,
      date_of_expiry:date_of_expiry.value
    }
    const [ButtonClick,setButtonClick]=useState(false)
    useEffect(()=>{
        if(ButtonClick==true){
            Data.number=number.value
            Data.date_of_expiry=date_of_expiry.value
            edit.Edit=1
            if(Data.number!=''&&Data.date_of_expiry!=''){
                  sendRequest('POST', 'http://localhost:3001/api/auth/login', Data)
            }
          }
    })
    function handleClick(e) {
      setButtonClick(true)
      e.preventDefault()
    }
    return (
      
        <div className="div">
          <form className="form-ForRead" >
          <div align="right"className="row">
            <button className="btn-3 btn-sep icon-send" value="ru" onClick={(event) => { event.preventDefault(); i18n.changeLanguage('ru'); }}>RU</button>
            <button className="btn-11 btn-sep icon-send" value="en" onClick={(event) => { event.preventDefault(); i18n.changeLanguage('en'); }}>EN</button>
        </div>
            <legend className="lead" >{t('ForReadData')}</legend>
{/*<label className="form-label w-100">Серия
            <input className={serial.isDirty&&serial.isEmpty?"input_w600-error":"input_w600"} onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxLength="15" autoComplete="off"/>
            {(serial.isDirty&&serial.isEmpty)&&<div  style={{color:'red'}}> Поле "Серия" обязательно для заполнения.</div>}
    </label>*/}
<label className="form-label w-100">{t('ForReadDataNum')}
            <input className={number.isDirty&&number.isEmpty?"input_w600-error":"input_w600"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxLength="15"  autoComplete="off"/>
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> {t('ForReadDataNumErr')}</div>}
</label>
<label className="form-label w-100">{t('ForReadDataVid')}
            <input className={date_of_expiry.isDirty&&(date_of_expiry.isEmpty||date_of_expiry.inputData)?"input_w600-error":"input_w600"} onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value} name="date_of_expiry" placeholder="дд.мм.гггг" maxLength="10" autoComplete="off"/>
            {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div  style={{color:'red'}}> {t('ForReadDataVidErr1')}</div>}
            {(date_of_expiry.isDirty&&date_of_expiry.inputData&&!date_of_expiry.isEmpty)&&<div  style={{color:'red'}}>{t('ForReadDataVidErr2')}</div>}
</label>
        <div align ="center" >
                    <button disabled={number.isEmpty||date_of_expiry.inputData||date_of_expiry.isEmpty}
                    onClick={handleClick}
                     type="submit" className="btn btn-1 btn-sep icon-info">{t('Next')}</button>
                </div>
              </form>
        </div>
    )
  }
  export default ForRead