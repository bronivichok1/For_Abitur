import "../style/Anketa.css"
import DataForRed from "../components/DataForRed"
import ButtonForNavigate from "../components/ButtonForNavigate"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

function ForRed() {
    const location = useLocation();

    useEffect(() => {
      console.log('Current location is ', location);
    }, [location]);
    return (
        <body>  
            <DataForRed/>
            <ButtonForNavigate title='Далее' adress='FillData'/>
        </body>
    )
  }
  export default ForRed