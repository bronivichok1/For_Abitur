import "../style/Anketa.css"
import { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import {data,Data,edit, errorCod} from '../data/DataForInput'
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
  const PATH = process.env.REACT_APP_PATH;

  const RequestURL=PATH+'/auth/login';

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
        if(errorCod=3){
        toast.error(t('ErrorIDK'), {
          position: "top-right"
        });
      }
      }
    }) 
    .then(dataAbitur=>{
        data.surname=dataAbitur.surname
        data.name=dataAbitur.name
        data.surname_info=dataAbitur.surname_info
        data.date_of_birth=dataAbitur.date_of_birth
        data.citizenship=dataAbitur.citizenship
        data.number=dataAbitur.number
        data.PlaceOfIssue=dataAbitur.PlaceOfIssue
        data.date_of_issue=dataAbitur.date_of_issue
        data.date_of_expiry=dataAbitur.date_of_expiry
        data.settlement_name=dataAbitur.settlement_name
        data.mobile_tel=dataAbitur.mobile_tel
        data.email=dataAbitur.email
        data.edu_date_of_issue=dataAbitur.edu_date_of_issue
        data.edu_serial_number=dataAbitur.edu_serial_number
        data.edu_name=dataAbitur.edu_name
        data.sex=dataAbitur.sex
        data.country=dataAbitur.country
        data.DD=dataAbitur.DD
        data.religion=dataAbitur.religion
        data.DataYourPeople=dataAbitur.DataYourPeople
        data.NameSurname=dataAbitur.NameSurname
        data.PhoneRepresantative=dataAbitur.PhoneRepresantative
        data.country_pass=dataAbitur.country_pass
        data.NatPassw=dataAbitur.NatPassw
        data.HostelLive=dataAbitur.HostelLive
        data.numberNational=dataAbitur.numberNational
        data.pref_faculty=dataAbitur.pref_faculty
        data.Files=dataAbitur.Files
        edit.Edit=1
        navigate("/FillData", { replace: false })
      })
      .catch(error=>{
        toast.error(t('ErrorIDK'), {
          position: "top-right"
        });
      })
  }

    const navigate = useNavigate();
    const number=useInput('',{isEmpty:true})
    const date_of_issue=useInput('',{isEmpty:true,inputData:true})
    const [ButtonClick,setButtonClick]=useState(false)
    useEffect(()=>{
        if(ButtonClick==true){
            Data.number=number.value
            Data.date_of_issue=date_of_issue.value
            if(Data.number!=''&&Data.date_of_issue!=''){
                  sendRequest('POST', RequestURL, Data)
            }
            setButtonClick(false)
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
            <input className={date_of_issue.isDirty&&(date_of_issue.isEmpty||date_of_issue.inputData)?"input_w600-error":"input_w600"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" autoComplete="off"/>
            {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div  style={{color:'red'}}> {t('ForReadDataVidErr1')}</div>}
            {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div  style={{color:'red'}}>{t('ForReadDataVidErr2')}</div>}
</label>
        <div align ="center" >
                    <button disabled={number.isEmpty||date_of_issue.inputData||date_of_issue.isEmpty}
                    onClick={handleClick}
                     type="submit" className="btn btn-1 btn-sep icon-info">{t('Next')}</button>
                </div>
              </form>
        </div>
    )
  }
  export default ForRead