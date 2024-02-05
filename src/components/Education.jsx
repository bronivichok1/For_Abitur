import "../style/Form.css"


export default function Education(){

    return(
    <fieldset>
    <legend class="text-center">Образование, сведения документа об образовании</legend>
            <label class="form-label w-100">Название УО<span ></span><input class="form-control " name="edu_name" maxlength="150" value="" required/></label>
        <div class="row">
            <label class="form-label col-sm">Серия Номер<span ></span><input class="form-control " name="edu_serial_number" maxlength="20" value="" required/></label>
            <label class="form-label col-sm">Дата выдачи<span ></span><input class="form-control " name="edu_date_of_issue" maxlength="10" placeholder="дд.мм.гггг" value="" required/></label>
        </div>
        <div class="row">
            <label class="form-label col-sm">Средний балл<span ></span><input class="form-control " name="edu_average" maxlength="3" value="" required/></label>
            <label class="form-label col-sm">Иностранный язык<span></span><select class="form-select " name="edu_foreign_lang" required>
                <option value="1">Английский</option>
                <option value="2">Немецкий</option>
                <option value="3">Французcкий</option>
                <option value="4">Итальянский</option>
                <option value="5">Испанский</option>
                <option value="6">Китайский</option>
                <option value="7">другой</option>
            </select></label>
        </div>
    </fieldset>
    )
}