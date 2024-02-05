import { useNavigate } from 'react-router-dom';
import "../style/ButtonForNavigate.css"
export default function ButtonForNavigate(props){
  const navigate = useNavigate();

    return(
      <div class="container">
            <button class={props.style}  id="submit" onClick={() => navigate(props.adress, { replace: false })}>
            <p>{props.title}</p>
            </button>
      </div>

    )
}

