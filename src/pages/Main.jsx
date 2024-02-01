import Button from '../components/Button'
import { openInNewTab } from '../providers/OpenAdress';

 function Home() {

  return (
    
    <div >
      <main>
          <div align="center">
                <Button title='Заполнить заявление абитуриента' />
                <Button title='Исправить/удалить заявление абитуриента'/>
        </div>
      </main>
    </div>
  )
}
export default Home