import PassportForm from '../components/PassportForm';
import "../style/Anketa.css"
import AdressData from '../components/AdressData';
import Education from '../components/Education';
import AdmissionInfo from '../components/AdmissionInfo';
import WorkInfo from '../components/WorkInfo';
import Family from '../components/Family'
import Awards from '../components/Awards';
import Points from '../components/Points';

function Anketa() {

    return (
        <body>  
            <PassportForm/>
            <AdressData/>
            <Education/>
            <AdmissionInfo/>
            <WorkInfo/>
            <Family/>
            <Awards/>
            <Points/>
            <button type="submit" class="btn btn-outline-primary btn-lg">Отправить</button>
        </body>
    )
  }
  export default Anketa