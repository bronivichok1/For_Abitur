import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Anketa from './pages/Anketa';
import ForRed from './pages/ForRed';
function App() {
  return (

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="FillData" element={<Anketa/>} />
              <Route path="FindData" element={<ForRed/>} />
              <Route path="FindData/FillData" element={<Anketa/>} />
            </Routes>
          </BrowserRouter>
  )
}

export default App
