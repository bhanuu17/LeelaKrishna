import { products } from './products.js'

// Cart state
let cart = []

// Initialize cart
export function initializeCart() {
  // Load cart from localStorage if available
  loadCart()
  
  // Listen for add to cart events
  document.addEventListener('add-to-cart', handleAddToCartEvent)
  
  // Setup event listeners
  setupCartEventListeners()
}

// Function to load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('pickle-cart')
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartUI()
  }
}

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem('pickle-cart', JSON.stringify(cart))
}

// Handle add to cart event
function handleAddToCartEvent(e) {
  const { product, quantity } = e.detail
  addToCart(product, quantity)
}

// Add a product to the cart
function addToCart(product, quantity) {
  // Check if the product is already in the cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id)
  
  if (existingItemIndex >= 0) {
    // Update quantity if the product is already in the cart
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item to the cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    })
  }
  
  // Update UI and save cart
  updateCartUI()
  saveCart()
  
  // Update cart count with animation
  const cartCount = document.querySelector('.cart-count')
  cartCount.classList.add('bounce')
  setTimeout(() => cartCount.classList.remove('bounce'), 500)
  
  // Open the cart sidebar
  toggleCartSidebar(true)
}

// Update the cart UI
function updateCartUI() {
  // Update cart count
  const cartCount = document.querySelector('.cart-count')
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems
  
  // Update cart items
  const cartItemsContainer = document.querySelector('.cart-items')
  
  // If cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
        <button class="btn btn-primary continue-shopping">Continue Shopping</button>
      </div>
    `
    
    // Add event listener to continue shopping button
    const continueShoppingBtn = cartItemsContainer.querySelector('.continue-shopping')
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener('click', () => {
        toggleCartSidebar(false)
      })
    }
  } else {
    // Render cart items
    cartItemsContainer.innerHTML = ''
    
    cart.forEach(item => {
      const cartItem = document.createElement('div')
      cartItem.classList.add('cart-item')
      
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
            <span class="cart-quantity-value">${item.quantity}</span>
            <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
        <div class="cart-item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      `
      
      cartItemsContainer.appendChild(cartItem)
    })
    
    // Add event listeners to the cart item buttons
    const minusButtons = cartItemsContainer.querySelectorAll('.cart-quantity-btn.minus')
    const plusButtons = cartItemsContainer.querySelectorAll('.cart-quantity-btn.plus')
    const removeButtons = cartItemsContainer.querySelectorAll('.cart-item-remove')
    
    minusButtons.forEach(button => {
      button.addEventListener('click', () => {
        updateCartItemQuantity(parseInt(button.dataset.id), 'decrease')
      })
    })
    
    plusButtons.forEach(button => {
      button.addEventListener('click', () => {
        updateCartItemQuantity(parseInt(button.dataset.id), 'increase')
      })
    })
    
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        removeCartItem(parseInt(button.dataset.id))
      })
    })
  }
  
  // Update total price
  const totalPrice = document.querySelector('.total-price')
  const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  totalPrice.textContent = `$${total.toFixed(2)}`
}

// Update cart item quantity
function updateCartItemQuantity(itemId, action) {
  const itemIndex = cart.findIndex(item => item.id === itemId)
  
  if (itemIndex === -1) return
  
  if (action === 'increase') {
    cart[itemIndex].quantity += 1
  } else {
    cart[itemIndex].quantity -= 1
    
    // Remove item if quantity reaches 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1)
    }
  }
  
  // Update UI and save cart
  updateCartUI()
  saveCart()
}

// Remove item from cart
function removeCartItem(itemId) {
  cart = cart.filter(item => item.id !== itemId)
  
  // Update UI and save cart
  updateCartUI()
  saveCart()
}

// Toggle cart sidebar
export function toggleCartSidebar(isOpen) {
  const cartSidebar = document.querySelector('.cart-sidebar')
  const cartOverlay = document.querySelector('.cart-overlay')
  
  if (isOpen) {
    cartSidebar.classList.add('active')
    cartOverlay.classList.add('active')
    document.body.style.overflow = 'hidden' // Prevent scrolling when cart is open
  } else {
    cartSidebar.classList.remove('active')
    cartOverlay.classList.remove('active')
    document.body.style.overflow = '' // Enable scrolling
  }
}

// Setup cart event listeners
function setupCartEventListeners() {
  // Cart icon click
  const cartIcon = document.querySelector('.cart-icon')
  cartIcon.addEventListener('click', () => {
    toggleCartSidebar(true)
  })
  
  // Close cart button click
  const closeCartButton = document.querySelector('.close-cart')
  closeCartButton.addEventListener('click', () => {
    toggleCartSidebar(false)
  })
  
  // Cart overlay click (close cart when clicking outside)
  const cartOverlay = document.querySelector('.cart-overlay')
  cartOverlay.addEventListener('click', () => {
    toggleCartSidebar(false)
  })
  
  // Checkout button click
  const checkoutButton = document.querySelector('.checkout-btn')
  checkoutButton.addEventListener('click', handleCheckout)
}

// Handle checkout process
function handleCheckout() {
  if (cart.length === 0) return
  
  alert('Thank you for your order! This is a demo, so no actual purchase was made.')
  
  // Clear cart
  cart = []
  updateCartUI()
  saveCart()
  
  // Close cart sidebar
  toggleCartSidebar(false)
}

// Export functions for use in other modules
export { cart }