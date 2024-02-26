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
            case'inputData':
            var ru=/^\d{4}[-|\/|.]\d{2}\1\d{2}$/i
            ru.test(String(value).toLowerCase())?setInputData(false):setInputData(true)
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





function ForRead() {
    const location = useLocation();

    useEffect(() => {
      console.log('Current location is ', location);
    }, [location]);

    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true})
    const date_of_issue=useInput('',{isEmpty:true})

    
    return (
 
        <div className="div">
          <form className="form-ForRead" method="post">
            <legend className="lead" >Введите данные документа:</legend>
<label className="form-label w-100">Серия
            <input className={serial.isDirty&&serial.isEmpty?"input_w600-error":"input_w600"} onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxLength="15" />
            {(serial.isDirty&&serial.isEmpty)&&<div  style={{color:'red'}}> Неверная серия.</div>}
</label>
<label className="form-label w-100">Номер
            <input className={number.isDirty&&number.isEmpty?"input_w600-error":"input_w600"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxLength="15"  />
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> Неверный номер.</div>}
</label>
<label className="form-label w-100">Дата выдачи
            <input className={date_of_issue.isDirty&&date_of_issue.isEmpty?"input_w600-error":"input_w600"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder="дд.мм.гггг" maxLength="10" />
            {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div  style={{color:'red'}}> Неверная дата выдачи.</div>}
</label>
        <div align ="center" >
                    <button type="submit" className="btn btn-1 btn-sep icon-info">Далее</button>
                </div>
              </form>
        </div>
        
    )
  }
  export default ForRead