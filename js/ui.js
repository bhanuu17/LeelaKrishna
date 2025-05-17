import { toggleCartSidebar } from './cart.js'

// Initialize UI
export function initializeUI() {
  setupMobileMenu()
  setupScrollAnimations()
}

// Setup mobile menu
function setupMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
  const mainNav = document.querySelector('.main-nav')
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active')
    mainNav.classList.toggle('active')
  })
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.main-nav a')
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active')
      mobileMenuToggle.classList.remove('active')
    })
  })
}

// Setup scroll animations
function setupScrollAnimations() {
  // Smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const targetId = this.getAttribute('href')
      if (targetId === '#') return
      
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        })
      }
    })
  })
  
  // Animate header on scroll
  let lastScrollTop = 0
  const header = document.querySelector('.main-header')
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    if (scrollTop > 100) {
      header.style.boxShadow = 'var(--shadow-md)'
    } else {
      header.style.boxShadow = 'var(--shadow-sm)'
    }
    
    lastScrollTop = scrollTop
  })
}

// Function to show notification
export function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div')
  notification.classList.add('notification', `notification-${type}`)
  notification.textContent = message
  
  // Add notification to the DOM
  document.body.appendChild(notification)
  
  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('active')
  }, 10)
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('active')
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}