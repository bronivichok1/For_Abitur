import "../style/Form.css"


export default function Awards(){

    return(
    <fieldset>
    <legend class="text-center">Награды по предметам</legend>
        <div class="row">
            <label class="form-label col-lg">Язык<select class="form-select " name="awards_lang">
                <option value="0">Нет наград</option>
                <option value="1">Международная I cт.</option>
                <option value="2">Международная II cт.</option>
                <option value="3">Международная III cт.</option>
                <option value="4">Республиканская I cт.</option>
                <option value="5">Республиканская II cт.</option>
                <option value="6">Республиканская III cт.</option>
                <option value="7">Областная (Минск. гор.) I cт.</option>
                <option value="9">Лауреат СФП РБ по предмету</option>
            </select></label>
            <label class="form-label col-lg">Химия<select class="form-select " name="awards_chem">
                <option value="0">Нет наград</option>
                <option value="1">Международная I cт.</option>
                <option value="2">Международная II cт.</option>
                <option value="3">Международная III cт.</option>
                <option value="4">Республиканская I cт.</option>
                <option value="5">Республиканская II cт.</option>
                <option value="6">Республиканская III cт.</option>
                <option value="7">Областная (Минск. гор.) I cт.</option>
                <option value="9">Лауреат СФП РБ по предмету</option>
            </select></label>
            <label class="form-label col-lg">Биология<select class="form-select " name="awards_biol">
                <option value="0">Нет наград</option>
                <option value="1">Международная I cт.</option>
                <option value="2">Международная II cт.</option>
                <option value="3">Международная III cт.</option>
                <option value="4">Республиканская I cт.</option>
                <option value="5">Республиканская II cт.</option>
                <option value="6">Республиканская III cт.</option>
                <option value="7">Областная (Минск. гор.) I cт.</option>
                <option value="8">Диплом с отличием медколледжа</option>
                <option value="9">Лауреат СФП РБ по предмету</option>
            </select></label>
        </div>
    </fieldset>
    )
}