import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Anketa from './pages/Anketa';
 
function App() {
  return (

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="Anketa" element={<Anketa/>} />
            </Routes>
          </BrowserRouter>
  )
}

export default App
