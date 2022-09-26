const item = JSON.parse(localStorage.getItem("cart"));

item.map((i) => {
  $(".content-items").append(`
        <div class="content-items--align">
            <p id="product-name">${i.name}</p>
            <p id="amount">${i.qt}</p>
        </div>
        
    `);
});

function total() {
  let teste = [];
  let soma = 0;
  for (let p of item) {
    total = p.price * p.qt;

    teste.push({
      total,
    });
  }
  for (let i of teste) {
    soma += i.total;
  }
  return soma;
}

let totalOrder = (document.querySelector(
  "#total"
).innerHTML = `Total da compra: R$ ${total().toFixed(2).replace(".", ",")}`);
