import "../style/Form.css"


export default function PassportForm(props){

    return(
    <form>
        <fieldset>
            <legend>Личные и паспортные данные</legend>
                    <div class="row">
                <label class="form-label col-sm">Фамилия<span>*</span><input class="form-control is-invalid" name="surname" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Фамилия" допустима только кириллица, первая буква - заглавная.
                </div></label> 
                <label class="form-label col-sm">Имя<span>*</span><input class="form-control is-invalid" name="name" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Имя" допустима только кириллица, первая буква - заглавная.
                </div></label>
                <label class="form-label col-sm">Отчество<input class="form-control " name="second_name" maxlength="50" value=""/>
                <div class="invalid-feedback">
                    В поле "Отчество" допустима только кириллица, первая буква - заглавная.
                </div></label>
                    </div>
                    
        </fieldset>
    </form>
    )
}
