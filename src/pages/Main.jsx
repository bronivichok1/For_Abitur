import ButtonForNavigate from '../components/ButtonForNavigate'
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';
import { ForLan, edit } from '../data/DataForInput';
import { useLocation } from 'react-router-dom';
import "../style/ButtonForNavigate.css"
 
 function Home() {
  const [lan,setLan]=useState(ForLan.lan)
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [parameter, setParameter] = useState('')
  const [checkLanguage,setCheckLanguage]=useState(true)

  const handleToggleChange = () => {
    ForLan.lan=!lan;
    setLan(!lan);
  };
  
  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('Language');

    if (paramValue) {
        setParameter(paramValue);
      }
    if(checkLanguage===true&&parameter==='en'){
        i18n.changeLanguage('en');
        setLan(true)
        ForLan.lan=true
        setParameter('')
        setCheckLanguage(false)
      }
    if(lan===true){
        i18n.changeLanguage('en');
      }else{
        i18n.changeLanguage('ru');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
},[lan,location.search,parameter,i18n,checkLanguage,edit.Edit])

return ( 
  <div >
    <main>
      <div className="btn-container">
        <label className="switch btn-color-mode-switch">
          <input checked={ForLan.lan} id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
          <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" htmlFor="color_mode" ></label>
        </label>
      </div>
      <div align="center"  /* eslint-disable-next-line*/>
        <ButtonForNavigate title={t('But1')} adress='FillData' style={'btn btn-1 btn-sep'}  /* eslint-disable-next-line*//>
        <ButtonForNavigate title={t('But2')} adress='FindData' style={'btn btn-4 btn-sep'}/>
      </div>
    </main>
  </div>
  )
}
export default Home