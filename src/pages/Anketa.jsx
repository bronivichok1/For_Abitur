import "../style/Anketa.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import {dataEdit,Data,edit,errorCod,dataID, ForLan,filesName} from '../data/DataForInput'
import Modal from "../components/Modal";
import '../style/Button_language.css'


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
                    var num= /^\d*\+?\d*$/
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
                    var num= /^[a-zA-Z0-9-]*$/
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
    const PATH = process.env.REACT_APP_PATH;
    const [modalActive,setModalActive]=useState(false)
    const [lan,setLan]=useState(ForLan.lan)
    
    const { t, i18n } = useTranslation()
    const[files,setFiles]=useState([])
    const[resp,setResp]=useState({})
    const[showInput, setShowInput] = useState(false);
    const[showInputDataPeople, setShowInputDataPeople] = useState(false);
    const[oldFiles,setOldFiles]=useState([])
    
    function sendRequest(method, url, body = null) {
        const headers = {'Content-Type': 'application/json'}
        return fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: headers
        })
        .then((response) => {
            setResp(response)
            //console.log(resp)
            return response.json()
          }).then((data) => {
              console.log(data)
              if (data.id) {
                  const body2=new FormData()
                  const nameFolder=data.id
                  body2.append('name',nameFolder)
                  files.forEach((files)=>{
                  body2.append('file',files)
              })
      
              sendRequestFormData('POST',PATH +'/files',body2)
              setFiles([])
                  setModalActive(true)
                }else{
                if(edit.Edit==true){
                    const body2=new FormData()
                    body2.append('name',dataEdit.id)

                    files.forEach((files)=>{
                    body2.append('file',files)})

                    sendRequestFormData('POST',PATH +'/files',body2)
                    setFiles([])
                    setOldFiles([])
                    setModalActive(true)
                    edit.Edit=false
                }                
                else{
                    if(resp.status=='404'||errorCod.error=='1'){
                        toast.error(t('Error1'), {
                            position: "top-right"
                          });
                      } else{
                  toast.error(t('ErrorIDK'), {
                      position: "top-right"
                    }
                    );
                }
                edit.Edit=false
                }
              }
          })}

      function sendRequestFormData(method, url, body = null) {
        return fetch(url, {
          method: method,
          body: body,
        }).then(response => {
          if (response.ok) {
            return  response
          }else{ }})}


    const [ButtonClick,setButtonClick]=useState(false)
    useEffect(()=>{

        if(ButtonClick==true){
            setButtonClick(false)
             let Metod=''
            if(edit.Edit==true){
                Metod='PATCH'
                sendRequest(Metod, PATH +'/user/'+dataEdit.id, body2)
                console.log(body2)
            }else{
                Metod='POST'
                sendRequest(Metod, PATH +'/user', body2)
            }
        }       
        if(lan==true){
            i18n.changeLanguage('en');  
        }
        else{
            i18n.changeLanguage('ru');
        }
        if(edit.Edit==true){
            setOldFiles(filesName.filesArr.fileNames)
        }
        }, [ButtonClick,lan,edit,filesName]);

    function handleClick(e) {
        setButtonClick(true)
        e.preventDefault()
      }

    const surname=useInput(dataEdit.surname,{isEmpty:true,isEng:true})
    const name=useInput(dataEdit.name,{isEmpty:true,isEng:true})
    const surnamerus=useInput(dataEdit.surnamerus,{isEmpty:true,isRus:true})
    const namerus=useInput(dataEdit.namerus,{isEmpty:true,isRus:true})
    const surname_info=useInput(dataEdit.surname_info,{isEmpty:true})
    const date_of_birth=useInput(dataEdit.date_of_birth,{isEmpty:true,inputData:true})
    const citizenship=useInput(dataEdit.citizenship,{isEmpty:true})
    const number=useInput(dataEdit.number,{isEmpty:true, Num:true})
    const serialPass=useInput(dataEdit.serialPass,{Num:true})
    const PlaceOfIssue=useInput(dataEdit.PlaceOfIssue,{isEmpty:true})
    const date_of_issue=useInput(dataEdit.date_of_issue,{isEmpty:true,inputData:true})
    const date_of_expiry=useInput(dataEdit.date_of_expiry,{isEmpty:true,inputData:true})
    const settlement_name=useInput(dataEdit.settlement_name,{isEmpty:true})
    const mobile_tel=useInput(dataEdit.mobile_tel,{isEmpty:true,ismobileNum:true})
    const email=useInput(dataEdit.email,{isEmpty:true,isemailCheck:true})
    const edu_date_of_issue=useInput(dataEdit.edu_date_of_issue,{isEmpty:true, inputData:true})
    const edu_serial_number=useInput(dataEdit.edu_serial_number)
    const edu_name=useInput(dataEdit.edu_name)
    const sex=useInput(dataEdit.sex,{isEmpty:true})
    const country=useInput(edit.Edit&&dataEdit.country||!edit.Edit&&t('Cou33'))
    const pref_faculty=useInput(edit.Edit&&dataEdit.pref_faculty||!edit.Edit&&t('Fac10'))
    const DD=useInput(dataEdit.DD)
    const religion=useInput(dataEdit.religion) 
    const DataYourPeople=useInput(dataEdit.DataYourPeople,{isEmpty:true})
    const NameSurname=useInput(dataEdit.NameSurname)
    const PhoneRepresantative=useInput(dataEdit.PhoneRepresantative,{ismobileNum:true})
    const country_pass=useInput((edit.Edit&&dataEdit.country_pass)||(!edit.Edit&&t('Cou33')),{isEmpty:true})
    const NatPassw=useInput(dataEdit.NatPassw,{isEmpty:true})
    const HostelLive=useInput(dataEdit.HostelLive)
    const numberNational =useInput(dataEdit.numberNational)

    const body2 = {
      name: name.value,
      surname: surname.value,
      namerus:namerus.value,
      surnamerus:surnamerus.value,
      surname_info:surname_info.value,
      date_of_birth:date_of_birth.value,
      citizenship:citizenship.value,
      number:number.value,
      serialPass:serialPass.value,
      PlaceOfIssue:PlaceOfIssue.value,
      date_of_issue:date_of_issue.value,
      date_of_expiry:date_of_expiry.value,
      settlement_name:settlement_name.value,
      mobile_tel:mobile_tel.value,
      email:email.value,
      edu_date_of_issue:edu_date_of_issue.value,
      edu_serial_number:edu_serial_number.value,
      edu_name:edu_name.value,
      sex:sex.value,
      country:country.value,
      DD:DD.checked,
      religion:religion.value,
      DataYourPeople:DataYourPeople.value,
      NameSurname:NameSurname.value,
      PhoneRepresantative:PhoneRepresantative.value,
      country_pass:country_pass.value,
      NatPassw:NatPassw.value,
      HostelLive:HostelLive.value,
      numberNational:numberNational.value,
      pref_faculty:pref_faculty.value,
      nameFolder:number.value+date_of_expiry.value
    }

     const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
          const newFiles = [...files]; // Создаем копию массива файлов
          Array.from(e.target.files).forEach((file) => {
            if (file.size <= 10 * 1024 * 1024 && 
                ( file.type === 'image/JPG' ||file.type === 'image/jpg' || file.type === 'image/jpeg'|| file.type === 'image/JPEG' || file.type === 'application/pdf'|| file.type === 'application/PDF')) {
              newFiles.push(file); // Добавляем каждый файл в копию массива файлов
            } else {
              alert(t('ErrorFileMessage'));
            }
          });
          setFiles(newFiles); // Устанавливаем новое состояние массива файлов
        }
      };
      
    const[dragActive,setDragActive]=useState(false)

    const handleDrag=(e)=>{
        e.preventDefault();
        setDragActive(true)
    }
    const handleLeave=(e)=>{
        e.preventDefault();
        setDragActive(false)
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          const newFiles = [...files]; // Создаем копию массива файлов
          Array.from(e.dataTransfer.files).forEach((file) => {
            if (file.size <= 10 * 1024 * 1024 && 
                ( file.type === 'image/JPG' ||file.type === 'image/jpg' || file.type === 'image/jpeg'|| file.type === 'image/JPEG' || file.type === 'application/pdf'|| file.type === 'application/PDF')) {
              newFiles.push(file); // Добавляем каждый файл в копию массива файлов
            } else {
              alert(t('ErrorFileMessage'));
            }
          });
          setFiles(newFiles); // Устанавливаем новое состояние массива файлов
        }
       }

    const handleReset=(e,id)=>{
        e.stopPropagation();
        e.preventDefault();

        const newFiles = [...files];
        if (id < files.length) {
            newFiles.splice(id, 1);
        }
        setFiles(newFiles);
        };

        const handleResetOld=(e,id)=>{
            e.stopPropagation();
            e.preventDefault();
    
            const newOldFiles = [...oldFiles];
            const DeleteBody=new FormData()
            sendRequestFormData('POST',PATH+'/files/delete/'+dataEdit.id+'/'+newOldFiles[id],DeleteBody)

            newOldFiles.splice(id, 1);
            setOldFiles(newOldFiles);
            filesName.filesArr=oldFiles;
            };
  
    const handleSubmit=(e)=>{
       e.preventDefault();
       /*const body2=new FormData()
         const nameFolder=number.value+date_of_expiry.value
            body2.append("id",nameFolder)
            files.forEach((file)=>{
            body2.append("file",file)
        })*/
    }

        const handleToggleChange = () => {
            ForLan.lan=!lan; 
            setLan(!lan);
                      // Инвертируем значение lan при каждом изменении состояния переключателя
          };
          const handleSelectChange = (e) => {
            setShowInput(e.target.value === 'yes');
          };
          const handleSelectChangeDataPeople = (e) => {
            setShowInputDataPeople(e.target.value === 'yes');
          };
        


    return (
        <div>
                    <div className="btn-container">
            <label className="switch btn-color-mode-switch">
                <input checked={ForLan.lan} id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
                <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" for="color_mode" ></label>
            </label>
        </div>
        <form  className="form" autoComplete="off">


        <Modal active={modalActive} setActive={setModalActive}>
            <h5>{t('FinalMessage')}</h5>
        </Modal>
<legend>{t('AppDetails')}</legend>        
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
                <label className="form-label col-sm">{t('SurnameRus')}<span>*</span>
                        <input  className={surnamerus.isDirty&&(surnamerus.isRus||surnamerus.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>surnamerus.onChange(e)} onBlur={e=>surnamerus.onBlur(e)} value={surnamerus.value}   name="surnamerus" maxLength="40" />
                        {(surnamerus.isDirty&&surnamerus.isEmpty)&&<div  style={{color:'red'}}> {t('SurnameErrorEmptyRus')}</div>}
                        {(surnamerus.isDirty&&surnamerus.isRus&&!surnamerus.isEmpty)&&<div  style={{color:'red'}}> {t('SurnameErrorRus')}</div>}
                </label> 
                <label className="form-label col-sm" >{t('NameRus')}<span>*</span>
                        <input className={namerus.isDirty&&(namerus.isRus||namerus.isEmpty)?"input_w600-error":"input_w600"}  onChange={e=>namerus.onChange(e)} onBlur={e=>namerus.onBlur(e)} value={namerus.value} name="namerus" maxLength="40"/>
                        {(namerus.isDirty&&namerus.isEmpty)&&<div style={{color:'red'}}> {t('NameErrorEmptyRus')}</div>}
                        {(namerus.isDirty&&namerus.isRus&&!namerus.isEmpty)&&<div style={{color:'red'}}> {t('NameErrorRus')}</div>}
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm">{!showInput&&t('Surname_info')}{showInput&&t('Surname_infoNext')}
                <select className="select_show" onChange={handleSelectChange}> 
                                            <option value="no">{t('No')}</option>
                                            <option value="yes">{t('Yes')}</option>
                                        </select>
                                        {showInput && (                                       
  
                        <input className={showInput&&surname_info.isDirty&&surname_info.isEmpty?"input_w1210-error":"input_w1210"}  onChange={e=>surname_info.onChange(e)} onBlur={e=>surname_info.onBlur(e)} value={surname_info.value}  name="surname_info" maxLength="100" />)}
                        {(showInput&&surname_info.isDirty&&surname_info.isEmpty)&&<div style={{color:'red'}}>{t('Surname_infoError')}</div>}
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
                <input className={date_of_birth.isDirty&&(date_of_birth.inputData||date_of_birth.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_birth.onChange(e)} onBlur={e=>date_of_birth.onBlur(e)} value={date_of_birth.value}  name="date_of_birth" placeholder={t('DataInp')} maxLength="10" />
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
                        <option value={t('Cou33')}>{t('Cou33')}</option>
                        <option value={t('Cou0')}>{t('Cou0')}</option>
                        <option value={t('Cou1')}>{t('Cou1')}</option>
                        <option value={t('Cou2')}>{t('Cou2')}</option>
                        <option value={t('Cou3')}>{t('Cou3')}</option>
                        <option value={t('Cou4')}>{t('Cou4')}</option>
                        <option value={t('Cou5')}>{t('Cou5')}</option>
                        <option value={t('Cou6')}>{t('Cou6')}</option>
                        <option value={t('Cou7')}>{t('Cou7')}</option>
                        <option value={t('Cou8')}>{t('Cou8')}</option>
                        <option value={t('Cou9')}>{t('Cou9')}</option>
                        <option value={t('Cou10')}>{t('Cou10')}</option>
                        <option value={t('Cou11')}>{t('Cou11')}</option>
                        <option value={t('Cou12')}>{t('Cou12')}</option>
                        <option value={t('Cou13')}>{t('Cou13')}</option>
                        <option value={t('Cou14')}>{t('Cou14')}</option>
                        <option value={t('Cou15')}>{t('Cou15')}</option>
                        <option value={t('Cou16')}>{t('Cou16')}</option>
                        <option value={t('Cou17')}>{t('Cou17')}</option>
                        <option value={t('Cou18')}>{t('Cou18')}</option>
                        <option value={t('Cou19')}>{t('Cou19')}</option>
                        <option value={t('Cou20')}>{t('Cou20')}</option>
                        <option value={t('Cou21')}>{t('Cou21')}</option>
                        <option value={t('Cou22')}>{t('Cou22')}</option>
                        <option value={t('Cou23')}>{t('Cou23')}</option>
                        <option value={t('Cou24')}>{t('Cou24')}</option>
                        <option value={t('Cou25')}>{t('Cou25')}</option>
                        <option value={t('Cou26')}>{t('Cou26')}</option>
                        <option value={t('Cou27')}>{t('Cou27')}</option>
                        <option value={t('Cou28')}>{t('Cou28')}</option>
                        <option value={t('Cou29')}>{t('Cou29')}</option>
                        <option value={t('Cou30')}>{t('Cou30')}</option>
                        <option value={t('Cou31')}>{t('Cou31')}</option>
                        <option value={t('Cou32')}>{t('Cou32')}</option>
                        <option value={t('Cou34')}>{t('Cou34')}</option>
                        <option value={t('Cou35')}>{t('Cou35')}</option>
                        <option value={t('Cou36')}>{t('Cou36')}</option>
                        <option value={t('Cou37')}>{t('Cou37')}</option>
                        <option value={t('Cou38')}>{t('Cou38')}</option>
                        <option value={t('Cou39')}>{t('Cou39')}</option>
                        <option value={t('Cou40')}>{t('Cou40')}</option>
                        <option value={t('Cou41')}>{t('Cou41')}</option>
                        <option value={t('Cou42')}>{t('Cou42')}</option>
                        <option value={t('Cou43')}>{t('Cou43')}</option>
                        <option value={t('Cou44')}>{t('Cou44')}</option>
                        <option value={t('Cou45')}>{t('Cou45')}</option>
                        <option value={t('Cou46')}>{t('Cou46')}</option>
                        <option value={t('Cou47')}>{t('Cou47')}</option>
                        <option value={t('Cou48')}>{t('Cou48')}</option>
                        <option value={t('Cou49')}>{t('Cou49')}</option>
                        <option value={t('Cou50')}>{t('Cou50')}</option>
                        <option value={t('Cou51')}>{t('Cou51')}</option>
                        <option value={t('Cou52')}>{t('Cou52')}</option>
                        <option value={t('Cou53')}>{t('Cou53')}</option>
                        <option value={t('Cou54')}>{t('Cou54')}</option>
                        <option value={t('Cou55')}>{t('Cou55')}</option>
                        <option value={t('Cou56')}>{t('Cou56')}</option>
                        <option value={t('Cou57')}>{t('Cou57')}</option>
                        <option value={t('Cou58')}>{t('Cou58')}</option>
                        <option value={t('Cou59')}>{t('Cou59')}</option>
                        <option value={t('Cou60')}>{t('Cou60')}</option>
                        <option value={t('Cou61')}>{t('Cou61')}</option>
                        <option value={t('Cou62')}>{t('Cou62')}</option>
                        <option value={t('Cou63')}>{t('Cou63')}</option>
                        <option value={t('Cou64')}>{t('Cou64')}</option>
                        <option value={t('Cou65')}>{t('Cou65')}</option>
                        <option value={t('Cou66')}>{t('Cou66')}</option>
                        <option value={t('Cou67')}>{t('Cou67')}</option>
                        <option value={t('Cou68')}>{t('Cou68')}</option>
                        <option value={t('Cou69')}>{t('Cou69')}</option>
                        <option value={t('Cou70')}>{t('Cou70')}</option>
                        <option value={t('Cou71')}>{t('Cou71')}</option>
                        <option value={t('Cou72')}>{t('Cou72')}</option>
                        <option value={t('Cou73')}>{t('Cou73')}</option>
                        <option value={t('Cou74')}>{t('Cou74')}</option>
                        <option value={t('Cou75')}>{t('Cou75')}</option>
                        <option value={t('Cou76')}>{t('Cou76')}</option>
                        <option value={t('Cou77')}>{t('Cou77')}</option>
                        <option value={t('Cou78')}>{t('Cou78')}</option>
                        <option value={t('Cou79')}>{t('Cou79')}</option>
                        <option value={t('Cou80')}>{t('Cou80')}</option>
                        <option value={t('Cou81')}>{t('Cou81')}</option>
                        <option value={t('Cou83')}>{t('Cou83')}</option>
                        <option value={t('Cou84')}>{t('Cou84')}</option>
                        <option value={t('Cou85')}>{t('Cou85')}</option>
                        <option value={t('Cou86')}>{t('Cou86')}</option>
                        <option value={t('Cou87')}>{t('Cou87')}</option>
                        <option value={t('Cou88')}>{t('Cou88')}</option>
                        <option value={t('Cou89')}>{t('Cou89')}</option>
                        <option value={t('Cou90')}>{t('Cou90')}</option>
                        <option value={t('Cou91')}>{t('Cou91')}</option>
                        <option value={t('Cou92')}>{t('Cou92')}</option>
                        <option value={t('Cou93')}>{t('Cou93')}</option>
                        <option value={t('Cou94')}>{t('Cou94')}</option>
                        <option value={t('Cou95')}>{t('Cou95')}</option>
                        <option value={t('Cou96')}>{t('Cou96')}</option>
                        <option value={t('Cou97')}>{t('Cou97')}</option>
                        <option value={t('Cou98')}>{t('Cou98')}</option>
                        <option value={t('Cou99')}>{t('Cou99')}</option>
                        <option value={t('Cou100')}>{t('Cou100')}</option>
                        <option value={t('Cou101')}>{t('Cou101')}</option>
                        <option value={t('Cou102')}>{t('Cou102')}</option>
                        <option value={t('Cou103')}>{t('Cou103')}</option>
                        <option value={t('Cou104')}>{t('Cou104')}</option>
                        <option value={t('Cou105')}>{t('Cou105')}</option>
                        <option value={t('Cou106')}>{t('Cou106')}</option>
                        <option value={t('Cou107')}>{t('Cou107')}</option>
                        <option value={t('Cou108')}>{t('Cou108')}</option>
                        <option value={t('Cou109')}>{t('Cou109')}</option>
                        <option value={t('Cou110')}>{t('Cou110')}</option>
                        <option value={t('Cou111')}>{t('Cou111')}</option>
                        <option value={t('Cou112')}>{t('Cou112')}</option>
                        <option value={t('Cou113')}>{t('Cou113')}</option>
                        <option value={t('Cou114')}>{t('Cou114')}</option>
                        <option value={t('Cou115')}>{t('Cou115')}</option>
                        <option value={t('Cou116')}>{t('Cou116')}</option>
                        <option value={t('Cou117')}>{t('Cou117')}</option>
                        <option value={t('Cou118')}>{t('Cou118')}</option>
                        <option value={t('Cou119')}>{t('Cou119')}</option>
                        <option value={t('Cou120')}>{t('Cou120')}</option>
                        <option value={t('Cou121')}>{t('Cou121')}</option>
                        <option value={t('Cou122')}>{t('Cou122')}</option>
                        <option value={t('Cou123')}>{t('Cou123')}</option>
                        <option value={t('Cou124')}>{t('Cou124')}</option>
                        <option value={t('Cou125')}>{t('Cou125')}</option>
                        <option value={t('Cou126')}>{t('Cou126')}</option>
                        <option value={t('Cou127')}>{t('Cou127')}</option>
                        <option value={t('Cou128')}>{t('Cou128')}</option>
                        <option value={t('Cou129')}>{t('Cou129')}</option>
                        <option value={t('Cou130')}>{t('Cou130')}</option>
                        <option value={t('Cou131')}>{t('Cou131')}</option>
                        <option value={t('Cou132')}>{t('Cou132')}</option>
                        <option value={t('Cou133')}>{t('Cou133')}</option>
                        <option value={t('Cou134')}>{t('Cou134')}</option>
                        <option value={t('Cou135')}>{t('Cou135')}</option>
                        <option value={t('Cou136')}>{t('Cou136')}</option>
                        <option value={t('Cou137')}>{t('Cou137')}</option>
                        <option value={t('Cou138')}>{t('Cou138')}</option>
                        <option value={t('Cou139')}>{t('Cou139')}</option>
                        <option value={t('Cou140')}>{t('Cou140')}</option>
                        <option value={t('Cou141')}>{t('Cou141')}</option>
                        <option value={t('Cou142')}>{t('Cou142')}</option>
                        <option value={t('Cou143')}>{t('Cou143')}</option>
                        <option value={t('Cou144')}>{t('Cou144')}</option>
                        <option value={t('Cou145')}>{t('Cou145')}</option>
                        <option value={t('Cou146')}>{t('Cou146')}</option>
                        <option value={t('Cou147')}>{t('Cou147')}</option>
                        <option value={t('Cou148')}>{t('Cou148')}</option>
                        <option value={t('Cou149')}>{t('Cou149')}</option>
                        <option value={t('Cou150')}>{t('Cou150')}</option>
                        <option value={t('Cou151')}>{t('Cou151')}</option>
                        <option value={t('Cou152')}>{t('Cou152')}</option>
                        <option value={t('Cou153')}>{t('Cou153')}</option>
                        <option value={t('Cou154')}>{t('Cou154')}</option>
                        <option value={t('Cou155')}>{t('Cou155')}</option>
                        <option value={t('Cou156')}>{t('Cou156')}</option>
                        <option value={t('Cou157')}>{t('Cou157')}</option>
                        <option value={t('Cou158')}>{t('Cou158')}</option>
                        <option value={t('Cou159')}>{t('Cou159')}</option>
                        <option value={t('Cou160')}>{t('Cou160')}</option>
                        <option value={t('Cou161')}>{t('Cou161')}</option>
                        <option value={t('Cou162')}>{t('Cou162')}</option>
                        <option value={t('Cou163')}>{t('Cou163')}</option>
                        <option value={t('Cou164')}>{t('Cou164')}</option>
                        <option value={t('Cou165')}>{t('Cou165')}</option>
                        <option value={t('Cou166')}>{t('Cou166')}</option>
                        <option value={t('Cou167')}>{t('Cou167')}</option>
                        <option value={t('Cou168')}>{t('Cou168')}</option>
                        <option value={t('Cou169')}>{t('Cou169')}</option>
                        <option value={t('Cou170')}>{t('Cou170')}</option>
                        <option value={t('Cou171')}>{t('Cou171')}</option>
                        <option value={t('Cou172')}>{t('Cou172')}</option>
                        <option value={t('Cou173')}>{t('Cou173')}</option>
                        <option value={t('Cou174')}>{t('Cou174')}</option>
                        <option value={t('Cou175')}>{t('Cou175')}</option>
                        <option value={t('Cou176')}>{t('Cou176')}</option>
                        <option value={t('Cou177')}>{t('Cou177')}</option>
                        <option value={t('Cou178')}>{t('Cou178')}</option>
                        <option value={t('Cou179')}>{t('Cou179')}</option>
                        <option value={t('Cou180')}>{t('Cou180')}</option>
                        <option value={t('Cou181')}>{t('Cou181')}</option>
                        <option value={t('Cou182')}>{t('Cou182')}</option>
                        <option value={t('Cou183')}>{t('Cou183')}</option>
                        <option value={t('Cou184')}>{t('Cou184')}</option>
                        <option value={t('Cou185')}>{t('Cou185')}</option>
                        <option value={t('Cou186')}>{t('Cou186')}</option>
                        <option value={t('Cou187')}>{t('Cou187')}</option>
                        <option value={t('Cou188')}>{t('Cou188')}</option>
                        <option value={t('Cou189')}>{t('Cou189')}</option>
                        <option value={t('Cou190')}>{t('Cou190')}</option>
                        <option value={t('Cou191')}>{t('Cou191')}</option>
                        <option value={t('Cou192')}>{t('Cou192')}</option>
                    </select>
                </label>
                    </div>
                    <div className="row">
                    <label className="form-label col-sm-4">{t('Number')}
                        <input className="input_w600" onChange={e=>numberNational.onChange(e)} onBlur={e=>numberNational.onBlur(e)} value={numberNational.value}  name="numberNational" maxLength="15" />
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
                <label className="form-label w-100">{!showInputDataPeople&&t('DataYourPeople')}{showInputDataPeople&&t('DataYourPeopleNext')}
                <select className="select_show" onChange={handleSelectChangeDataPeople}> 
                                            <option value="no">{t('No')}</option>
                                            <option value="yes">{t('Yes')}</option>
                                        </select>
                                        {showInputDataPeople && (  
                        <textarea className={showInputDataPeople&&DataYourPeople.isDirty&&DataYourPeople.isEmpty?"textarea_show_error":"textarea_show"} onChange={e=>DataYourPeople.onChange(e)} onBlur={e=>DataYourPeople.onBlur(e)} value={DataYourPeople.value}  name="DataYourPeople" maxLength="200" />)}
                        {(showInputDataPeople&&DataYourPeople.isDirty&&DataYourPeople.isEmpty)&&<div style={{color:'red'}}> {t('DataYourPeopleErrorEmpty')}</div>}

                </label>
                </div>
                <div className="row">
                <label className="form-label col-sm">{t('NameSurname')}
                        <input  className="input_w600" onChange={e=>NameSurname.onChange(e)} onBlur={e=>NameSurname.onBlur(e)} value={NameSurname.value}   name="NameSurname" maxLength="40" />
                </label> 
                <label className="form-label col-sm" >{t('PhoneRepresantative')}
                <input className={(PhoneRepresantative.isDirty&&PhoneRepresantative.ismobileNum&&!PhoneRepresantative.isEmpty)?"input_w600-error":"input_w600"}  onChange={e=>PhoneRepresantative.onChange(e)} onBlur={e=>PhoneRepresantative.onBlur(e)} value={PhoneRepresantative.value}  placeholder="+375XXXXXXXXX" name="PhoneRepresantative" maxLength="50" />
                        {(PhoneRepresantative.isDirty&&PhoneRepresantative.ismobileNum&&!PhoneRepresantative.isEmpty)&&<div  style={{color:'red'}}> {t('PhoneRepresantativeError')}</div>}
                        
                </label>
                </div>
                <hr/>
                <legend className="text-center">{t('Passport')}</legend>
                    <div className="row">
                <label className="form-label col-sm-4">{t('serialPass')}
                        <input className={serialPass.isDirty&&serialPass.Num?"input_w295-error":"input_w295"} onChange={e=>serialPass.onChange(e)} onBlur={e=>serialPass.onBlur(e)} value={serialPass.value}  name="serialPass" maxLength="15" />
                        {(serialPass.isDirty&&serialPass.Num)&&<div style={{color:'red'}}> {t('PassNumberError')}</div>}
                </label>
                <label className="form-label col-sm-4">{t('PassNumber')}<span >*</span>
                        <input className={number.isDirty&&(number.isEmpty||number.Num)?"input_w295-error":"input_w295"} onChange={e=>number.onChange(e)} onBlur={e=>number.onBlur(e)} value={number.value}  name="number" maxLength="20" />
                        {(number.isDirty&&number.isEmpty)&&<div style={{color:'red'}}> {t('PassNumberErrorEmpty')}</div>}
                        {(number.isDirty&&number.Num)&&<div style={{color:'red'}}> {t('PassNumberError')}</div>}
                </label>
                <label className="form-label col-sm-8">{t('CountryPass')} <span>*</span>
                        <select className="select_w595" onChange={e=>country_pass.onChange(e)} onBlur={e=>country_pass.onBlur(e)} value={country_pass.value}  name="country_pass">
                        <option value={t('Cou33')}>{t('Cou33')}</option>
                        <option value={t('Cou0')}>{t('Cou0')}</option>
                        <option value={t('Cou1')}>{t('Cou1')}</option>
                        <option value={t('Cou2')}>{t('Cou2')}</option>
                        <option value={t('Cou3')}>{t('Cou3')}</option>
                        <option value={t('Cou4')}>{t('Cou4')}</option>
                        <option value={t('Cou5')}>{t('Cou5')}</option>
                        <option value={t('Cou6')}>{t('Cou6')}</option>
                        <option value={t('Cou7')}>{t('Cou7')}</option>
                        <option value={t('Cou8')}>{t('Cou8')}</option>
                        <option value={t('Cou9')}>{t('Cou9')}</option>
                        <option value={t('Cou10')}>{t('Cou10')}</option>
                        <option value={t('Cou11')}>{t('Cou11')}</option>
                        <option value={t('Cou12')}>{t('Cou12')}</option>
                        <option value={t('Cou13')}>{t('Cou13')}</option>
                        <option value={t('Cou14')}>{t('Cou14')}</option>
                        <option value={t('Cou15')}>{t('Cou15')}</option>
                        <option value={t('Cou16')}>{t('Cou16')}</option>
                        <option value={t('Cou17')}>{t('Cou17')}</option>
                        <option value={t('Cou18')}>{t('Cou18')}</option>
                        <option value={t('Cou19')}>{t('Cou19')}</option>
                        <option value={t('Cou20')}>{t('Cou20')}</option>
                        <option value={t('Cou21')}>{t('Cou21')}</option>
                        <option value={t('Cou22')}>{t('Cou22')}</option>
                        <option value={t('Cou23')}>{t('Cou23')}</option>
                        <option value={t('Cou24')}>{t('Cou24')}</option>
                        <option value={t('Cou25')}>{t('Cou25')}</option>
                        <option value={t('Cou26')}>{t('Cou26')}</option>
                        <option value={t('Cou27')}>{t('Cou27')}</option>
                        <option value={t('Cou28')}>{t('Cou28')}</option>
                        <option value={t('Cou29')}>{t('Cou29')}</option>
                        <option value={t('Cou30')}>{t('Cou30')}</option>
                        <option value={t('Cou31')}>{t('Cou31')}</option>
                        <option value={t('Cou32')}>{t('Cou32')}</option>
                        <option value={t('Cou34')}>{t('Cou34')}</option>
                        <option value={t('Cou35')}>{t('Cou35')}</option>
                        <option value={t('Cou36')}>{t('Cou36')}</option>
                        <option value={t('Cou37')}>{t('Cou37')}</option>
                        <option value={t('Cou38')}>{t('Cou38')}</option>
                        <option value={t('Cou39')}>{t('Cou39')}</option>
                        <option value={t('Cou40')}>{t('Cou40')}</option>
                        <option value={t('Cou41')}>{t('Cou41')}</option>
                        <option value={t('Cou42')}>{t('Cou42')}</option>
                        <option value={t('Cou43')}>{t('Cou43')}</option>
                        <option value={t('Cou44')}>{t('Cou44')}</option>
                        <option value={t('Cou45')}>{t('Cou45')}</option>
                        <option value={t('Cou46')}>{t('Cou46')}</option>
                        <option value={t('Cou47')}>{t('Cou47')}</option>
                        <option value={t('Cou48')}>{t('Cou48')}</option>
                        <option value={t('Cou49')}>{t('Cou49')}</option>
                        <option value={t('Cou50')}>{t('Cou50')}</option>
                        <option value={t('Cou51')}>{t('Cou51')}</option>
                        <option value={t('Cou52')}>{t('Cou52')}</option>
                        <option value={t('Cou53')}>{t('Cou53')}</option>
                        <option value={t('Cou54')}>{t('Cou54')}</option>
                        <option value={t('Cou55')}>{t('Cou55')}</option>
                        <option value={t('Cou56')}>{t('Cou56')}</option>
                        <option value={t('Cou57')}>{t('Cou57')}</option>
                        <option value={t('Cou58')}>{t('Cou58')}</option>
                        <option value={t('Cou59')}>{t('Cou59')}</option>
                        <option value={t('Cou60')}>{t('Cou60')}</option>
                        <option value={t('Cou61')}>{t('Cou61')}</option>
                        <option value={t('Cou62')}>{t('Cou62')}</option>
                        <option value={t('Cou63')}>{t('Cou63')}</option>
                        <option value={t('Cou64')}>{t('Cou64')}</option>
                        <option value={t('Cou65')}>{t('Cou65')}</option>
                        <option value={t('Cou66')}>{t('Cou66')}</option>
                        <option value={t('Cou67')}>{t('Cou67')}</option>
                        <option value={t('Cou68')}>{t('Cou68')}</option>
                        <option value={t('Cou69')}>{t('Cou69')}</option>
                        <option value={t('Cou70')}>{t('Cou70')}</option>
                        <option value={t('Cou71')}>{t('Cou71')}</option>
                        <option value={t('Cou72')}>{t('Cou72')}</option>
                        <option value={t('Cou73')}>{t('Cou73')}</option>
                        <option value={t('Cou74')}>{t('Cou74')}</option>
                        <option value={t('Cou75')}>{t('Cou75')}</option>
                        <option value={t('Cou76')}>{t('Cou76')}</option>
                        <option value={t('Cou77')}>{t('Cou77')}</option>
                        <option value={t('Cou78')}>{t('Cou78')}</option>
                        <option value={t('Cou79')}>{t('Cou79')}</option>
                        <option value={t('Cou80')}>{t('Cou80')}</option>
                        <option value={t('Cou81')}>{t('Cou81')}</option>
                        <option value={t('Cou83')}>{t('Cou83')}</option>
                        <option value={t('Cou84')}>{t('Cou84')}</option>
                        <option value={t('Cou85')}>{t('Cou85')}</option>
                        <option value={t('Cou86')}>{t('Cou86')}</option>
                        <option value={t('Cou87')}>{t('Cou87')}</option>
                        <option value={t('Cou88')}>{t('Cou88')}</option>
                        <option value={t('Cou89')}>{t('Cou89')}</option>
                        <option value={t('Cou90')}>{t('Cou90')}</option>
                        <option value={t('Cou91')}>{t('Cou91')}</option>
                        <option value={t('Cou92')}>{t('Cou92')}</option>
                        <option value={t('Cou93')}>{t('Cou93')}</option>
                        <option value={t('Cou94')}>{t('Cou94')}</option>
                        <option value={t('Cou95')}>{t('Cou95')}</option>
                        <option value={t('Cou96')}>{t('Cou96')}</option>
                        <option value={t('Cou97')}>{t('Cou97')}</option>
                        <option value={t('Cou98')}>{t('Cou98')}</option>
                        <option value={t('Cou99')}>{t('Cou99')}</option>
                        <option value={t('Cou100')}>{t('Cou100')}</option>
                        <option value={t('Cou101')}>{t('Cou101')}</option>
                        <option value={t('Cou102')}>{t('Cou102')}</option>
                        <option value={t('Cou103')}>{t('Cou103')}</option>
                        <option value={t('Cou104')}>{t('Cou104')}</option>
                        <option value={t('Cou105')}>{t('Cou105')}</option>
                        <option value={t('Cou106')}>{t('Cou106')}</option>
                        <option value={t('Cou107')}>{t('Cou107')}</option>
                        <option value={t('Cou108')}>{t('Cou108')}</option>
                        <option value={t('Cou109')}>{t('Cou109')}</option>
                        <option value={t('Cou110')}>{t('Cou110')}</option>
                        <option value={t('Cou111')}>{t('Cou111')}</option>
                        <option value={t('Cou112')}>{t('Cou112')}</option>
                        <option value={t('Cou113')}>{t('Cou113')}</option>
                        <option value={t('Cou114')}>{t('Cou114')}</option>
                        <option value={t('Cou115')}>{t('Cou115')}</option>
                        <option value={t('Cou116')}>{t('Cou116')}</option>
                        <option value={t('Cou117')}>{t('Cou117')}</option>
                        <option value={t('Cou118')}>{t('Cou118')}</option>
                        <option value={t('Cou119')}>{t('Cou119')}</option>
                        <option value={t('Cou120')}>{t('Cou120')}</option>
                        <option value={t('Cou121')}>{t('Cou121')}</option>
                        <option value={t('Cou122')}>{t('Cou122')}</option>
                        <option value={t('Cou123')}>{t('Cou123')}</option>
                        <option value={t('Cou124')}>{t('Cou124')}</option>
                        <option value={t('Cou125')}>{t('Cou125')}</option>
                        <option value={t('Cou126')}>{t('Cou126')}</option>
                        <option value={t('Cou127')}>{t('Cou127')}</option>
                        <option value={t('Cou128')}>{t('Cou128')}</option>
                        <option value={t('Cou129')}>{t('Cou129')}</option>
                        <option value={t('Cou130')}>{t('Cou130')}</option>
                        <option value={t('Cou131')}>{t('Cou131')}</option>
                        <option value={t('Cou132')}>{t('Cou132')}</option>
                        <option value={t('Cou133')}>{t('Cou133')}</option>
                        <option value={t('Cou134')}>{t('Cou134')}</option>
                        <option value={t('Cou135')}>{t('Cou135')}</option>
                        <option value={t('Cou136')}>{t('Cou136')}</option>
                        <option value={t('Cou137')}>{t('Cou137')}</option>
                        <option value={t('Cou138')}>{t('Cou138')}</option>
                        <option value={t('Cou139')}>{t('Cou139')}</option>
                        <option value={t('Cou140')}>{t('Cou140')}</option>
                        <option value={t('Cou141')}>{t('Cou141')}</option>
                        <option value={t('Cou142')}>{t('Cou142')}</option>
                        <option value={t('Cou143')}>{t('Cou143')}</option>
                        <option value={t('Cou144')}>{t('Cou144')}</option>
                        <option value={t('Cou145')}>{t('Cou145')}</option>
                        <option value={t('Cou146')}>{t('Cou146')}</option>
                        <option value={t('Cou147')}>{t('Cou147')}</option>
                        <option value={t('Cou148')}>{t('Cou148')}</option>
                        <option value={t('Cou149')}>{t('Cou149')}</option>
                        <option value={t('Cou150')}>{t('Cou150')}</option>
                        <option value={t('Cou151')}>{t('Cou151')}</option>
                        <option value={t('Cou152')}>{t('Cou152')}</option>
                        <option value={t('Cou153')}>{t('Cou153')}</option>
                        <option value={t('Cou154')}>{t('Cou154')}</option>
                        <option value={t('Cou155')}>{t('Cou155')}</option>
                        <option value={t('Cou156')}>{t('Cou156')}</option>
                        <option value={t('Cou157')}>{t('Cou157')}</option>
                        <option value={t('Cou158')}>{t('Cou158')}</option>
                        <option value={t('Cou159')}>{t('Cou159')}</option>
                        <option value={t('Cou160')}>{t('Cou160')}</option>
                        <option value={t('Cou161')}>{t('Cou161')}</option>
                        <option value={t('Cou162')}>{t('Cou162')}</option>
                        <option value={t('Cou163')}>{t('Cou163')}</option>
                        <option value={t('Cou164')}>{t('Cou164')}</option>
                        <option value={t('Cou165')}>{t('Cou165')}</option>
                        <option value={t('Cou166')}>{t('Cou166')}</option>
                        <option value={t('Cou167')}>{t('Cou167')}</option>
                        <option value={t('Cou168')}>{t('Cou168')}</option>
                        <option value={t('Cou169')}>{t('Cou169')}</option>
                        <option value={t('Cou170')}>{t('Cou170')}</option>
                        <option value={t('Cou171')}>{t('Cou171')}</option>
                        <option value={t('Cou172')}>{t('Cou172')}</option>
                        <option value={t('Cou173')}>{t('Cou173')}</option>
                        <option value={t('Cou174')}>{t('Cou174')}</option>
                        <option value={t('Cou175')}>{t('Cou175')}</option>
                        <option value={t('Cou176')}>{t('Cou176')}</option>
                        <option value={t('Cou177')}>{t('Cou177')}</option>
                        <option value={t('Cou178')}>{t('Cou178')}</option>
                        <option value={t('Cou179')}>{t('Cou179')}</option>
                        <option value={t('Cou180')}>{t('Cou180')}</option>
                        <option value={t('Cou181')}>{t('Cou181')}</option>
                        <option value={t('Cou182')}>{t('Cou182')}</option>
                        <option value={t('Cou183')}>{t('Cou183')}</option>
                        <option value={t('Cou184')}>{t('Cou184')}</option>
                        <option value={t('Cou185')}>{t('Cou185')}</option>
                        <option value={t('Cou186')}>{t('Cou186')}</option>
                        <option value={t('Cou187')}>{t('Cou187')}</option>
                        <option value={t('Cou188')}>{t('Cou188')}</option>
                        <option value={t('Cou189')}>{t('Cou189')}</option>
                        <option value={t('Cou190')}>{t('Cou190')}</option>
                        <option value={t('Cou191')}>{t('Cou191')}</option>
                        <option value={t('Cou192')}>{t('Cou192')}</option>
                    </select>
                </label>
                    </div>
                    <div className="row">
                <label className="form-label col-sm-6">{t('PlaceOfIssue')}<span>*</span>
                        <input className={PlaceOfIssue.isDirty&&PlaceOfIssue.isEmpty?"input_w600-error":"input_w600"}onChange={e=>PlaceOfIssue.onChange(e)} onBlur={e=>PlaceOfIssue.onBlur(e)} value={PlaceOfIssue.value}  name="PlaceOfIssue" maxLength="200" />
                        {(PlaceOfIssue.isDirty&&PlaceOfIssue.isEmpty)&&<div style={{color:'red'}}> {t('PlaceOfIssueErrorEmpty')}</div>}
                </label>
                <label className="form-label col-sm-3">{t('DataOfIssue')}<span >*</span>
                        <input className={date_of_issue.isDirty&&(date_of_issue.inputData||date_of_issue.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_issue.onChange(e)} onBlur={e=>date_of_issue.onBlur(e)} value={date_of_issue.value}  name="date_of_issue" placeholder={t('DataInp')} maxLength="10" />
                        {(date_of_issue.isDirty&&date_of_issue.isEmpty)&&<div style={{color:'red'}}> {t('DataOfIssueErrorEmpty')}</div>}
                        {(date_of_issue.isDirty&&date_of_issue.inputData&&!date_of_issue.isEmpty)&&<div style={{color:'red'}}>{t('DataOfIssueError')}</div>}

                </label>
                <label className="form-label col-sm-3">{t('DateOfExiry')}<span >*</span>
                        <input className={date_of_expiry.isDirty&&(date_of_expiry.inputData||date_of_expiry.isEmpty)?"input_w295-error":"input_w295"} onChange={e=>date_of_expiry.onChange(e)} onBlur={e=>date_of_expiry.onBlur(e)} value={date_of_expiry.value}  name="date_of_expiry" placeholder={t('DataInp')} maxLength="10"/>
                        {(date_of_expiry.isDirty&&date_of_expiry.isEmpty)&&<div style={{color:'red'}}>  {t('DateOfExiryErrorEmpty')}</div>}
                        {(date_of_expiry.isDirty&&date_of_expiry.inputData&&!date_of_expiry.isEmpty)&&<div style={{color:'red'}}> {t('DateOfExiryError')}</div>}

                </label>
                    </div>
                    <div className="row">
                        <label className="form-label w-100">{t('NatPassw')}<span >*</span>
                                <input className={NatPassw.isDirty&&NatPassw.isEmpty?"input_w1210-error":"input_w1210"} onChange={e=>NatPassw.onChange(e)} onBlur={e=>NatPassw.onBlur(e)} value={NatPassw.value}  name="NatPassw" maxLength="100" />
                                {(NatPassw.isDirty&&NatPassw.isEmpty)&&<div style={{color:'red'}}>  {t('PassNumberErrorEmpty')}</div>}
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
                    <label className="form-label col-sm">{t('DataOfIssueEdu')}<span ></span>
                        <input className={(edu_date_of_issue.isDirty&&edu_date_of_issue.inputData&&!edu_date_of_issue.isEmpty)?"input_w600-error":"input_w600"} onChange={e=>edu_date_of_issue.onChange(e)} onBlur={e=>edu_date_of_issue.onBlur(e)} value={edu_date_of_issue.value} name="edu_date_of_issue" maxLength="10" placeholder={t('DataInp')} />
                        {(edu_date_of_issue.isDirty&&edu_date_of_issue.inputData&&!edu_date_of_issue.isEmpty)&&<div style={{color:'red'}}>{t('DataOfIssueEduError')}</div>}
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
                        <optgroup label={t('FacName2')}>
                            <option value={t('Fac10')}>{t('Fac10')}</option>
                            <option value={t('Fac11')}>{t('Fac11')}</option>
                            <option value={t('Fac12')}>{t('Fac12')}</option>
                            <option value={t('Fac13')}>{t('Fac13')}</option>
                            <option value={t('Fac15')}>{t('Fac15')}</option>
                            <option value={t('Fac16')}>{t('Fac16')}</option>
                        </optgroup>
                    </select></label>
                    <label className="form-label w-200">{t('HostelLive')}
                        <select className="select_w1210"  onChange={e=>HostelLive.onChange(e)} onBlur={e=>HostelLive.onBlur(e)} value={HostelLive.value} name="edu_name" maxLength="150"  >
                        <option value='1'></option>
                        <option value={t('HostelLiveNo')}>{t('HostelLiveNo')}</option>
                        <option value={t('HostelLiveYes')}>{t('HostelLiveYes')}</option>

                        </select>
                        </label>
                    <hr/>    

<legend className="text-center">{t('AddDoc')}</legend>
                <div className="row">
                    <label  className="typeFiles">{t('TypeFiles')}
                    </label>
                </div>
                <div className="row">
                    <label  className="form-label w-200">{t('AddFile1')}
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile2')}
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile3')}
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile4')}
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile5')}
                    </label>
                </div>
                <div className="row">
                    <label className="form-label w-200">{t('AddFile6')}
                    </label>
                </div>
                <div className="row" >
                    <label className="form-label w-200">{t('AddFile7')}
                    <div align="center">
                    </div >     
                    </label>
                </div>
                    <legend className="text-center"> 
                            <div className="wrapper">
                                <div className={`form-drag${dragActive?"2":""}`}
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleLeave}
                                    onDrop={handleDrop}
                                    onReset={handleReset}
                                    onSubmit={handleSubmit}>
                                        <h1>{t('AttFile')}</h1>
                                                <label className="btn-9">
                                                    <span className="span-drag">{t('DowFile')}</span>
                                                        <input type="file" 
                                                        accept=".jpg, .jpeg, .pdf" 
                                                        className="input_drag" 
                                                        multiple={true} 
                                                        onChange={handleChange}/>
                                                </label>
                                                
                                                {oldFiles && oldFiles.length > 0&&(
                                                        <>
                                                        <ul className="file-list">
                                                        {oldFiles.map((name,id, oldFiles) => (
                                                            <li key={id}>{name}
                                                                <button className="file-uploader__remove-button" type="reset" onClick={(e) => handleResetOld(e, id )}></button>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    </>
                                                    )}
                                                {files&&files.length>0&&(
                                                    <>                          
                                                        <ul className="file-list">
                                                        {files.map(({name},id)=>(   
                                                            <li key={id}>{name}  
                                                                <button className="file-uploader__remove-button" type="reset" onClick={(e) => handleReset(e, id)}></button>
                                                            </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                        )}
                                </div> 
                            </div>      
                        </legend>
                    <hr/>
                    <div className="customText">{t('WarningMessageOne')}</div>
                    <div className="customText">{t('WarningMessageTwo')}</div>
                    <div className="customText">{t('WarningMessageThree')}</div>
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
                        <label htmlFor="prform_chbx_4">Нуждаюсь в общежитии</label>
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
                </div>*/}
                <div >
                    <input  id="agreement" className="custom-radio" onChange={e=>DD.onChange(e)} onBlur={e=>DD.onBlur(e)} checked={DD.checked} name="DD"type="checkbox"></input>
<label htmlFor="agreement" >{t('DD')}</label>
                </div>
                <div align ="center" >
                    <button disabled={(HostelLive.value=='1')||(surnamerus.isRus||surnamerus.isEmpty)||(namerus.isEmpty||namerus.isRus)||(name.isEmpty||name.isEng)||(surname.isEng||surname.isEmpty)||(date_of_expiry.isEmpty||date_of_expiry.inputData)||(date_of_birth.inputData||date_of_birth.isEmpty)||settlement_name.isEmpty||number.isEmpty||(date_of_issue.isEmpty||date_of_issue.inputData)||(mobile_tel.isEmpty||mobile_tel.ismobileNum)||(email.isemailCheck||email.isEmpty)||PlaceOfIssue.isEmpty||!DD.checked}
                    onClick={handleClick}
                        type="submit" className="glow-button" >{t('ButtonUpload')}</button>     
                    </div>
        </form>
        </div>
    )
  }
  export default Anketa