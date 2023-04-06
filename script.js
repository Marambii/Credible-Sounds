document.addEventListener('DOMContentLoaded', () => {
    let instruments = document.querySelector('.instrument');
  
    function fetchInstruments(url) {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            let instrument = response[i];
            let instrumentElement = document.createElement('div');
            instrumentElement.classList.add('instrument');
  
            instrumentElement.innerHTML = `
              <img src="${instrument.img}" alt="" class="product-img">
              <div class="product-content">
                <h4 class="product-type">${instrument.type}</h4>
                <h3 class="description">${instrument.description}</h3>
                <div class="price-container">
                  <h3 class="instrument-price">ksh.${instrument.Price}.00</h3>
                  <button id="addToCart" data-instrument-id="${instrument.id}" class="add-to-cart"><i class="fa-solid fa-cart-shopping fa-beat"></i></button>
                  <button id="buyNow" class="buy-now" role="button">Buy Now</button>
                </div>
              </div>`;
  
            instruments.appendChild(instrumentElement);
          }
  
          const cart = [];
  
          function addToCart(instrument) {
            cart.push(instrument);
            displayCart();
          }
  
          function removeItemFromCart(index) {
            cart.splice(index, 1);
            displayCart();
          }
  
          function displayCart() {
            if (cart.length === 0) {
              document.getElementById('cartItem').innerHTML = 'Your cart is empty';
              document.getElementById('total').innerHTML = `Total Price: ksh.0.00`;
            } else {
              let cartHtml = '';
              let totalPrice = 0;
              for (let i = 0; i < cart.length; i++) {
                const instrument = cart[i];
                cartHtml += `
                  <div class="cart-item">
                    <div class="cart-item-description">${instrument.description}</div>
                    <p>${instrument.type}</p>
                    <h3>${instrument.Price}.00</h3>
                    <i class="fa-sharp fa-solid fa-trash" onclick="removeItemFromCart(${i})"></i>
                  </div>
                `;
                totalPrice += instrument.Price;
              }
              document.getElementById('cartItem').innerHTML = cartHtml;
              document.getElementById('total').innerHTML = `Total Price: ksh.${totalPrice}.00`;
            }
          }
  
          const addToCartButtons = document.querySelectorAll('.add-to-cart');
          addToCartButtons.forEach((button) => {
            button.addEventListener('click', () => {
              const instrumentId = button.dataset.instrumentId;
              fetch(`https://crediblesounds.onrender.com/instruments/${instrumentId}`)
                .then(response => response.json())
                .then(response => {
                  addToCart(response);
                })
                .catch(error => console.log(error));
            });
          });
  
          const buyNowButtons = document.querySelectorAll('.buy-now');
          buyNowButtons.forEach((button) => {
            button.addEventListener('click', () => {
              alert('Call us now to get this instrument Delivered. Thanks for choosing Credible sounds');
            });
          });
        })
        .catch(error => console.log(error));
    }
  
    fetchInstruments('https://crediblesounds.onrender.com/instruments');
  });
  