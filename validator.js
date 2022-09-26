let validator = {
  handleSubmit: (event) => {
    event.preventDefault();

    let send = true;
    let inputs = document.querySelectorAll("input");

    validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];

      let check = validator.checkInput(input);

      if (check !== true) {
        send = false;
        validator.showError(input, check);
      }
    }
    if (send) {
      let button = document.querySelector("#button");
      let buttonLogin = document.querySelector("#button-login");

      if (buttonLogin) {
        buttonLogin.value = "Entrando...";
        buttonLogin.style.backgroundColor = "#00FA9A";

        setTimeout(function () {
          form.submit();
        }, 3000);
      } else {
        button.value = "Enviado com sucesso!";
        button.style.backgroundColor = "#00FA9A";

        setTimeout(function () {
          validator.clearForm();
          button.value = "Enviar";
          button.style.backgroundColor = "#799431";
        }, 2000);
      }
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");
    if (rules !== null) {
      rules = rules.split("|");

      for (let i in rules) {
        let ruleDetails = rules[i].split("=");

        switch (ruleDetails[0]) {
          case "required":
            if (input.value == "") {
              return "Campo Obrigatório";
            }
            break;
          case "min":
            if (input.value.length < ruleDetails[1]) {
              return (
                "Campo precisa ter pelo menos " + ruleDetails[1] + " caracteres"
              );
            }
            break;
          case "email":
            if (input.value !== "") {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return "Campo precisa ser um e-mail válido";
              }
            }
            break;
        }
      }
    }
    return true;
  },
  showError: (fieldset, error) => {
    fieldset.style.borderColor = "#FF0000";

    let elementError = document.createElement("div");
    elementError.classList.add("error");
    elementError.innerHTML = error;

    fieldset.parentElement.insertBefore(elementError, fieldset.ElementSibling);
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = "";
    }

    let errorElements = document.querySelectorAll(".error");
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
  clearForm: () => {
    document.getElementById("user_name").value = "";
    document.getElementById("user_email").value = "";
    document.getElementById("user_phone").value = "";
    document.getElementById("user_message").value = "";
  },
};

let form = document.querySelector(".validator");
form.addEventListener("submit", validator.handleSubmit);
