import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Anketa from './pages/Anketa';
import ForRead from './pages/ForRead';
import EditOrDelete from './pages/EditOrDelete';
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";

function App() {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="FillData" element={<Anketa/>} />
              <Route path="FindData" element={<ForRead/>} />
              <Route path="FindData/FillData" element={<Anketa/>} />
              <Route path="Drop" element={<EditOrDelete/>} />
            </Routes>
            <ToastContainer/>
          </BrowserRouter>   
  )
}

export default App
