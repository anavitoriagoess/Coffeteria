const successMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Login realizado com sucesso",
  });
};

const errorMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: "Erro ao efetuar login",
  });
};

const redirectToHome = () => {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
};

document.querySelector(".form-login").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = $("#emailForm").val();
  const phone = $("#phoneForm").val();
  const userName = $("#nameForm").val();

  const userData = {
    ...{ email, phone, userName },
  };

  new Promise(function (resolve, reject) {
    if (userData) {
      resolve(localStorage.setItem("userData", JSON.stringify(userData)));
    } else {
      reject(errorMessage());
    }
  })
    .then(function () {
      successMessage();
      redirectToHome();
    })
    .catch(function (e) {
      console.error(e);
    });
});
