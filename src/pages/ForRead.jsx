import "../style/Anketa.css"
import ButtonForNavigate from "../components/ButtonForNavigate"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'
import { redirect } from "react-router-dom";



const useValidation=(value,validations)=>{
  const[isEmpty,setEmpty]=useState(true)
  const[inputValid,setInputValid]=useState(false)
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
        if(isEmpty||inputData||Num){
          setInputValid(false)
      } else {
          setInputValid(true)
      }
    }
},[value,isEmpty,inputData,Num])


return{
  isEmpty,
  inputValid,
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
}
}

const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }
    xhr.onerror = () => {
      reject(xhr.response)
    }
    xhr.send(JSON.stringify(body))
  })
}



function ForRead() {


    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true,Num:true})
    const date_of_issue=useInput('',{isEmpty:true,inputData:true})

    const body = {
      serial: serial.value,
      number: number.value,
      date_of_issue:date_of_issue.value
    }
    function dataOut(){
      sendRequest('POST', requestURL, body)
       .then(data => console.log(data))
       .catch(err => console.log(err))
   }
    return (
 
        <div className="div">
          <form className="form-ForRead" method="post">
            <legend className="lead" >Введите данные документа:</legend>
<label className="form-label w-100">Серия
            <input className={serial.isDirty&&serial.isEmpty?"input_w600-error":"input_w600"} onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxLength="15" autoComplete="off"/>
            {(serial.isDirty&&serial.isEmpty)&&<div  style={{color:'red'}}> Поле "Серия" обязательно для заполнения.</div>}
</label>
<label className="form-label w-100">Номер
            <input className={number.isDirty&&(number.isEmpty||number.Num)?"input_w600-error":"input_w600"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxLength="15"  autoComplete="off"/>
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> Поле "Номер" обязательно для заполнения.</div>}
            {(number.isDirty&&number.Num&&!number.isEmpty)&&<div style={{color:'red'}}> Поле "Номер" может содержать только цифры.</div>}
</label>
<label className="form-label w-100">Дата выдачи
            <input className={date_of_issue.isDirty&&(date_of_issue.isEmpty||date_of_issue.inputData)?"input_w600-error":"input_w600"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" autoComplete="off"/>
            {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div  style={{color:'red'}}> Поле "Дата выдачи" обязательно для заполнения.</div>}
            {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div  style={{color:'red'}}>Поле "Дата выдачи" заполнено неверно.</div>}

</label>
        <div align ="center" >
                    <button disabled={!number.inputValid||!date_of_issue.inputValid||!serial.inputValid}
                    onClickCapture={()=>dataOut()}
                     type="submit" className="btn btn-1 btn-sep icon-info">Далее</button>
                </div>
              </form>
        </div>
        
    )
  }
  export default ForRead