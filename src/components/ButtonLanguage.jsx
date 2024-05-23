import React, { useState } from 'react';
import '../style/Button_language.css'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Button_language=()=>{
    const { t, i18n } = useTranslation()
    const {lan,setLan}=useState(false)

    const handleToggleChange = () => {
        setLan(!lan); 
      };

    useEffect(()=>{
        if(lan=true){
            i18n.changeLanguage('ru');
        }else{
            i18n.changeLanguage('en');
        }
    })

return (



<div class="btn-container">
	
<label className="switch btn-color-mode-switch">
    <input value="1" id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
    <label className="btn-color-mode-switch-inner" data-off="AM" data-on="PM" for="color_mode" ></label>
</label>

    </div>
)}
export default Button_language;