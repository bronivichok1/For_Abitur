import ButtonForNavigate from '../components/ButtonForNavigate'

 function Home() {
 
  return ( 
    <div >
      <main>
        <div align="center">
          <ButtonForNavigate title='Заполнить заявление абитуриента' adress='FillData' style="btn btn-1 btn-sep icon-info"/>
          <ButtonForNavigate title='Исправить/удалить заявление абитуриента' adress='FindData' style="btn btn-4 btn-sep icon-send"/>
        </div>
      </main>
    </div>
  )
}
export default Home