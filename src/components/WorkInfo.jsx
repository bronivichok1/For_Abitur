import "../style/Form.css"


export default function WorkInfo(){

    return(
    <fieldset>
        <legend class="text-center">Работа и стаж</legend>
        <label class="form-label w-100">Место работы, занимаемая должность (профессия)<input class="form-control " name="exp_position" maxlength="150" value=""/></label>
        <p class="lead">Трудовой стаж по профилю избранной специальности:</p>
        <div class="row">
            <label class="form-label col-sm">Полных лет<input class="form-control " name="exp_years" maxlength="2" value=""/></label>
            <label class="form-label col-sm">Полных месяцев<input class="form-control " name="exp_months" maxlength="2" value=""/></label>
        </div>
    </fieldset>
    )
}