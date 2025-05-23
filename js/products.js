// Product data
const products = [
  {
    id: 1,
    name: "Chicken Pickle/ 1kg ", 
    price: 160,
    image: "https://media.istockphoto.com/id/872775970/photo/fruit-chutney.jpg?s=612x612&w=0&k=20&c=LfTRXVa63sA-zG5-8toxlPA64q5jMkCyfXdhP8SiiHw=",
    description: "A spoonful of heritage, a burst of flavor – homemade chicken pickle",
    category: "non-veg",
    inStock: true
  },
  {
    id: 2,
    name: "Prawn Pickle/ 1kg",
    price: 170,
    image: "https://i.pinimg.com/736x/97/3f/c3/973fc3ea4b1deb39d4e0907bef37e87c.jpg",
    description: "Add a splash of ocean to your plate When prawns met spice, magic happened.",
    category: "non-veg",
    inStock: true
  },
  {
    id: 3,
    name: "Red Chilli Pickle/ 1kg",
    price: 140,
    image: "https://maayeka.com/wp-content/uploads/2017/04/Easy-red-chili-pickle-laal-mirch-achar.jpg.webp",
    description: "Sweet and tangy pickle chips perfect for sandwiches and burgers.",
    category: "veg",
    inStock: true
  },
  {
    id: 4,
    name: "Mango Pickle/ 1kg",
    price: 160,
    image: "https://i.pinimg.com/736x/35/fa/49/35fa49c83bff731e8c85c6f04976b416.jpg",
    description: "A mix of our most popular pickles in one convenient jarwith seasonal taste.",
    category: "Most Popular",
    // specialty
    inStock: true
  },
  {
    id: 5,
    name: "Mutoon Pickle/ 1kg",
    price: 190,
    image: "https://i.pinimg.com/736x/55/72/4f/55724fc1370289584d8f917f436f09a0.jpg",
    description: "Fiery, tangy, and unforgettable—mutton pickle that speaks to your soul",
    category: "non-veg",
    inStock: true
  },
  {
    id: 6,
    name: "Gongura pickle/ 1kg",
    price: 150,
    image: "https://i.pinimg.com/736x/19/b9/aa/19b9aab9b6657f49962afa24e3c42457.jpg",
    description: "Crafted with love, our green gongura pickle brings tradition to your table.",
    category: "veg",
    inStock: true
  },
  {
    id: 7,
    name: "Amla Pickle/ 1kg",
    price: 150,
    image: "https://i.pinimg.com/736x/20/dd/96/20dd961e8b7b0255baf3843db7d8bcd7.jpg",
    description: "Naturally sweetened with the local honey for a unique flavor profile.",
    category: "veg",
    inStock: true
  },
  {
    id: 8,
    name: "Fish Pickle/ 1kg",
    price: 180,
    image: "https://vaya.in/recipes/wp-content/uploads/2019/01/rsz_fish_pickle.jpg",
    description: "Try our exclusive seasonal pickles with this subscription. Price per month.",
    category: "non-veg",
    inStock: false
  },
  {
    id: 9,
    name: "Lemon Pickle/ 1kg",
    price: 80,
    image: "https://i.pinimg.com/736x/34/61/c7/3461c757712127376a638a8cb843b595.jpg",
    description: "Try our exclusive seasonal pickles with this subscription. Price per month.",
    category: "veg",
    inStock: false
  },
   {
    id: 10,
    name: "Garlic Pickle/ 1kg",
    price: 180,
    image: "https://i.pinimg.com/736x/c2/b4/85/c2b485f130b21d9e61ec9640205d09da.jpg",
    description: "Perfect for the snacking, these dill spears are crisp and flavorful.",
    category: "veg",
    inStock: true
  },
   {
    id: 11,
    name: "Tomato Pickle/ 1kg",
    price: 160,
    image: "https://i.pinimg.com/736x/7f/ee/24/7fee24807a5661db32eda18c5100114d.jpg",
    description: "tomato pickle brings homemade goodness to your table.",
    category: "Most Popular",
    inStock: true
  },
   {
    id: 12,
    name: "Green chilli Pickle/ 1kg",
    price: 140,
    image: "https://i.pinimg.com/736x/a2/1f/e6/a21fe607c6edceafc859ad838eea4dad.jpg",
    description: "Crafted with love, our green chilli pickle brings tradition to your table.",
    category: "veg",
    inStock: true
  },

];

// Function to initialize the products
export function initializeProducts() {
  renderProducts(products)
  setupFilterButtons()
}

// Function to render products
function renderProducts(productsToRender) {
  const productGrid = document.getElementById('product-grid')
  productGrid.innerHTML = ''

  productsToRender.forEach(product => {
    const productCard = document.createElement('div')
    productCard.classList.add('product-card')
    productCard.dataset.category = product.category

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h4 class="product-name">${product.name}</h4>
        <p class="product-category">${capitalizeFirstLetter(product.category)}</p>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">₹${product.price.toFixed(2)}</span>
          ${product.inStock ? 
            `<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>` : 
            `<button class="out-of-stock" disabled>Out of Stock</button>`
          }
        </div>
        ${product.inStock ? 
          `<div class="quantity-selector">
            <button class="quantity-btn minus" data-id="${product.id}">-</button>
            <span class="quantity-value" data-id="${product.id}">1</span>
            <button class="quantity-btn plus" data-id="${product.id}">+</button>
          </div>` : ''
        }
      </div>
    `

    productGrid.appendChild(productCard)
  })

  // Add event listeners to the add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart')
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart)
  })

  // Add event listeners to quantity buttons
  const minusButtons = document.querySelectorAll('.quantity-btn.minus')
  const plusButtons = document.querySelectorAll('.quantity-btn.plus')

  minusButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      updateQuantity(e.target.dataset.id, 'decrease')
    })
  })

  plusButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      updateQuantity(e.target.dataset.id, 'increase')
    })
  })
}

// Function to handle add to cart
function handleAddToCart(e) {
  const productId = parseInt(e.target.dataset.id)
  const quantityElement = document.querySelector(`.quantity-value[data-id="${productId}"]`)
  const quantity = parseInt(quantityElement.textContent)
  
  // Find the product
  const product = products.find(p => p.id === productId)
  
  // Dispatch custom event
  const addToCartEvent = new CustomEvent('add-to-cart', {
    detail: {
      product,
      quantity
    }
  })
  
  document.dispatchEvent(addToCartEvent)
  
  // Visual feedback
  const button = e.target
  button.classList.add('added')
  button.textContent = 'Added!'
  
  setTimeout(() => {
    button.classList.remove('added')
    button.textContent = 'Add to Cart'
  }, 1500)
}

// Function to update quantity
function updateQuantity(productId, action) {
  const quantityElement = document.querySelector(`.quantity-value[data-id="${productId}"]`)
  let quantity = parseInt(quantityElement.textContent)
  
  if (action === 'increase') {
    quantity = Math.min(quantity + 1, 10) // Max 10 items
  } else {
    quantity = Math.max(quantity - 1, 1) // Min 1 item
  }
  
  quantityElement.textContent = quantity
}

// Function to setup filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active class
      filterButtons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')
      
      // Filter products
      const filter = button.dataset.filter
      
      if (filter === 'all') {
        renderProducts(products)
      } else {
        const filteredProducts = products.filter(product => product.category === filter)
        renderProducts(filteredProducts)
      }
    })
  })
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Export products for use in other modules
export { products }