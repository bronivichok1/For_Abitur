import Button from '../components/Button'
import { openInNewTab } from '../providers/OpenAdress';
import PassportForm from '../components/PassportForm';
import "../style/Anketa.css"
import AdressData from '../components/AdressData';

function Anketa() {

    return (
        <body>  
            <PassportForm/>
            <AdressData/>
        </body>
    )
  }
  export default Anketa