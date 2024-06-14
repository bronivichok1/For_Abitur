import ButtonForNavigate from '../components/ButtonForNavigate'
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';
import { ForLan } from '../data/DataForInput';

 function Home() {
  const [lan,setLan]=useState(ForLan.lan)
  const { t, i18n } = useTranslation()

  const handleToggleChange = () => {
    ForLan.lan=!lan;
    setLan(!lan);
  };
  useEffect(()=>{
      if(lan==true){
        i18n.changeLanguage('en');

      }
      else{
        i18n.changeLanguage('ru');
      }
},[lan])

  return ( 
    <div >
      <main>
      <div className="btn-container">
            <label className="switch btn-color-mode-switch">
                <input checked={ForLan.lan} id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
                <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" htmlFor="color_mode" ></label>
            </label>
        </div>
        <div align="center">
          <ButtonForNavigate title={t('But1')} adress='FillData' style="btn btn-1 btn-sep icon-info"/>
          <ButtonForNavigate title={t('But2')} adress='FindData' style="btn btn-4 btn-sep icon-send"/>
        </div>
      </main>
    </div>
  )
}
export default Home