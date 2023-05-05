import { Link } from "react-router-dom"
function Test(){
    (() => {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
          }, false)
        })

      })()
    return(
      <><div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="RadioDefault1"/>
          <label class="form-check-label" for="RadioDefault1">
            Default radio
          </label>
        </div><div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
            <label class="form-check-label" for="flexRadioDefault2">
              Default checked radio
            </label>
          </div></>
    )
}


export default Test