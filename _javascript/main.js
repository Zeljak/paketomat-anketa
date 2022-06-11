// Anketa
document.querySelector('#form__submit').addEventListener('click', function(e){
  e.preventDefault();
  
  // Webapp address
  const url = 'https://script.google.com/macros/s/AKfycbyulHrtryQhagONYdr0SSbVQ9pfdEvdxTDqphjW2eV1X1qRXfX3kSLlk-7rKQzkUSo1/exec';

  // Elementi
  const spol = document.querySelectorAll('input[name="spol"]');
  const spolError = document.querySelector('#form__error-msg--spol');
  const spolBorder = document.querySelector('.pitanje_1__wrapper');
  const godine = document.querySelectorAll('input[name="godine"]');
  const godineError = document.querySelector('#form__error-msg--godine');
  const godineBorder = document.querySelector('.pitanje_2__wrapper');
  const paketGdje = document.querySelectorAll('input[name="volis_paket_gdje"]');
  const paketGdjeError = document.querySelector('#form__error-msg--primanje');
  const paketGdjeBorder = document.querySelector('.pitanje_3__wrapper');
  const dostavaVazno = document.querySelectorAll('input[name="kod_dostave_vazno"]');
  const dostavaVaznoError = document.querySelector('#form__error-msg--dostava');
  const dostavaVaznoBorder = document.querySelector('.pitanje_4__wrapper');
  const opisSavrsenogPaketa = document.querySelector('#opis_savrsenog_paketa');
  const opisSavrsenogPaketaError = document.querySelector('#form__error-msg--kandidat');
  const opisSavrsenogPaketaBorder = document.querySelector('.pitanje_5__wrapper');
  const emailUnos = document.querySelector('#email');
  const emailUnosError = document.querySelector('#form__error-msg--email');
  const emailUnosBorder = document.querySelector('.pitanje_6__wrapper');
  const gdpr = document.querySelector('#gdpr');
  const gdprError = document.querySelector('#error-msg');
  const gdprBorder = document.querySelector('.gdpr_checkmark');
  const errorForm = document.querySelector('#form__error-msg--form');

  // Funkcije validacija
  function validateCheckbox(checkboxName, errorMessage, errorBorder) {
    if (checkboxName.checked) {
      errorMessage.classList.add('is-hidden');
      errorBorder.classList.remove('error_border_box');
      return true;
    } else {
      errorMessage.classList.remove('is-hidden');
      errorBorder.classList.add('error_border_box');
      return false;
    }
  }

  function validateRadioButton(buttonName, errorMessage, errorBorder) {
    let validity = false;
    buttonName.forEach(question => {
      if (question.checked) {
        validity = true;
      }
    });
    if (validity) {
      errorMessage.classList.add('is-hidden');
      errorBorder.classList.remove('error_border');
    } else {
      errorMessage.classList.remove('is-hidden');
      errorBorder.classList.add('error_border');
    }
    return validity;
  }

  function validateTextArea(areaName, errorMessage, errorBorder) {
    if (areaName.value != '') {
      errorMessage.classList.add('is-hidden');
      errorBorder.classList.remove('error_border');
      return true;
    } else {
      errorMessage.classList.remove('is-hidden');
      errorBorder.classList.add('error_border');
      return false;
    }
  }

  function validateEmail(emailInput, errorMessage, errorBorder) {
    const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailInput.value.match(mailformat)) {
      errorMessage.classList.add('is-hidden');
      errorBorder.classList.remove('error_border');
      return true;
    } else {
      errorMessage.classList.remove('is-hidden');
      errorBorder.classList.add('error_border');
      return false;
    }
  }
  
  // Validacija i slanje
  if (validateRadioButton(spol, spolError, spolBorder) &&
  validateRadioButton(godine, godineError, godineBorder) &&
  validateRadioButton(paketGdje, paketGdjeError, paketGdjeBorder) &&
  validateRadioButton(dostavaVazno, dostavaVaznoError, dostavaVaznoBorder) &&
  validateTextArea(opisSavrsenogPaketa, opisSavrsenogPaketaError, opisSavrsenogPaketaBorder) &&
  validateEmail(emailUnos, emailUnosError, emailUnosBorder) &&
  validateCheckbox(gdpr, gdprError, gdprBorder)
  ) {
    // Loading indicator on
    document.querySelector('#loading-indicator').classList.remove('is-hidden');
    
    fetch(url,{
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: $('form#paketomat_obrazac').serializeJSON()
      })
        .then(document.querySelector('#loading-indicator').classList.add('is-hidden'))
        .then(document.querySelector('.response-msg-wrapper').classList.remove('is-hidden'))
        .then(document.querySelector('#response-msg').classList.remove('is-hidden'));
    
    // Error form off
    errorForm.classList.add('is-hidden');
    // Submit button off
    document.querySelector('#form__submit').classList.add('is-hidden');
  } else {
    console.log('Something not checked');
    validateRadioButton(spol, spolError, spolBorder);
    validateRadioButton(godine, godineError, godineBorder);
    validateRadioButton(paketGdje, paketGdjeError, paketGdjeBorder);
    validateRadioButton(dostavaVazno, dostavaVaznoError, dostavaVaznoBorder);
    validateTextArea(opisSavrsenogPaketa, opisSavrsenogPaketaError, opisSavrsenogPaketaBorder);
    validateEmail(emailUnos, emailUnosError, emailUnosBorder);
    validateCheckbox(gdpr, gdprError, gdprBorder);

    // Error form on
    errorForm.classList.remove('is-hidden');
  }


  

  // fetch(url,{
  //   method: 'POST',
  //   mode: 'no-cors',
  //   cache: 'no-cache',
  //   headers: {
  //   'Content-Type': 'application/json'
  //   },
  //   redirect: 'follow',
  //   referrerPolicy: 'no-referrer',
  //   body: $('form#paketomat_obrazac').serializeJSON()
  // })
  //   .then(document.querySelector('#loading-indicator').classList.add('is-hidden'))
  //   .then(document.querySelector('#response-msg').classList.remove('is-hidden'));

  // if( document.getElementById('ime').value != '' &&
  //     document.getElementById('prezime').value != '' &&
  //     (document.getElementById('dolazim').checked || document.getElementById('ne_dolazim').checked) &&
  //     (document.getElementById('gdpr').checked)
  // ) {

  //     document.querySelector('#submit-form').classList.add('is-hidden');
  //     document.querySelector('#error-msg').classList.add('is-hidden');
  //     document.querySelector('#loading-indicator').classList.remove('is-hidden');

  //     document.getElementById('ime').classList.remove('error_ime');
  //     document.getElementById('prezime').classList.remove('error_prezime');
  //     document.querySelector('.error_ime__message').classList.add('is-hidden');
  //     document.querySelector('.error_prezime__message').classList.add('is-hidden');
  //     document.querySelector('.error__labels__dolazak').classList.remove('error_dolazak');
  //     document.querySelector('.error_dolazak__message').classList.add('is-hidden');
  //     document.querySelector('.error__gdpr__wrapper').classList.remove('error_gdpr');
  //     document.querySelector('.error__gdpr__message').classList.add('is-hidden');

  //     fetch(url,{
  //       method: 'POST',
  //       mode: 'no-cors',
  //       cache: 'no-cache',
  //       headers: {
  //       'Content-Type': 'application/json'
  //       },
  //       redirect: 'follow',
  //       referrerPolicy: 'no-referrer',
  //       body: $('form#HOF_obrazac').serializeJSON()
  //     })
  //       .then(document.querySelector('#loading-indicator').classList.add('is-hidden'))
  //       .then(document.querySelector('#response-msg').classList.remove('is-hidden'));
        
  // } else {
  //   document.querySelector('#error-msg').classList.remove('is-hidden');

  //   if (document.getElementById('ime').value == '') {
  //     document.getElementById('ime').classList.add('error_ime');
  //     document.querySelector('.error_ime__message').classList.remove('is-hidden');
  //   } else {
  //     document.getElementById('ime').classList.remove('error_ime');
  //     document.querySelector('.error_ime__message').classList.add('is-hidden');
  //   };

  //   if (document.getElementById('prezime').value == '') {
  //     document.getElementById('prezime').classList.add('error_prezime');
  //     document.querySelector('.error_prezime__message').classList.remove('is-hidden');
  //   } else {
  //     document.getElementById('prezime').classList.remove('error_prezime');
  //     document.querySelector('.error_prezime__message').classList.add('is-hidden');
  //   };

  //   if (!(document.getElementById('dolazim').checked) && !(document.getElementById('ne_dolazim').checked)) {
  //     document.querySelector('.error__labels__dolazak').classList.add('error_dolazak');
  //     document.querySelector('.error_dolazak__message').classList.remove('is-hidden');
  //   } else {
  //     document.querySelector('.error__labels__dolazak').classList.remove('error_dolazak');
  //     document.querySelector('.error_dolazak__message').classList.add('is-hidden');
  //   };

  //   if (!(document.getElementById('gdpr').checked)) {
  //     document.querySelector('.error__gdpr__wrapper').classList.add('error_gdpr');
  //     document.querySelector('.error__gdpr__message').classList.remove('is-hidden');
  //   } else {
  //     document.querySelector('.error__gdpr__wrapper').classList.remove('error_gdpr');
  //     document.querySelector('.error__gdpr__message').classList.add('is-hidden');
  //   };
  // }

});