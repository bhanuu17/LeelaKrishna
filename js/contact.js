// Initialize contact form
export function initializeContact() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Simple validation
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // In a real application, you would send this data to your server
  console.log('Contact form submission:', { name, email, subject, message });
  
  // Show success message
  const successMessage = document.querySelector('.success-message');
  successMessage.classList.add('active');
  
  // Clear form
  e.target.reset();
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove('active');
  }, 5000);
}