// E-Commerce Mobile JavaScript

// Cart Management
const CartManager = {
	storageKey: 'ecommerce_cart',
	
	// Initialize cart
	init: function() {
		this.updateCartBadge();
		this.bindEvents();
	},
	
	// Get cart from localStorage
	getCart: function() {
		const cart = localStorage.getItem(this.storageKey);
		return cart ? JSON.parse(cart) : [];
	},
	
	// Save cart to localStorage
	saveCart: function(cart) {
		localStorage.setItem(this.storageKey, JSON.stringify(cart));
		this.updateCartBadge();
	},
	
	// Add item to cart
	addToCart: function(product) {
		const cart = this.getCart();
		const existingItem = cart.find(item => item.id === product.id && 
			JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes || {}));
		
		if (existingItem) {
			existingItem.quantity += product.quantity || 1;
		} else {
			cart.push({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				quantity: product.quantity || 1,
				selectedAttributes: product.selectedAttributes || {}
			});
		}
		
		this.saveCart(cart);
		this.showNotification('Item added to cart!', 'success');
		return cart;
	},
	
	// Remove item from cart
	removeFromCart: function(productId, selectedAttributes) {
		const cart = this.getCart();
		const filteredCart = cart.filter(item => {
			if (item.id !== productId) return true;
			return JSON.stringify(item.selectedAttributes || {}) !== JSON.stringify(selectedAttributes || {});
		});
		this.saveCart(filteredCart);
		this.showNotification('Item removed from cart!', 'info');
		return filteredCart;
	},
	
	// Update item quantity
	updateQuantity: function(productId, quantity, selectedAttributes) {
		const cart = this.getCart();
		const item = cart.find(item => item.id === productId && 
			JSON.stringify(item.selectedAttributes || {}) === JSON.stringify(selectedAttributes || {}));
		
		if (item) {
			if (quantity <= 0) {
				return this.removeFromCart(productId, selectedAttributes);
			}
			item.quantity = quantity;
			this.saveCart(cart);
		}
		return cart;
	},
	
	// Get cart total
	getCartTotal: function() {
		const cart = this.getCart();
		return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
	},
	
	// Get cart count
	getCartCount: function() {
		const cart = this.getCart();
		return cart.reduce((total, item) => total + item.quantity, 0);
	},
	
	// Update cart badge
	updateCartBadge: function() {
		const count = this.getCartCount();
		const badge = document.getElementById('cart-badge');
		if (badge) {
			if (count > 0) {
				badge.textContent = count;
				badge.style.display = 'block';
			} else {
				badge.style.display = 'none';
			}
		}
	},
	
	// Clear cart
	clearCart: function() {
		localStorage.removeItem(this.storageKey);
		this.updateCartBadge();
	},
	
	// Show notification
	showNotification: function(message, type) {
		if (typeof Swal !== 'undefined') {
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 2000,
				timerProgressBar: true
			});
			
			Toast.fire({
				icon: type || 'success',
				title: message
			});
		}
	},
	
	// Bind events
	bindEvents: function() {
		// Update badge on page load
		$(document).ready(() => {
			this.updateCartBadge();
		});
	}
};

// Search Functionality
const SearchManager = {
	init: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		const searchInput = document.getElementById('search-input');
		const searchBtn = document.getElementById('btn-search');
		
		if (searchInput) {
			searchInput.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					this.performSearch();
				}
			});
		}
		
		if (searchBtn) {
			searchBtn.addEventListener('click', () => {
				this.performSearch();
			});
		}
	},
	
	performSearch: function() {
		const searchInput = document.getElementById('search-input');
		const query = searchInput ? searchInput.value.trim() : '';
		
		if (query) {
			// Redirect to products page with search query
			const currentPage = window.location.pathname;
			if (currentPage.includes('products.html')) {
				// If already on products page, trigger search
				this.filterProducts(query);
			} else {
				// Navigate to products page with query
				window.location.href = 'products.html?search=' + encodeURIComponent(query);
			}
		}
	},
	
	filterProducts: function(query) {
		// Filter products based on query
		const productCards = document.querySelectorAll('.product-card');
		const lowerQuery = query.toLowerCase();
		
		productCards.forEach(card => {
			const title = card.querySelector('.product-card-title')?.textContent.toLowerCase() || '';
			const description = card.querySelector('.product-card-description')?.textContent.toLowerCase() || '';
			
			if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	}
};

// Navigation Manager
const NavigationManager = {
	init: function() {
		this.setActiveNav();
		this.bindEvents();
	},
	
	setActiveNav: function() {
		const currentPath = window.location.pathname;
		const pageName = currentPath.split('/').pop() || 'index.html';
		
		// Remove active class from all nav items
		document.querySelectorAll('.navbar-footer .nav-link').forEach(link => {
			link.classList.remove('active');
		});
		
		// Set active based on current page
		let activeId = 'nav-home';
		if (pageName.includes('products')) activeId = 'nav-categories';
		else if (pageName.includes('cart')) activeId = 'nav-cart';
		else if (pageName.includes('orders')) activeId = 'nav-orders';
		else if (pageName.includes('profile')) activeId = 'nav-profile';
		
		const activeNav = document.getElementById(activeId);
		if (activeNav) {
			activeNav.classList.add('active');
		}
	},
	
	bindEvents: function() {
		// Logout button
		const logoutBtn = document.getElementById('btn-logout');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', (e) => {
				e.preventDefault();
				this.handleLogout();
			});
		}
		
		// Sidebar menu links
		document.querySelectorAll('.sidebar-mobile .nav-link').forEach(link => {
			link.addEventListener('click', () => {
				// Close sidebar when link is clicked
				const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasExample'));
				if (offcanvas) {
					offcanvas.hide();
				}
			});
		});
	},
	
	handleLogout: function() {
		if (typeof Swal !== 'undefined') {
			Swal.fire({
				title: 'Logout?',
				text: 'Are you sure you want to logout?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#1976d2',
				cancelButtonColor: '#6c757d',
				confirmButtonText: 'Yes, logout'
			}).then((result) => {
				if (result.isConfirmed) {
					// Clear cart and redirect to login
					CartManager.clearCart();
					window.location.href = 'login.html';
				}
			});
		}
	}
};

// Product Detail Functions
const ProductDetailManager = {
	init: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		// Thumbnail click
		document.querySelectorAll('.product-thumbnail').forEach(thumb => {
			thumb.addEventListener('click', (e) => {
				const imgSrc = e.target.src;
				const mainImg = document.querySelector('.product-main-image');
				if (mainImg) {
					mainImg.src = imgSrc;
				}
				
				// Update active thumbnail
				document.querySelectorAll('.product-thumbnail').forEach(t => {
					t.classList.remove('active');
				});
				e.target.classList.add('active');
			});
		});
		
		// Quantity controls
		const decreaseBtn = document.querySelector('.quantity-btn.decrease');
		const increaseBtn = document.querySelector('.quantity-btn.increase');
		const quantityInput = document.querySelector('.quantity-input');
		
		if (decreaseBtn && quantityInput) {
			decreaseBtn.addEventListener('click', () => {
				let qty = parseInt(quantityInput.value) || 1;
				if (qty > 1) {
					quantityInput.value = qty - 1;
				}
			});
		}
		
		if (increaseBtn && quantityInput) {
			increaseBtn.addEventListener('click', () => {
				let qty = parseInt(quantityInput.value) || 1;
				quantityInput.value = qty + 1;
			});
		}
		
		// Add to cart button
		const addToCartBtn = document.querySelector('.btn-add-to-cart');
		if (addToCartBtn) {
			addToCartBtn.addEventListener('click', () => {
				this.addToCart();
			});
		}
		
		// Buy now button
		const buyNowBtn = document.querySelector('.btn-buy-now');
		if (buyNowBtn) {
			buyNowBtn.addEventListener('click', () => {
				this.buyNow();
			});
		}
		
		// Attribute selection
		document.querySelectorAll('.attribute-option').forEach(option => {
			option.addEventListener('click', (e) => {
				const group = e.target.closest('.attribute-group');
				if (group) {
					group.querySelectorAll('.attribute-option').forEach(opt => {
						opt.classList.remove('selected');
					});
					e.target.classList.add('selected');
				}
			});
		});
	},
	
	getProductData: function() {
		const product = {
			id: document.querySelector('[data-product-id]')?.getAttribute('data-product-id') || Date.now(),
			name: document.querySelector('.product-title')?.textContent || 'Product',
			price: parseFloat(document.querySelector('.product-price')?.textContent.replace(/[^0-9.]/g, '')) || 0,
			image: document.querySelector('.product-main-image')?.src || '',
			quantity: parseInt(document.querySelector('.quantity-input')?.value) || 1,
			selectedAttributes: {}
		};
		
		// Get selected attributes
		document.querySelectorAll('.attribute-option.selected').forEach(option => {
			const group = option.closest('.attribute-group');
			const label = group?.querySelector('.attribute-label')?.textContent || '';
			const value = option.textContent.trim();
			if (label && value) {
				product.selectedAttributes[label] = value;
			}
		});
		
		return product;
	},
	
	addToCart: function() {
		const product = this.getProductData();
		CartManager.addToCart(product);
	},
	
	buyNow: function() {
		const product = this.getProductData();
		CartManager.addToCart(product);
		window.location.href = 'checkout.html';
	}
};

// Cart Page Functions
const CartPageManager = {
	init: function() {
		this.renderCart();
		this.bindEvents();
	},
	
	renderCart: function() {
		const cart = CartManager.getCart();
		const cartContainer = document.getElementById('cart-items');
		const emptyState = document.getElementById('cart-empty');
		const cartSummary = document.getElementById('cart-summary');
		
		if (!cartContainer) return;
		
		if (cart.length === 0) {
			if (emptyState) emptyState.style.display = 'block';
			if (cartSummary) cartSummary.style.display = 'none';
			cartContainer.innerHTML = '';
			return;
		}
		
		if (emptyState) emptyState.style.display = 'none';
		if (cartSummary) cartSummary.style.display = 'block';
		
		let html = '';
		cart.forEach((item, index) => {
			const attributes = Object.entries(item.selectedAttributes || {})
				.map(([key, value]) => `${key}: ${value}`)
				.join(', ');
			
			html += `
				<div class="cart-item" data-index="${index}">
					<div class="d-flex">
						<img src="${item.image || 'assets/images/noimage.png'}" alt="${item.name}" class="cart-item-img">
						<div class="cart-item-info">
							<div class="cart-item-title">${item.name}</div>
							${attributes ? `<div class="text-muted small mb-2">${attributes}</div>` : ''}
							<div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
							<div class="quantity-controls">
								<button class="quantity-btn decrease" data-index="${index}">-</button>
								<input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
								<button class="quantity-btn increase" data-index="${index}">+</button>
								<button class="btn btn-sm btn-danger ms-auto" onclick="CartPageManager.removeItem(${index})">
									<i class="bi bi-trash"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			`;
		});
		
		cartContainer.innerHTML = html;
		this.updateSummary();
	},
	
	updateSummary: function() {
		const cart = CartManager.getCart();
		const subtotal = CartManager.getCartTotal();
		const shipping = 0; // Calculate shipping if needed
		const total = subtotal + shipping;
		
		const subtotalEl = document.getElementById('cart-subtotal');
		const shippingEl = document.getElementById('cart-shipping');
		const totalEl = document.getElementById('cart-total');
		
		if (subtotalEl) subtotalEl.textContent = 'Rp ' + subtotal.toLocaleString('id-ID');
		if (shippingEl) shippingEl.textContent = 'Rp ' + shipping.toLocaleString('id-ID');
		if (totalEl) totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
	},
	
	bindEvents: function() {
		// Delegate events for dynamic cart items
		document.addEventListener('click', (e) => {
			if (e.target.classList.contains('decrease') || e.target.closest('.decrease')) {
				const btn = e.target.classList.contains('decrease') ? e.target : e.target.closest('.decrease');
				const index = parseInt(btn.getAttribute('data-index'));
				this.decreaseQuantity(index);
			}
			
			if (e.target.classList.contains('increase') || e.target.closest('.increase')) {
				const btn = e.target.classList.contains('increase') ? e.target : e.target.closest('.increase');
				const index = parseInt(btn.getAttribute('data-index'));
				this.increaseQuantity(index);
			}
		});
		
		document.addEventListener('change', (e) => {
			if (e.target.classList.contains('quantity-input')) {
				const index = parseInt(e.target.getAttribute('data-index'));
				const quantity = parseInt(e.target.value) || 1;
				this.updateQuantity(index, quantity);
			}
		});
	},
	
	decreaseQuantity: function(index) {
		const cart = CartManager.getCart();
		if (cart[index] && cart[index].quantity > 1) {
			cart[index].quantity--;
			CartManager.saveCart(cart);
			this.renderCart();
		}
	},
	
	increaseQuantity: function(index) {
		const cart = CartManager.getCart();
		if (cart[index]) {
			cart[index].quantity++;
			CartManager.saveCart(cart);
			this.renderCart();
		}
	},
	
	updateQuantity: function(index, quantity) {
		const cart = CartManager.getCart();
		if (cart[index]) {
			cart[index].quantity = quantity;
			CartManager.saveCart(cart);
			this.renderCart();
		}
	},
	
	removeItem: function(index) {
		const cart = CartManager.getCart();
		if (cart[index]) {
			const item = cart[index];
			cart.splice(index, 1);
			CartManager.saveCart(cart);
			this.renderCart();
		}
	}
};

// Initialize on page load
$(document).ready(function() {
	CartManager.init();
	SearchManager.init();
	NavigationManager.init();
	
	// Initialize page-specific managers
	if (document.querySelector('.product-main-image')) {
		ProductDetailManager.init();
	}
	
	if (document.getElementById('cart-items')) {
		CartPageManager.init();
	}
	
	// Update cart badge periodically
	setInterval(() => {
		CartManager.updateCartBadge();
	}, 1000);
});
