import "../style/Form.css"


export default function Family(){

    return(
<fieldset>
<legend class="text-center">Родители</legend>
	<p class="lead">Отец</p>
    <div class="row">
		<label class="form-label col-sm">Фамилия<input class="form-control " name="father_surname" maxlength="50" value=""/></label>
		<label class="form-label col-sm">Имя<input class="form-control " name="father_name" maxlength="50" value=""/></label> 
		<label class="form-label col-sm">Отчество<input class="form-control " name="father_second_name" maxlength="50" value=""/></label>
    </div>
    <label class="form-label w-100">Место работы<input class="form-control " name="father_job" maxlength="150" value=""/></label>
    <div class="row">
		<label class="form-label col-sm">Должность<input class="form-control " name="father_position" maxlength="50" value=""/></label>
		<label class="form-label col-sm">Моб. телефон<input class="form-control " name="father_phone" maxlength="50" value=""/></label>
    </div>
		<label class="form-label w-100">Полный адрес<input class="form-control " name="father_address" maxlength="150" value=""/></label>
	<p class="lead">Мать</p>
    <div class="row">
		<label class="form-label col-sm">Фамилия<input class="form-control " name="mother_surname" maxlength="50" value=""/></label>
		<label class="form-label col-sm">Имя<input class="form-control " name="mother_name" maxlength="50" value=""/></label> 
		<label class="form-label col-sm">Отчество<input class="form-control " name="mother_second_name" maxlength="50" value=""/></label>
    </div>
    <label class="form-label w-100">Место работы<input class="form-control " name="mother_job" maxlength="150" value=""/></label>
    <div class="row">
		<label class="form-label col-sm">Должность<input class="form-control " name="mother_position" maxlength="50" value=""/></label>
		<label class="form-label col-sm">Моб. телефон<input class="form-control " name="mother_phone" maxlength="50" value=""/></label>
    </div>
		<label class="form-label w-100">Полный адрес<input class="form-control " name="mother_address" maxlength="150" value=""/></label>
</fieldset>
    )
}