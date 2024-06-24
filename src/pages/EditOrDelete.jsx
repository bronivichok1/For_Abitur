import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {ForLan,dataEdit,edit} from '../data/DataForInput'
import { useEffect, useState  } from 'react'
import "../style/Anketa.css"
import "../style/ButtonForNavigate.css"
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';

function EditOrDelete() {

const navigate = useNavigate();
const { t, i18n } = useTranslation()
const [lan,setLan]=useState(ForLan.lan)
const [ButtonDrop,setButtonDrop]=useState(false)
const PATH = process.env.REACT_APP_PATH;

function sendRequestDrop(method, url, body = null) {
    const headers = {
      'Content-Type': 'application/json'
        }
    return fetch(url, {
      method: method,
      body: body,
      headers:headers
    }).then( response => {
      if (response.ok) {
        sendRequestDropFiles('POST',PATH+'/files/drop/'+dataEdit.id)

      }else{
        throw  toast.error(t('ErrorIDK'), {
          position: "top-right"
        }); 
    }
  })}
    function sendRequestDropFiles(method, url, body = null) {
        const headers = {
          'Content-Type': 'application/json'
            }
        return fetch(url, {
          method: method,
          body: body,
          headers:headers
        }).then( response => {
          if (response.ok) {
            edit.Edit=false
            navigate("/", { replace: true })    
          }else{
            throw  toast.error(t('ErrorIDK'), {
              position: "top-right"
            }); 
        }
      })}
useEffect(()=>{
    if(lan===true){
        i18n.changeLanguage('en');
    }
    else{
        i18n.changeLanguage('ru');
    }
    if(ButtonDrop===true){
        setButtonDrop(false)
        sendRequestDrop('POST',PATH+'/user/drop/'+dataEdit.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[lan,i18n,ButtonDrop])

function Drop(e) {
        e.preventDefault()
        setButtonDrop(true)
    }

function Edit(e) {
        e.preventDefault()
        navigate("/FillData", { replace: false })
    }

const handleToggleChange = () => {
        ForLan.lan=!lan; 
        setLan(!lan);
    };

return(
<div className="div">
    <div className="btn-container">
        <label className="switch btn-color-mode-switch">
            <input checked={ForLan.lan} id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
            <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" htmlFor="color_mode" ></label>
        </label>
    </div>
    <form>
        <div align ="center" >
            <button 
                onClick={Edit}
                type="submit" className="btn btn_Edit btn-sep">{t('EditFill')}</button>
        </div>
        <div align ="center" >
            <button 
                onClick={Drop}
                type="submit" className="btn btn_Drop btn-sep">{t('DropFill')}</button>
        </div>
    </form>
</div>
)
}export default EditOrDelete