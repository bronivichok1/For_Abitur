import "../style/ForRead.css"
import "../style/Form.css"
import DataForRed from "../components/DataForRed"
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





function ForRed() {
    const location = useLocation();

    useEffect(() => {
      console.log('Current location is ', location);
    }, [location]);

    const serial=useInput('',{isEmpty:true})
    const number=useInput('',{isEmpty:true})
    const date_of_issue=useInput('',{isEmpty:true})


    return (
 
        <div class="div">
          <form  method="post">
            <p class="lead">Введите данные документа:</p>
<label class="form-label w-100">Серия
            <input class="input-medium" onChange={e=>serial.onChange(e)} onBlur={e=>serial.onBlur(e)} value={serial.value} name="serial" maxlength="15" required/>
            {(serial.isDirty&&serial.isEmpty)&&<div  style={{color:'red'}}> Неверная серия.</div>}
</label>
<label class="form-label w-100">Номер
            <input class="input-medium" onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value} name="number" maxlength="15"  required/>
            {(number.isDirty&&number.isEmpty)&&<div  style={{color:'red'}}> Неверный номер.</div>}
</label>
<label class="form-label w-100">Дата выдачи
            <input class="input-medium" onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value} name="date_of_issue" placeholder="дд.мм.гггг" maxlength="10" required/>
            {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div  style={{color:'red'}}> Неверная дата выдачи.</div>}
</label>
        <div align ="center" >
                    <button type="submit" class="btn btn-1 btn-sep icon-info">Далее</button>
                </div>
              </form>
        </div>
        
    )
  }
  export default ForRed