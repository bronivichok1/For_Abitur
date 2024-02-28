import "../style/Anketa.css"
import ButtonForNavigate from "../components/ButtonForNavigate"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'
import { redirect } from "react-router-dom";



const useValidation=(value,validations)=>{
  const[isEmpty,setEmpty]=useState(true)
  const[minLengthError,setMinLengthError]=useState(true)
  const[isRus,setRus]=useState(true)
  const[isEng,setEng]=useState(true)
  const[ismobileNum,setmobileNum]=useState(true)
  const[isemailCheck,setemailCheck]=useState(true)
  const[inputValid,setInputValid]=useState(false)
  const[inputData,setInputData]=useState(false)

  useEffect(()=>{
    for(const validation in validations){

        switch(validation){
          case'minLength':
          value.length<validations[validation]?setMinLengthError(true):setMinLengthError(false) //work
          break;
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
              var num=/^[+]{1}[0-9]+$/gm
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
        }

    }
},[value])
useEffect(()=>{
  if(isEmpty||minLengthError||isEng||isRus||inputData||isemailCheck||ismobileNum){
      setInputValid(false)
  } else {
      setInputValid(true)
  }
},[isEmpty,minLengthError,isEng,isRus,inputData,isemailCheck,ismobileNum])

return{
  isEmpty,
  minLengthError,
  isRus,
  isEng,
  inputValid,
  ismobileNum,
  isemailCheck,
  inputData

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
    const location = useLocation();

    useEffect(() => {
      console.log('Current location is ', location);
    }, [location]);

    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true})
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
            <input className={serial.isDirty&&serial.isEmpty?"input_w600-error":"input_w600"} onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxLength="15" />
            {(serial.isDirty&&serial.isEmpty)&&<div  style={{color:'red'}}> Поле "Серия" обязательно для заполнения.</div>}
</label>
<label className="form-label w-100">Номер
            <input className={number.isDirty&&number.isEmpty?"input_w600-error":"input_w600"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxLength="15"  />
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> Поле "Номер" обязательно для заполнения.</div>}
</label>
<label className="form-label w-100">Дата выдачи
            <input className={date_of_issue.isDirty&&(date_of_issue.isEmpty||date_of_issue.inputData)?"input_w600-error":"input_w600"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" />
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