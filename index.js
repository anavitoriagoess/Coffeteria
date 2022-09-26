let cart = []; // to use when add something to buy

// redirect to login page when click on button
let logIn = document.getElementById("redirect");
logIn.addEventListener("click", redirectToLogin);
function redirectToLogin() {
  window.location.href = "login.html";
}

// usage localStorage and rename button name
function renameButtonWithUserName() {
  const item = JSON.parse(localStorage.getItem("userData"));
  item?.userName.split(" ");
  document.getElementById("redirect").innerHTML = item?.userName
    ? `Olá, ${item?.userName}`
    : `Cadastre-se`;
}

function addInfosFromStorageToForm() {
  const userInfos = JSON.parse(localStorage.getItem("userData")) || [];
  const { userName, email, phone } = userInfos;

  if (userInfos.userName) {
    document.querySelector("#user_name").value = userName;
    document.querySelector("#user_email").value = email;
    document.querySelector("#user_phone").value = phone;
  } else {
    return;
  }
}

// Add Our Service cards and modal
function addOurServiceCards() {
  ourServices.map((item) => {
    $(".service__content").append(`
      <div class="service__content--cards">
        <div class="content__cards--information">
          <img class="content__cards--img" src="${item.img}" />
          <strong>${item.text}</strong>
          <span>${item.desc}</span>
          <button class="btn botoes">${item.button}</button>
        </div>
      </div>
    `);
  });
}

// Add product informations and create carousel
function createCarousel() {
  setTimeout(() => {
    $(".cards-container").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: true,
    });
  }, 500);
}

function addProductCards() {
  produtosJson.map((item, index) => {
    $(".cards-container").append(`
      <div class="cards-our-best--size">
        <div class="cards-our-best--info">
          <img class="cards-our-best--img" src="${item.img}" />
          <strong class="cards-our-best--name">${item.name}</strong>
          <p class="cards-our-best--description">${item.description}</p>
          <div class="cards-our-best__content--price">
            <strong class="cards-our-best--price">${item.price.replace(
              ".",
              ","
            )}</strong>
            <button class="btn btn-color botoes" id="compre" onclick="openModal(${index})">Peça agora</button>
          </div>
        </div>
      </div>
    `);
  });

  createCarousel();
}

// Open and Close modal to buy a product
const openModal = (btnIndex) => {
  const modal = document.querySelector(".modal");
  const productToBuy = produtosJson[btnIndex];
  const actualStyle = modal.style.display;
  let modalQt = 1;

  actualStyle == "flex"
    ? (modal.style.display = "none")
    : (modal.style.display = "flex");

  $(".modal--align").remove();

  $(".content").append(
    `
    <div class="modal--align">
      <img class="modal-right--img" src="${productToBuy.img}" />
      <div class="modal-right--align">
        <strong class="modal-name">${productToBuy.name}</strong>
        <p class="modal-description">${productToBuy.detailDesc}</p>
        <div class="modal__content--price">
          <span class="text--price">Preço</span>
          <div class="modal--price">
            <strong class="price">R$ ${productToBuy.price.replace(
              ".",
              ","
            )}</strong>
            <div class="modal-qtd--area">
              <button class="qtmenos">-</button>
              <div class="qt">${modalQt}</div>
              <button class="qtmais">+</button>
            </div>
          </div>
        </div>
        <div class="modal--footer">
          <div class="modal--addButton">Adicionar ao carrinho</div>
          <div class="modal--cancelButton">Cancelar</div>
        </div>
      </div>
    </div>
  `
  );

  // MODAL EVENTS
  // Add and remove qt items
  $(document).on("click", ".qtmenos", () => {
    if (modalQt > 1) {
      modalQt--;
      document.querySelector(".qt").innerHTML = modalQt;
    }
  });
  $(document).on("click", ".qtmais", () => {
    modalQt++;
    document.querySelector(".qt").innerHTML = modalQt;
  });

  // Add button
  let itemToAdd = productToBuy.id;
  let buttonSeeCart = document.querySelector(".see-cart");
  document.querySelector(".modal--addButton").addEventListener("click", () => {
    let identifier = itemToAdd + "@";
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1) {
      cart[key].qt += modalQt;
    } else {
      cart.push({
        identifier,
        id: itemToAdd,
        qt: modalQt,
        name: productToBuy.name,
        price: productToBuy.price,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    $(".modal--align").remove();

    if (cart.length > 0) {
      buttonSeeCart.style.display = "block";
    }

    buttonSeeCart.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  });

  // Close button
  $(document).on("click", ".modal--cancelButton", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  });
};

// Send form email

document.querySelector("#form").addEventListener("submit", () => {
  let params = {
    service_id: "service_dx229n1",
    template_id: "template_ez0nu77",
    user_id: "oQuKe7Y721HHztn-P",
    template_params: {
      user_name: document.querySelector("#user_name").value,
      user_message: document.querySelector("#user_message").value,
      user_phone: document.querySelector("#user_phone").value,
      user_email: document.querySelector("#user_email").value,
    },
  };

  let headers = {
    "Content-type": "application/json",
  };

  let options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", options)
    .then((httpResponse) => {
      if (httpResponse.ok) {
        console.log("Your mail is sent!");
      } else {
        return httpResponse.text().then((text) => Promise.reject(text));
      }
    })
    .catch((error) => {
      console.log("Oops... " + error);
    });
});

renameButtonWithUserName();
addOurServiceCards();
addProductCards();
addInfosFromStorageToForm();
