import "../style/Form.css"


export default function Privileges(){

    return(
        <fieldset>
        <legend class="text-center">Льготы</legend>
            <div class="form-check mb-3">
                <input id="pr_chbx_1" class="form-check-input " name="privil[]" type="checkbox" value="18"/>
                <label for="pr_chbx_1" class="form-check-label">Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статья Ч18)</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_2" class="form-check-input " name="privil[]" type="checkbox" value="19-23"/>
                <label for="pr_chbx_2" class="form-check-label">Пострадавший от катастрофы на ЧАЭС, иных рад. аварий (статьи Ч19, Ч20, Ч21, Ч22, Ч23)</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_3" class="form-check-input " name="privil[]" type="checkbox" value="dis"/>
                <label for="pr_chbx_3" class="form-check-label">Ребенок-инвалид, инвалид I, II, III гр.</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_4" class="form-check-input " name="privil[]" type="checkbox" value="nop"/>
                <label for="pr_chbx_4" class="form-check-label">Сирота или ребенок, оставшийся без попечения родителей</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_5" class="form-check-input " name="privil[]" type="checkbox" value="mil"/>
                <label for="pr_chbx_5" class="form-check-label">Ребенок лица, погибшего (получившего ранения, инвалидность) при исполнении воинского долга (служебной обязанности)</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_6" class="form-check-input " name="privil[]" type="checkbox" value="bff"/>
                <label for="pr_chbx_6" class="form-check-label">Из многодетной семьи</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_7" class="form-check-input " name="privil[]" type="checkbox" value="medal"/>
                <label for="pr_chbx_7" class="form-check-label">Имею аттестат с медалью</label>
            </div>
            <div class="form-check mb-3">
                <input id="pr_chbx_8" class="form-check-input " name="privil[]" type="checkbox" value="diplo"/>
                <label for="pr_chbx_8" class="form-check-label">Имею диплом с отличием</label> 
            </div>
        </fieldset>
    )
}