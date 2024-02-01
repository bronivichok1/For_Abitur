import Button from '../components/Button'
import { openInNewTab } from '../providers/OpenAdress';
import { closeInNewTab } from '../providers/CloseAdress';

 function Home() {

  return (
    
    <div >
      <main>
          <div align="center">
                <Button title='Заполнить заявление абитуриента' adress={() => openInNewTab('/Anketa')}/>
                <Button title='Исправить/удалить заявление абитуриента'adress={() => openInNewTab('/Anketa')}/>
        </div>
      </main>
    </div>
  )
}
export default Home