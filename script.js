// Get cart count element
const cartCount = document.getElementById('cartCount');

// Load cart count from localStorage (persists across pages)
let cart = parseInt(localStorage.getItem('cartCount')) || 0;
cartCount.textContent = cart;

// Handle all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the quantity input in the same product container
        const productContainer = this.closest('.product-container');
        const quantityInput = productContainer.querySelector('.quantity');
        const currentQuantity = parseInt(quantityInput.value);
        
        // Add to cart
        cart += currentQuantity;
        
        // Update display
        cartCount.textContent = cart;
        
        // Save to localStorage
        localStorage.setItem('cartCount', cart);
        
        // Reset quantity
        quantityInput.value = 1;
        
        // Show feedback
        this.textContent = 'Added!';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
        }, 1000);
    });
});

// Handle all Decrease buttons
const decreaseButtons = document.querySelectorAll('.decreaseBtn');

decreaseButtons.forEach(button => {
    button.addEventListener('click', function() {
        const quantityInput = this.nextElementSibling;
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
});

// Handle all Increase buttons
const increaseButtons = document.querySelectorAll('.increaseBtn');

increaseButtons.forEach(button => {
    button.addEventListener('click', function() {
        const quantityInput = this.previousElementSibling;
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}
