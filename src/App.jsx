import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Anketa from './pages/Anketa';
import ForRead from './pages/ForRead';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="FillData" element={<Anketa/>} />
              <Route path="FindData" element={<ForRead/>} />
              <Route path="FindData/FillData" element={<Anketa/>} />
            </Routes>
            <ToastContainer/>
          </BrowserRouter>   
  )
}

export default App
