import { useNavigate } from 'react-router-dom';
import "../style/ButtonForNavigate.css"
export default function ButtonForNavigate(props){
  const navigate = useNavigate();

    return(
      <div class="container">
            <button disabled={props.off} className={props.style}  id="submit" onClick={props.function&&(() => navigate(props.adress, { replace: false }))}>
            <p>{props.title}</p>
            </button>
      </div>

    )
}

