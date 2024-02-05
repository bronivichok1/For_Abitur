import "../style/Form.css"


export default function Points(){

    return(
    <fieldset>
    <legend class="text-center">ЦТ и баллы</legend>
            <p class="lead">Язык</p>
            <div class="row">
                <label class="form-label col-sm">Серия<input class="form-control " name="cert_lang_serial" maxlength="8" value=""/></label>
                <label class="form-label col-sm">Номер<input class="form-control " name="cert_lang_number" maxlength="7" value=""/></label> 
                <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_lang_score" maxlength="3" value=""/></label>
            </div>
            <p class="lead">Химия</p>
            <div class="row">
                <label class="form-label col-sm">Серия<input class="form-control " name="cert_chem_serial" maxlength="8" value=""/></label>
                <label class="form-label col-sm">Номер<input class="form-control " name="cert_chem_number" maxlength="7" value=""/></label> 
                <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_chem_score" maxlength="3" value=""/></label>
            </div>
            <p class="lead">Биология</p>
            <div class="row">
                <label class="form-label col-sm">Серия<input class="form-control " name="cert_biol_serial" maxlength="8" value=""/></label>
                <label class="form-label col-sm">Номер<input class="form-control " name="cert_biol_number" maxlength="7" value=""/></label> 
                <label class="form-label col-sm-2">Балл<input class="form-control " name="cert_biol_score" maxlength="3" value=""/></label>
            </div>
    </fieldset>
    )
}