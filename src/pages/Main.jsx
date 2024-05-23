import ButtonForNavigate from '../components/ButtonForNavigate'
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';

 function Home() {
  const [lan,setLan]=useState(false)

  const { t, i18n } = useTranslation()
  const handleToggleChange = () => {
    setLan(!lan); // Инвертируем значение lan при каждом изменении состояния переключателя
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
                <input value="1" id="color_mode" name="color_mode" type="checkbox" onChange={handleToggleChange}></input>
                <label className="btn-color-mode-switch-inner" data-off="RUS" data-on="ENG" for="color_mode" ></label>
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