import "../style/Form.css"


export default function AdressData(){

    return(
            <fieldset>
            <legend class="text-center">Адрес места жительства в соответствии со штампом о регистрации, контактные данные</legend>
                <div class="row">
                    <label class="form-label col-sm-4">Почтовый индекс<input class="form-control " name="postcode" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-8">Страна<select class="form-select " name="country">
                        <option value="0">Республика Беларусь</option>
                        <option value="1">Российская Федерация</option>
                        <option value="2">Республика Казахстан</option>
                        <option value="3">Республика Таджикистан</option>
                        <option value="4">Кыргызская Республика</option>
                    </select></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Область<select class="form-select " name="region">
                        <option value="1">г. Минск</option>
                        <option value="2">Брестская область</option>
                        <option value="3">Витебская область</option>
                        <option value="4">Гродненская область</option>
                        <option value="5">Гомельская область</option>
                        <option value="6">Минская область</option>
                        <option value="7">Могилевская область</option>
                    </select><input class="form-control d-none " name="region" maxlength="50" value="" disabled/></label>
                    <label class="form-label col-sm">Район<input class="form-control " name="area" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Тип насел. пункта<select class="form-select " name="settlement_type">
                        <option value="1">Город</option>
                        <option value="2">Городской поселок</option>
                        <option value="3">Агрогородок</option>
                        <option value="4">Поселок</option>
                        <option value="5">Деревня</option>
                        <option value="6">иное</option>
                    </select></label>
                    <label class="form-label col-sm">Населенный пункт<input class="form-control " name="settlement_name" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-4">Микрорайон<input class="form-control " name="district" maxlength="50" value=""/></label>
                    <label class="form-label col-sm-3">Тип улицы<select class="form-select " name="street_type">
                        <option value="1">улица</option>
                        <option value="2">проспект</option>
                        <option value="3">бульвар</option>
                        <option value="4">проезд</option>
                        <option value="5">тупик</option>
                        <option value="6">площадь</option>
                        <option value="7">переулок</option>
                        <option value="9">микрорайон</option>
                        <option value="8">иное (указать в названии)</option>
                    </select></label>
                    <label class="form-label col-sm-5">Название улицы<input class="form-control " name="street_name" maxlength="50" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm-2">Дом<input class="form-control " name="building" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-2">Корпус<input class="form-control " name="housing" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-2">Квартира<input class="form-control " name="apartment" maxlength="10" value=""/></label>
                    <label class="form-label col-sm-6">Домашний тел.<input class="form-control " name="stat_tel" placeholder="+375XXXXXXXXX" maxlength="20" value=""/></label>
                </div>
                <div class="row">
                    <label class="form-label col-sm">Мобильный тел.<span >*</span><input class="form-control " name="mobile_tel" maxlength="20" value="+375" required/></label>
                    <label class="form-label col-sm">E-mail<span >*</span><input class="form-control " name="email" maxlength="50" value="" required/></label>
                </div>
                </fieldset>
    )
}