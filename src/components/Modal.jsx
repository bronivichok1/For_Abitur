import React from 'react';
import '../style/Modal.css'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const Modal=({active,setActive,children})=>{
    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    
return (
<div className={active?"modal active":"modal"} onClick={()=>navigate("/", { replace: false })
}>
    <div className={active?"modal_content active":"modal_content"} onClick={e=>e.stopPropagation() }>
        {children}
        <button className="button_modal" onClick={()=>navigate("/", { replace: false })
}>{t('Ready')}</button>

    </div>
</div>


);

}
export default Modal;