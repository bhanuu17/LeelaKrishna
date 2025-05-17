import '../css/style.css'
import { initializeProducts } from './products.js'
import { initializeCart } from './cart.js'
import { initializeUI } from './ui.js'
import { initializeAuth } from './auth.js'
import { initializeContact } from './contact.js'

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeProducts()
  initializeCart()
  initializeUI()
  initializeAuth()
  initializeContact()
})