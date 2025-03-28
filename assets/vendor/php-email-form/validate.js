/**
* PHP Email Form Validation - v3.7
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
//         return response.text();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       if (data.trim() == 'OK') {
//         thisForm.querySelector('.sent-message').classList.add('d-block');
//         thisForm.reset(); 
//       } else {
//         throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//       }
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

// })();
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue
  
  let form = event.target;
  let formData = new FormData(form);
  let loadingElement = document.querySelector(".php-email-form .loading");
  loadingElement.style.display = "block";

  // Convierte FormData en un objeto JSON
  let jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  // URL de tu Google Apps Script
  let scriptURL = "https://script.google.com/macros/s/AKfycbz5Bbulwn-wtPVPO9wtAsTwQkGRo8ExWfqpTPXRNAPs54dCZDDqN7sMdarPn8V2c2rp/exec";

  fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams(jsonData)
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    console.log("DATA");
      if (data === "Success") {
          document.getElementById("success-message").style.display = "block";
          form.reset(); // Limpia el formulario
      } else {
          document.getElementById("error-message").style.display = "block";
      }
  })
  .catch(error => {
      document.getElementById("error-message").style.display = "block";
  })
  .finally(() => {
    // Ocultar el ícono de carga después de que termine el proceso
    loadingElement.style.display = "none";
});
});

