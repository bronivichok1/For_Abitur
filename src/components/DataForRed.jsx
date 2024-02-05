import "../style/Form.css"


export default function DataForRed(){

    return(
    <body class="bg-light"><form class="form-signin" method="post">
        <p class="lead">Введите данные документа:</p>
        <label class="form-label w-100">Серия<input class="form-control " name="serial" maxlength="15" value=""/>
        <div class="invalid-feedback">
                Неверная серия.
        </div></label>
        <label class="form-label w-100">Номер<input class="form-control " name="number" maxlength="15" value="" required/>
        <div class="invalid-feedback">
                Неверный номер.
        </div></label>
        <label class="form-label w-100">Дата выдачи<input class="form-control " name="date_of_issue" placeholder="дд.мм.гггг" maxlength="10" value="" required/>
        <div class="invalid-feedback">
                Неверная дата выдачи.
        </div></label>
        </form>
    </body>
    )
}