import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, ChevronLeft, ChevronRight, Star, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart, Filter } from 'lucide-react';

// Product Data
const products = [
  {
    id: 1,
    name: "Luminous Glow Serum",
    category: "Serum",
    price: 485000,
    oldPrice: 650000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 234,
    description: "Serum pencerahan dengan Vitamin C murni dan Hyaluronic Acid untuk kulit yang glowing alami.",
    ingredients: ["Vitamin C 20%", "Hyaluronic Acid", "Niacinamide", "Ferulic Acid"],
    howToUse: "Aplikasikan 2-3 tetes pada wajah yang telah dibersihkan, pagi dan malam. Tepuk-tepuk lembut hingga meresap.",
    variants: [
      { size: "15ml", price: 485000 },
      { size: "30ml", price: 850000 }
    ],
    featured: true,
    new: true
  },
  {
    id: 2,
    name: "Cloud Hydrating Moisturizer",
    category: "Moisturizer",
    price: 395000,
    image: "https://images.unsplash.com/photo-1556228852-80e10279bb0e?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 189,
    description: "Pelembab ultra-ringan dengan tekstur cloud-like yang melembabkan tanpa rasa berat.",
    ingredients: ["Ceramide Complex", "Centella Asiatica", "Peptides", "Squalane"],
    howToUse: "Gunakan setelah serum, aplikasikan ke seluruh wajah dan leher dengan gerakan memutar ke atas.",
    variants: [
      { size: "50ml", price: 395000 }
    ],
    featured: true
  },
  {
    id: 3,
    name: "Gentle Milk Cleanser",
    category: "Cleanser",
    price: 285000,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 312,
    description: "Pembersih wajah lembut dengan tekstur susu yang membersihkan tanpa menghilangkan kelembaban alami kulit.",
    ingredients: ["Oat Milk", "Chamomile Extract", "Glycerin", "Aloe Vera"],
    howToUse: "Pijat lembut pada wajah basah, bilas dengan air hangat. Gunakan pagi dan malam.",
    variants: [
      { size: "100ml", price: 285000 },
      { size: "200ml", price: 485000 }
    ],
    featured: true
  },
  {
    id: 4,
    name: "Rose Radiance Toner",
    category: "Toner",
    price: 325000,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 267,
    description: "Toner menyegarkan dengan rose water dan niacinamide untuk pori-pori lebih halus.",
    ingredients: ["Rose Water", "Niacinamide 5%", "Witch Hazel", "Allantoin"],
    howToUse: "Tuang ke kapas atau telapak tangan, tepuk-tepuk lembut ke wajah setelah cleansing.",
    variants: [
      { size: "150ml", price: 325000 }
    ],
    featured: false
  },
  {
    id: 5,
    name: "Silk Sleeping Mask",
    category: "Mask",
    price: 425000,
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=500&fit=crop",
    rating: 5.0,
    reviews: 156,
    description: "Masker malam dengan tekstur silk yang bekerja intensif selama tidur untuk kulit lebih cerah dan kenyal.",
    ingredients: ["Bakuchiol", "Retinol Alternative", "Adenosine", "Lavender Oil"],
    howToUse: "Aplikasikan tipis-tipis sebagai langkah terakhir skincare malam, diamkan semalaman, bilas di pagi hari.",
    variants: [
      { size: "50ml", price: 425000 }
    ],
    featured: false,
    new: true
  },
  {
    id: 6,
    name: "Bamboo Exfoliating Scrub",
    category: "Exfoliator",
    price: 295000,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 198,
    description: "Scrub lembut dengan bamboo charcoal untuk mengangkat sel kulit mati dan mencerahkan.",
    ingredients: ["Bamboo Charcoal", "Jojoba Beads", "Green Tea Extract", "Vitamin E"],
    howToUse: "Gunakan 2-3x seminggu pada wajah basah, pijat memutar selama 1-2 menit, bilas bersih.",
    variants: [
      { size: "75ml", price: 295000 }
    ],
    featured: false
  }
];

const testimonials = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Verified Customer",
    text: "Serum ini benar-benar game changer! Kulit saya jadi lebih cerah dan glowing dalam 2 minggu. Worth every penny!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Dinda Putri",
    role: "Verified Customer",
    text: "Moisturizer favoritku! Ringan banget tapi super melembabkan. Cocok buat kulit kombinasi seperti saya.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Sari Wijaya",
    role: "Verified Customer",
    text: "Produknya natural, packaging cantik, dan yang paling penting hasil nya nyata! Kulit lebih sehat dan kenyal.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop"
  }
];

// Main App Component
export default function SkinCareEcommerce() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Add to cart
  const addToCart = (product, variant = null) => {
    const cartItem = {
      ...product,
      selectedVariant: variant || (product.variants ? product.variants[0] : null),
      quantity: 1,
      cartId: `${product.id}-${variant?.size || 'default'}`
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prev.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
    setCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Update quantity
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.selectedVariant?.price || item.price;
    return sum + (price * item.quantity);
  }, 0);

  // Navigate to product detail
  const viewProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    setSelectedVariant(product.variants ? product.variants[0] : null);
    window.scrollTo(0, 0);
  };

  // Categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Header Component
  const Header = () => (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo" onClick={() => setCurrentPage('home')}>
            <span className="logo-text">LUMIÈRE</span>
            <span className="logo-subtitle">Skincare</span>
          </div>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Home</a>
          <a onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }}>Shop</a>
          <a onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}>About Us</a>
          <a onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}>Contact</a>
        </nav>

        <div className="header-right">
          <button className="icon-btn">
            <Search size={20} />
          </button>
          <button className="icon-btn">
            <User size={20} />
          </button>
          <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // Footer Component
  const Footer = () => (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-text">LUMIÈRE</span>
              <span className="logo-subtitle">Skincare</span>
            </div>
            <p className="footer-desc">
              Premium skincare crafted with natural ingredients for your radiant, healthy skin.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a onClick={() => setCurrentPage('shop')}>Shop All</a></li>
              <li><a onClick={() => setCurrentPage('about')}>About Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a onClick={() => setCurrentPage('contact')}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="newsletter-text">Subscribe for exclusive offers and skincare tips</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Lumière Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Mini Cart Sidebar
  const MiniCart = () => (
    <>
      <div className={`cart-overlay ${cartOpen ? 'active' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`mini-cart ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart ({cartItems.length})</h3>
          <button onClick={() => setCartOpen(false)} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.selectedVariant && (
                    <p className="variant-info">{item.selectedVariant.size}</p>
                  )}
                  <p className="price">{formatPrice(item.selectedVariant?.price || item.price)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span className="total-price">{formatPrice(cartTotal)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="continue-shopping" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );

  // Homepage
  const HomePage = () => (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">New Collection 2024</span>
            <h1 className="hero-title">
              Unveil Your True Beauty
              <span className="accent-text">Embrace the Glow</span>
            </h1>
            <p className="hero-subtitle">
              Discover our luxurious skincare collection crafted with natural ingredients for radiant, healthy skin
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setCurrentPage('shop')}>
                Shop Now
              </button>
              <button className="btn-secondary" onClick={() => setCurrentPage('about')}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1556228852-80e10279bb0e?w=600&h=700&fit=crop" alt="Skincare products" />
              <div className="floating-badge">
                <span className="badge-text">100% Natural</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <span className="section-label">Best Sellers</span>
          <h2>Popular Products</h2>
          <p>Our customers' favorites for glowing, healthy skin</p>
        </div>

        <div className="products-grid">
          {products.filter(p => p.featured).map(product => (
            <div key={product.id} className="product-card" onClick={() => viewProductDetail(product)}>
              {product.new && <span className="product-badge">New</span>}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button className="wishlist-btn">
                  <Heart size={18} />
                </button>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#C9A96E" : "none"} stroke="#C9A96E" />
                  ))}
                  <span>({product.reviews})</span>
                </div>
                <div className="product-price">
                  <span className="current-price">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="old-price">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <button className="btn-secondary" onClick={() => setCurrentPage('shop')}>
            View All Products
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#C9A96E" stroke="#C9A96E" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <Mail size={32} />
          </div>
          <h2>Get 15% Off Your First Order</h2>
          <p>Subscribe to our newsletter for exclusive offers, skincare tips, and product launches</p>
          <div className="newsletter-form-inline">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div className="page shop-page">
      <div className="page-header">
        <h1>Shop All Products</h1>
        <p>Discover our complete collection of premium skincare</p>
      </div>

      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="filter-section">
            <h3><Filter size={18} /> Filter by Category</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="shop-content">
          <div className="shop-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="product-count">{filteredProducts.length} Products</span>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => viewProductDetail(product)}>
                {product.new && <span className="product-badge">New</span>}
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button className="wishlist-btn">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#C9A96E" : "none"} stroke="#C9A96E" />
                    ))}
                    <span>({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn" onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Product Detail Page
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    const relatedProducts = products
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 3);

    return (
      <div className="page product-detail-page">
        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="main-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
          </div>

          <div className="product-details">
            <span className="product-category">{selectedProduct.category}</span>
            <h1>{selectedProduct.name}</h1>

            <div className="product-rating-large">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(selectedProduct.rating) ? "#C9A96E" : "none"} stroke="#C9A96E" />
                ))}
              </div>
              <span>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
            </div>

            <div className="price-section">
              <span className="current-price-large">{formatPrice(selectedVariant?.price || selectedProduct.price)}</span>
              {selectedProduct.oldPrice && (
                <span className="old-price-large">{formatPrice(selectedProduct.oldPrice)}</span>
              )}
            </div>

            <p className="product-description">{selectedProduct.description}</p>

            {selectedProduct.variants && selectedProduct.variants.length > 1 && (
              <div className="variant-selector">
                <h4>Select Size:</h4>
                <div className="variant-options">
                  {selectedProduct.variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`variant-btn ${selectedVariant?.size === variant.size ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.size}
                      <span className="variant-price">{formatPrice(variant.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="add-to-cart-btn-large"
              onClick={() => addToCart(selectedProduct, selectedVariant)}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <div className="product-info-tabs">
              <div className="info-section">
                <h4>Ingredients</h4>
                <ul className="ingredients-list">
                  {selectedProduct.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h4>How to Use</h4>
                <p>{selectedProduct.howToUse}</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => viewProductDetail(product)}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <div className="product-price">
                      <span className="current-price">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div className="page about-page">
      <div className="page-header">
        <h1>About Lumière</h1>
        <p>Our Story, Our Mission, Our Values</p>
      </div>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-label">Our Story</span>
            <h2>Crafted with Love, Inspired by Nature</h2>
            <p>
              Lumière was born from a simple belief: that true beauty comes from within, and skincare should nurture both your skin and soul. Founded in 2020, we set out to create a skincare line that combines the wisdom of natural ingredients with modern science.
            </p>
            <p>
              Every product is carefully formulated with premium, ethically-sourced ingredients. We believe in transparency, sustainability, and the transformative power of self-care rituals.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=500&fit=crop" alt="About us" />
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌿</div>
            <h3>100% Natural</h3>
            <p>We use only the finest natural and organic ingredients, free from harmful chemicals.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🐰</div>
            <h3>Cruelty-Free</h3>
            <p>Never tested on animals. We're proud to be a cruelty-free brand.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">♻️</div>
            <h3>Sustainable</h3>
            <p>Eco-friendly packaging and sustainable practices in everything we do.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✨</div>
            <h3>Effective Results</h3>
            <p>Science-backed formulations that deliver visible, lasting results.</p>
          </div>
        </div>
      </section>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="page contact-page">
      <div className="page-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>

        <div className="contact-info-section">
          <h2>Contact Information</h2>
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <Mail size={24} />
              <h4>Email</h4>
              <p>hello@lumiere-skincare.com</p>
            </div>
            <div className="contact-info-card">
              <Phone size={24} />
              <h4>WhatsApp</h4>
              <p>+62 812-3456-7890</p>
            </div>
            <div className="contact-info-card">
              <MapPin size={24} />
              <h4>Address</h4>
              <p>Jl. Sudirman No. 123<br/>Jakarta, Indonesia</p>
            </div>
          </div>

          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-links-large">
              <a href="#" className="social-link">
                <Instagram size={24} />
                <span>@lumiere.skincare</span>
              </a>
              <a href="#" className="social-link">
                <Facebook size={24} />
                <span>Lumière Skincare</span>
              </a>
              <a href="#" className="social-link">
                <Twitter size={24} />
                <span>@lumiereskin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Header />
      <MiniCart />
      
      <main className="main-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --color-cream: #FAF8F3;
          --color-beige: #F5EFE7;
          --color-gold: #C9A96E;
          --color-gold-dark: #B8935C;
          --color-pink: #E8C4C4;
          --color-pink-light: #F5E6E6;
          --color-sage: #B8C5B8;
          --color-text: #2C2C2C;
          --color-text-light: #666666;
          --color-white: #FFFFFF;
          --color-border: #E5E5E5;
          
          --font-display: 'Playfair Display', serif;
          --font-body: 'Poppins', sans-serif;
          
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
          --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
          
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          font-family: var(--font-body);
          color: var(--color-text);
          background: var(--color-cream);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding-top: 80px;
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--color-white);
          border-bottom: 1px solid var(--color-border);
          z-index: 1000;
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.2rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
        }

        .logo {
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: 0.02em;
        }

        .logo-subtitle {
          font-family: var(--font-body);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          text-transform: uppercase;
          margin-top: -0.3rem;
        }

        .nav {
          display: flex;
          gap: 2.5rem;
        }

        .nav a {
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--color-text);
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          letter-spacing: 0.03em;
        }

        .nav a::after {
          content: '';
          position: absolute;
          bottom: -0.3rem;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-gold);
          transition: var(--transition);
        }

        .nav a:hover {
          color: var(--color-gold);
        }

        .nav a:hover::after {
          width: 100%;
        }

        .header-right {
          display: flex;
          gap: 1.2rem;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
          transition: var(--transition);
          position: relative;
        }

        .icon-btn:hover {
          color: var(--color-gold);
          transform: scale(1.1);
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--color-gold);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Mini Cart */
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1998;
          opacity: 0;
          pointer-events: none;
          transition: var(--transition);
          backdrop-filter: blur(2px);
        }

        .cart-overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        .mini-cart {
          position: fixed;
          top: 0;
          right: -450px;
          width: 450px;
          height: 100vh;
          background: var(--color-white);
          z-index: 1999;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
        }

        .mini-cart.open {
          right: 0;
        }

        .cart-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--color-text);
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
          transition: var(--transition);
        }

        .close-btn:hover {
          color: var(--color-gold);
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--color-text-light);
          gap: 1rem;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          margin-bottom: 1rem;
          position: relative;
          transition: var(--transition);
        }

        .cart-item:hover {
          box-shadow: var(--shadow-sm);
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-details h4 {
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 0.3rem;
        }

        .variant-info {
          font-size: 0.8rem;
          color: var(--color-text-light);
          margin-bottom: 0.5rem;
        }

        .cart-item-details .price {
          font-weight: 600;
          color: var(--color-gold);
          margin-bottom: 0.8rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .quantity-controls button {
          width: 28px;
          height: 28px;
          border: 1px solid var(--color-border);
          background: var(--color-white);
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }

        .quantity-controls button:hover {
          background: var(--color-gold);
          color: white;
          border-color: var(--color-gold);
        }

        .quantity-controls span {
          min-width: 30px;
          text-align: center;
          font-weight: 500;
        }

        .remove-btn {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-light);
          transition: var(--transition);
        }

        .remove-btn:hover {
          color: #e74c3c;
        }

        .cart-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--color-border);
          background: var(--color-beige);
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .total-price {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          background: var(--color-gold);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin-bottom: 0.8rem;
          font-size: 1rem;
        }

        .checkout-btn:hover {
          background: var(--color-gold-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .continue-shopping {
          width: 100%;
          padding: 1rem;
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
        }

        .continue-shopping:hover {
          background: var(--color-beige);
        }

        /* Page Styles */
        .page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .page-header h1 {
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--color-text);
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.1rem;
          color: var(--color-text-light);
        }

        /* Hero Section */
        .hero {
          margin-bottom: 5rem;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-label {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: var(--color-pink-light);
          color: var(--color-text);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 3.5rem;
          line-height: 1.2;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          animation: slideInLeft 0.8s ease-out 0.2s backwards;
        }

        .accent-text {
          display: block;
          color: var(--color-gold);
          font-style: italic;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-light);
          margin-bottom: 2.5rem;
          line-height: 1.8;
          animation: slideInLeft 0.8s ease-out 0.4s backwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          animation: slideInLeft 0.8s ease-out 0.6s backwards;
        }

        .btn-primary {
          padding: 1rem 2.5rem;
          background: var(--color-gold);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
        }

        .btn-primary:hover {
          background: var(--color-gold-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--color-text);
          border: 2px solid var(--color-text);
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
        }

        .btn-secondary:hover {
          background: var(--color-text);
          color: white;
          transform: translateY(-2px);
        }

        .hero-image-wrapper {
          position: relative;
          animation: slideInRight 0.8s ease-out 0.4s backwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-image img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
        }

        .floating-badge {
          position: absolute;
          top: 2rem;
          right: -1rem;
          background: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          box-shadow: var(--shadow-md);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .badge-text {
          font-weight: 600;
          color: var(--color-gold);
          letter-spacing: 0.05em;
        }

        /* Section Styles */
        .featured-products {
          margin-bottom: 5rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-label {
          display: inline-block;
          color: var(--color-gold);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }

        .section-header h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--color-text);
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--color-text-light);
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          border: 1px solid var(--color-border);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--color-gold);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 10;
        }

        .product-image {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: var(--color-beige);
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .wishlist-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .wishlist-btn:hover {
          background: var(--color-pink-light);
          transform: scale(1.1);
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-category {
          font-size: 0.8rem;
          color: var(--color-text-light);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .product-info h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text);
          margin: 0.5rem 0;
          font-family: var(--font-body);
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin: 0.8rem 0;
        }

        .product-rating span {
          font-size: 0.85rem;
          color: var(--color-text-light);
          margin-left: 0.3rem;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin: 1rem 0;
        }

        .current-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-gold);
          font-family: var(--font-display);
        }

        .old-price {
          font-size: 1rem;
          color: var(--color-text-light);
          text-decoration: line-through;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 0.9rem;
          background: var(--color-text);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-size: 0.95rem;
        }

        .add-to-cart-btn:hover {
          background: var(--color-gold);
          transform: translateY(-2px);
        }

        .view-all-container {
          text-align: center;
        }

        /* Testimonials */
        .testimonials {
          background: var(--color-beige);
          padding: 5rem 3rem;
          border-radius: 24px;
          margin-bottom: 5rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-text {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text);
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .testimonial-author img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .testimonial-author h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .testimonial-author span {
          font-size: 0.85rem;
          color: var(--color-text-light);
        }

        /* Newsletter */
        .newsletter-section {
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
          padding: 4rem 3rem;
          border-radius: 24px;
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }

        .newsletter-icon {
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .newsletter-section h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .newsletter-section p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .newsletter-form-inline {
          display: flex;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
          justify-content: center;
        }

        .newsletter-form-inline input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-family: var(--font-body);
        }

        .newsletter-form-inline .btn-primary {
          background: var(--color-text);
          white-space: nowrap;
        }

        .newsletter-form-inline .btn-primary:hover {
          background: var(--color-white);
          color: var(--color-gold);
        }

        /* Shop Page */
        .shop-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 3rem;
        }

        .shop-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .filter-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-filters {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .category-btn {
          padding: 0.8rem 1.2rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
          font-size: 0.95rem;
        }

        .category-btn:hover {
          background: var(--color-beige);
          border-color: var(--color-gold);
        }

        .category-btn.active {
          background: var(--color-gold);
          color: white;
          border-color: var(--color-gold);
        }

        .shop-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .search-box {
          flex: 1;
          max-width: 400px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 0.8rem 1.2rem;
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
        }

        .product-count {
          color: var(--color-text-light);
          font-size: 0.95rem;
        }

        /* Product Detail */
        .product-detail-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .product-gallery {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .main-image img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
        }

        .product-details {
          padding: 2rem 0;
        }

        .product-details .product-category {
          font-size: 0.9rem;
          color: var(--color-text-light);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .product-details h1 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--color-text);
          margin: 1rem 0;
        }

        .product-rating-large {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .product-rating-large .stars {
          display: flex;
          gap: 0.3rem;
        }

        .product-rating-large span {
          color: var(--color-text-light);
        }

        .price-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .current-price-large {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-gold);
        }

        .old-price-large {
          font-size: 1.5rem;
          color: var(--color-text-light);
          text-decoration: line-through;
        }

        .product-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text);
          margin: 2rem 0;
          padding: 2rem;
          background: var(--color-beige);
          border-radius: 12px;
        }

        .variant-selector {
          margin: 2rem 0;
        }

        .variant-selector h4 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .variant-options {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .variant-btn {
          padding: 1rem 1.5rem;
          background: white;
          border: 2px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-body);
        }

        .variant-btn:hover {
          border-color: var(--color-gold);
        }

        .variant-btn.active {
          border-color: var(--color-gold);
          background: var(--color-pink-light);
        }

        .variant-price {
          font-size: 0.85rem;
          color: var(--color-text-light);
        }

        .add-to-cart-btn-large {
          width: 100%;
          padding: 1.2rem;
          background: var(--color-gold);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          margin: 2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .add-to-cart-btn-large:hover {
          background: var(--color-gold-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .product-info-tabs {
          margin-top: 3rem;
        }

        .info-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          border: 1px solid var(--color-border);
        }

        .info-section h4 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .ingredients-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
        }

        .ingredients-list li {
          padding: 0.8rem 1rem;
          background: var(--color-beige);
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .info-section p {
          line-height: 1.8;
          color: var(--color-text);
        }

        .related-products {
          margin-top: 4rem;
        }

        .related-products h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        /* About Page */
        .about-content {
          margin-bottom: 4rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-text h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text);
          margin-bottom: 1.5rem;
        }

        .about-image img {
          width: 100%;
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
        }

        .values-section {
          margin-top: 5rem;
        }

        .values-section h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .value-card {
          text-align: center;
          padding: 2.5rem 2rem;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--color-border);
          transition: var(--transition);
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .value-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .value-card p {
          color: var(--color-text-light);
          line-height: 1.6;
        }

        /* Contact Page */
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-form-section h2,
        .contact-info-section h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: var(--color-text);
        }

        .form-group input,
        .form-group textarea {
          padding: 1rem;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 1rem;
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .contact-info-card {
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: var(--transition);
        }

        .contact-info-card:hover {
          box-shadow: var(--shadow-sm);
        }

        .contact-info-card svg {
          color: var(--color-gold);
          margin-top: 0.3rem;
        }

        .contact-info-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .contact-info-card p {
          color: var(--color-text-light);
          line-height: 1.6;
        }

        .social-section h3 {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
        }

        .social-links-large {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          text-decoration: none;
          color: var(--color-text);
          transition: var(--transition);
        }

        .social-link:hover {
          background: var(--color-beige);
          border-color: var(--color-gold);
        }

        .social-link svg {
          color: var(--color-gold);
        }

        /* Footer */
        .footer {
          background: var(--color-text);
          color: white;
          padding: 4rem 2rem 2rem;
          margin-top: 5rem;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .footer-logo .logo-text {
          color: white;
        }

        .footer-desc {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: var(--transition);
        }

        .social-icon:hover {
          background: var(--color-gold);
          transform: translateY(-3px);
        }

        .footer-col h4 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: white;
        }

        .footer-col ul {
          list-style: none;
        }

        .footer-col ul li {
          margin-bottom: 0.8rem;
        }

        .footer-col ul li a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: var(--transition);
          cursor: pointer;
        }

        .footer-col ul li a:hover {
          color: var(--color-gold);
        }

        .newsletter-text {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .newsletter-form input {
          padding: 0.8rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-family: var(--font-body);
        }

        .newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-form button {
          padding: 0.8rem;
          background: var(--color-gold);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .newsletter-form button:hover {
          background: var(--color-gold-dark);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
          }

          .hero-image {
            order: -1;
          }

          .shop-container {
            grid-template-columns: 1fr;
          }

          .shop-sidebar {
            position: static;
          }

          .product-detail-container {
            grid-template-columns: 1fr;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .contact-container {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 1rem;
          }

          .nav {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 80%;
            max-width: 300px;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            transition: var(--transition);
            z-index: 999;
          }

          .nav.nav-open {
            left: 0;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mini-cart {
            width: 100%;
            right: -100%;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .newsletter-form-inline {
            flex-direction: column;
          }

          .value-card {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
