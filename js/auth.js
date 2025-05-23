// Auth state
let isLoggedIn = false;
let currentUser = null;

// Initialize auth
export function initializeAuth() {
  setupAuthEventListeners();
}

// Setup auth event listeners
function setupAuthEventListeners() {
  const loginLinks = document.querySelectorAll('.login-link');
  const closeAuth = document.querySelector('.close-auth');
  const authModal = document.querySelector('.auth-modal');
  const loginForm = document.getElementById('loginForm');
  const switchAuth = document.querySelector('.switch-auth');

  // Open auth modal
  loginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAuthModal(true);
    });
  });

  // Close auth modal
  closeAuth.addEventListener('click', () => {
    toggleAuthModal(false);
  });

  // Close modal when clicking outside
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      toggleAuthModal(false);
    }
  });

  // Handle form submission
  loginForm.addEventListener('submit', handleLogin);

  // Switch between login and signup
  switchAuth.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
  });
}

// Toggle auth modal
function toggleAuthModal(show) {
  const authModal = document.querySelector('.auth-modal');
  if (show) {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  // Mock login - in a real app, this would make an API call
  if (email === 'pravalika@gmail.com' && password === '123456') {
    isLoggedIn = true;
    currentUser = { email };
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    toggleAuthModal(false);
    
    // Clear form
    e.target.reset();
    
    // Show success message
    alert('Successfully logged in!');
  } else {
    alert('Invalid credentials.');
  }
}

// Toggle between login and signup
function toggleAuthMode() {
  const title = document.querySelector('.auth-content h2');
  const submitButton = document.querySelector('.auth-form button');
  const switchLink = document.querySelector('.switch-auth');
  const switchText = document.querySelector('.auth-footer');

  if (title.textContent === 'Welcome Back') {
    title.textContent = 'Create Account';
    submitButton.textContent = 'Sign Up';
    switchText.innerHTML = 'Already have an account? <a href="#" class="switch-auth">Login</a>';
  } else {
    title.textContent = 'Welcome Back';
    submitButton.textContent = 'Login';
    switchText.innerHTML = 'Don\'t have an account? <a href="#" class="switch-auth">Sign up</a>';
  }
}

// Update UI based on auth state
function updateAuthUI() {
  const loginLinks = document.querySelectorAll('.login-link');
  
  loginLinks.forEach(link => {
    if (isLoggedIn) {
      link.textContent = currentUser.email;
      link.style.cursor = 'default';
      link.addEventListener('click', (e) => e.preventDefault());
    } else {
      link.textContent = 'Login';
      link.style.cursor = 'pointer';
    }
  });
}

// Export auth state and functions
export { isLoggedIn, currentUser };