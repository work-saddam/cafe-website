//--------------------------------order form --------------------------------
const form = document.getElementById('order')
form.addEventListener('submit', orderDone)

async function orderDone(event) {
  event.preventDefault()
  const o_name = document.getElementById('o_name').value
  const o_number = document.getElementById('o_number').value
  const main_order = document.getElementById('main_order').value
  const additional_food = document.getElementById('additional_food').value
  const o_email = document.getElementById('o_email').value
  const o_delivery_time = document.getElementById('o_delivery_time').value.replace('T', '  ')
  const o_address = document.getElementById('o_address').value
  const o_message = document.getElementById('o_message').value
  const email = decodeURIComponent(document.cookie.split('=')[1]);
  const o_placed_time = Date().replace('GMT+0530 (India Standard Time)','')
//  const o_placed_time = new Date().toLocaleString()

  const result = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      o_name,
      o_number,
      main_order,
      additional_food,
      email,
      o_email,
      o_placed_time,
      o_delivery_time,
      o_address,
      o_message
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    alert(result.message)
    if (result.message === "Order Successfully")
      window.location.href = '/main';
  } else {
    swal("Opps!", result.error, "warning");
    if (result.error === "Please Sign in Again!!") {
      alert(result.error)
      window.location.href = '/';
    }
  }
}

// -------------------------------------------------------

const navEl = document.querySelector(".navbar");
const menu = document.querySelector("#menu-bars");

menu.addEventListener("click", () => {
  navEl.classList.toggle("nav--open");
  menu.classList.toggle("fa-times");
});

window.onscroll = () => {
  navEl.classList.remove("nav--open");
  menu.classList.remove("fa-times");

};