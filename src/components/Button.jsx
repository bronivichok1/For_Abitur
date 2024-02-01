import { openInNewTab } from '../providers/OpenAdress';

export default function Button(props){

    return(
          <p>
            <button className="btn btn-outline-info w-100 mb-2" id="submit" onClick={props.adress} >
              <p >{props.title} </p>
            </button>
          </p>
    )
}