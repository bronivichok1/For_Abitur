import ButtonForNavigate from '../components/ButtonForNavigate'
import { useTranslation } from 'react-i18next';

 function Home() {
  const { t, i18n } = useTranslation()
  return ( 
    <div >
      <main>
        <div align="right"className="row">
            <button className="btn-3 btn-sep icon-send" value="ru" onClick={(event) => { event.preventDefault(); i18n.changeLanguage('ru'); }}>RU</button>
            <button className="btn-11 btn-sep icon-send" value="en" onClick={(event) => { event.preventDefault(); i18n.changeLanguage('en'); }}>EN</button>
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