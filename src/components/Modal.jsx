import React from 'react';
import '../style/Modal.css'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Modal=({active,setActive,children})=>{
    const { t } = useTranslation()
    const navigate = useNavigate();            

    const ModalTransfer=(e)=>{
        e.preventDefault()
        navigate("/", { replace: true })
    }
    
return (
<div className={active?"modal active":"modal"} onClick={ModalTransfer}>
    <div className={active?"modal_content active":"modal_content"} onClick={e=>e.stopPropagation() }>
        {children}
        <button className="button_modal" onClick={ModalTransfer}>
            {t('Ready')}
        </button>
    </div>
</div>
);
}

export default Modal;