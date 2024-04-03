import { useNavigate } from 'react-router-dom';
import "../style/ButtonForNavigate.css"
export default function ButtonForNavigate(props){
  const navigate = useNavigate();

    return(
      <div class="container">
            <button className={props.style}  id="submit" onClick={() => navigate(props.adress, { replace: false })}>
            <h4>{props.title}</h4>
            </button>
      </div>

    )
}

