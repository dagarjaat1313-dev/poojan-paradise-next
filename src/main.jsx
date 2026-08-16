import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Truck,
  User,
  LogOut,
  ArrowRight,
  Leaf,
  Package,
  Lock,
  Headphones,
  Flame,
  Sparkles,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react'

import { products } from './products'
import { supabase } from './lib/supabase'
import './styles.css'

const waNumber = '919999999999'

const kitItems = [
  'Camphor — 250gm',
  'Laal & Peela Kapda',
  'Dhoop Batti',
  'Chota Perfume / Itra',
  'Roli — 1 packet',
  'Laal Chunri — 1',
  'Chandan Tika — 1',
  'Pooja Ghee — 150gm',
  'Cotton Batti — 1 packet'
]

const categoryIcons = {
  Cloth: '🧣',
  'Pooja Essentials': '🪔',
  'Eco-Friendly': '🌿',
  Incense: '🕯️',
  Fragrance: '🌸',
  Wicks: '🔥',
  Oil: '🪔',
  Hawan: '🔥',
  Sindoor: '🔴',
  'Pooja Kits': '🎁',
  Mala: '📿',
  Asan: '🧘'
}

const categoryImageFallbacks = {
  Cloth: '/products/01-peela-kapda.jpg',
  'Pooja Essentials': '/products/03-pooja-ghee.jpg',
  'Eco-Friendly': '/products/04-gobar-cups-diya.jpg',
  Incense: '/products/07-dhoop.jpg',
  Fragrance: '/products/08-perfumes-itra.jpg',
  Wicks: '/products/11-cotton-batti.jpg',
  Oil: '/products/13-chameli-pooja-oil.jpg',
  Hawan: '/products/17-hawan-samagri.jpg',
  Sindoor: '/products/18-orange-sindoor.jpg',
  'Pooja Kits': '/products/20-nav-grah-poojan.jpg',
  Mala: '/products/28-rudraksh-mala.jpg',
  Asan: '/products/31-red-ooni-asan.jpg'
}

function getCategoryImage(category) {
  return (
    products.find((product) => product.category === category)?.image ||
    categoryImageFallbacks[category]
  )
}

function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name
            }
          }
        })

        if (error) {
          setMessage(error.message)
        } else if (data.session) {
          setMessage('Account created successfully.')
          setTimeout(onClose, 700)
        } else {
          setMessage(
            'Account created. Please check your email to verify your account.'
          )
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          setMessage(error.message)
        } else {
          setMessage('Login successful.')
          setTimeout(onClose, 700)
        }
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <img
          src="/logo.png"
          className="auth-logo"
          alt="Poojan Paradise"
        />

        <h2>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <p>
          {mode === 'login'
            ? 'Login to your Poojan Paradise account'
            : 'Join Poojan Paradise today'}
        </p>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="gold-btn auth-submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? 'Login'
                : 'Create Account'}
          </button>
        </form>

        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}

        <button
          className="switch-auth"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setMessage('')
          }}
        >
          {mode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  )
}

function CartDrawer({
  cart,
  open,
  onClose,
  change,
  remove,
  orderWhatsApp
}) {
  if (!open) return null

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span className="mini-label">
              POOJAN PARADISE
            </span>
            <h2>Your Cart</h2>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {!cart.length ? (
          <div className="empty-cart">
            <ShoppingBag size={52} />

            <h3>Your cart is empty</h3>

            <p>
              Add some divine essentials to continue.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>🪔</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <strong>{item.name}</strong>

                    <small>
                      ₹{item.price} • {item.unit}
                    </small>

                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          change(item.id, -1)
                        }
                      >
                        <Minus size={14} />
                      </button>

                      <b>{item.qty}</b>

                      <button
                        onClick={() =>
                          change(item.id, 1)
                        }
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          remove(item.id)
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <button
              className="whatsapp-btn cart-whatsapp"
              onClick={orderWhatsApp}
            >
              <MessageCircle size={19} />
              Order Cart on WhatsApp
            </button>
          </>
        )}
      </aside>
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setUser(data.session?.user || null)
      }
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const categories = useMemo(
    () => [
      'All',
      ...new Set(products.map((p) => p.category))
    ],
    []
  )

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        category === 'All' ||
        p.category === category

      const searchMatch =
        p.name
          .toLowerCase()
          .includes(query.toLowerCase())

      return categoryMatch && searchMatch
    })
  }, [category, query])

  const featured = products.slice(0, 6)

  const add = (product) => {
    setCart((current) => {
      const found = current.find(
        (x) => x.id === product.id
      )

      if (found) {
        return current.map((x) =>
          x.id === product.id
            ? {
                ...x,
                qty: x.qty + 1
              }
            : x
        )
      }

      return [
        ...current,
        {
          ...product,
          qty: 1
        }
      ]
    })
  }

  const change = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty + delta
              }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const remove = (id) => {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.qty,
    0
  )

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const orderWhatsApp = (
    items = cart,
    title = 'Poojan Paradise Order'
  ) => {
    if (!items.length) return

    const lines = items
      .map(
        (item) =>
          `• ${item.name} × ${item.qty} — ₹${item.price} (${item.unit})`
      )
      .join('\n')

    const total = items.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    )

    const message = `Namaste Poojan Paradise!

${title}

${lines}

Total: ₹${total}

Please share delivery details.`

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        message
      )}`,
      '_blank'
    )
  }

  const scrollToShop = () => {
    document
      .getElementById('shop')
      ?.scrollIntoView({
        behavior: 'smooth'
      })
  }

  const scrollToKit = () => {
    document
      .getElementById('kit')
      ?.scrollIntoView({
        behavior: 'smooth'
      })
  }

  return (
    <div className="site">

      {/* TOP BAR */}

      <div className="topbar">
        <div>
          || Shuddh Samagri • Shreshth Seva • Bhakti Har Ghar Tak ||
        </div>

        <div className="topbar-right">
          <span>◉ Track Order</span>
          <span>◉ Help</span>
          <span>☎ +91 99999 99999</span>
        </div>
      </div>

      {/* HEADER */}

      <header className="main-header">
        <div className="header-inner">

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <a
            href="#home"
            className="brand"
          >
            <img
              src="/logo.png"
              alt="Poojan Paradise"
            />

            <div className="brand-text">
              <strong>
                POOJAN PARADISE
              </strong>

              <small>
                Shuddh Samagri • Shreshth Seva
              </small>
            </div>
          </a>

          <nav
            className={
              menuOpen
                ? 'nav open'
                : 'nav'
            }
          >
            <a
              href="#home"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Home
            </a>

            <a
              href="#shop"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Shop
            </a>

            <a
              href="#kit"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Poojan Kit
            </a>

            <a
              href="#offers"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Offers
            </a>

            <a
              href="#about"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              About Us
            </a>

            <a
              href="#contact"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Contact
            </a>
          </nav>

          <div className="header-icons">

            <button
              className="header-icon"
              onClick={scrollToShop}
            >
              <Search />
            </button>

            {user ? (
              <button
                className="header-icon"
                title="Logout"
                onClick={logout}
              >
                <LogOut />
              </button>
            ) : (
              <button
                className="header-icon"
                title="Login"
                onClick={() =>
                  setAuthOpen(true)
                }
              >
                <User />
              </button>
            )}

            <button
              className="header-icon cart-icon"
              onClick={() =>
                setCartOpen(true)
              }
            >
              <ShoppingBag />

              {cartCount > 0 && (
                <b>{cartCount}</b>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* HERO */}

      <section
        id="home"
        className="hero"
      >
        <div className="hero-background-glow"></div>

        <div className="hero-inner">

          <div className="hero-copy">

            <span className="gold-eyebrow">
              <Sparkles size={15} />
              SHUDDH SAMAGRI • SHRESHTH SEVA
            </span>

            <h1>
              Pure Devotion,
              <br />
              <em>
                Better Tomorrow
              </em>
            </h1>

            <p className="hero-subtitle">
              Your One Stop Shop For
              <br />
              All Pooja Needs
            </p>

            <div className="hero-features">

              <div>
                <Leaf />

                <span>
                  <b>
                    100% Authentic
                  </b>
                  Products
                </span>
              </div>

              <div>
                <Package />

                <span>
                  <b>
                    Trusted by
                  </b>
                  10,000+ Families
                </span>
              </div>

              <div>
                <Truck />

                <span>
                  <b>
                    Pan India
                  </b>
                  Delivery
                </span>
              </div>

            </div>

            <button
              className="gold-hero-btn"
              onClick={scrollToShop}
            >
              Shop Now
              <ArrowRight size={20} />
            </button>

          </div>

          <div className="hero-visual">
            <img
              src="/hero-pooja.png"
              alt="Poojan Paradise Pooja Setup"
              className="hero-main-image"
            />
          </div>

        </div>
      </section>

      {/* CATEGORY */}

      <section className="category-section">

        <div className="ornament-title">
          <span>❧</span>

          <h2>
            Shop By Category
          </h2>

          <span>❧</span>
        </div>

        <div className="category-grid">

          {categories
            .filter((x) => x !== 'All')
            .slice(0, 9)
            .map((cat) => (
              <button
                className="category-card"
                key={cat}
                onClick={() => {
                  setCategory(cat)
                  scrollToShop()
                }}
              >

                <div className="category-circle">

                  {getCategoryImage(cat) ? (
                    <img
                      src={getCategoryImage(cat)}
                      alt={cat}
                    />
                  ) : (
                    <span>
                      {categoryIcons[cat] || '🪔'}
                    </span>
                  )}

                </div>

                <strong>
                  {cat}
                </strong>

              </button>
            ))}

        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="featured-section">

        <div className="section-heading-row">

          <div className="ornament-title">

            <span>❧</span>

            <h2>
              Featured Products
            </h2>

            <span>❧</span>

          </div>

          <button
            className="view-all"
            onClick={scrollToShop}
          >
            View All
            <ArrowRight size={17} />
          </button>

        </div>

        <div className="featured-grid">

          {featured.map((p) => (
            <article
              className="featured-card"
              key={p.id}
            >

              <div className="featured-image">

                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                  />
                ) : (
                  <div className="image-placeholder">
                    🪔
                  </div>
                )}

              </div>

              <div className="featured-body">

                <h3>
                  {p.name}
                </h3>

                <strong className="featured-price">
                  ₹{p.price}
                </strong>

                <div className="rating">
                  <span>
                    ★★★★★
                  </span>

                  <small>
                    4.9/5
                  </small>
                </div>

                <button
                  className="dark-add-btn"
                  onClick={() =>
                    add(p)
                  }
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>

              </div>

            </article>
          ))}

        </div>
      </section>

      {/* PREMIUM KIT */}

      <section
        id="kit"
        className="kit-banner"
      >

        <div className="kit-image">

          <div className="kit-photo">

            <div className="kit-collage">

              {[
                '/products/03-pooja-ghee.jpg',
                '/products/05-kapoor-bheem-seni.jpg',
                '/products/07-dhoop.jpg',
                '/products/08-perfumes-itra.jpg',
                '/products/10-roli.jpg',
                '/products/14-lal-chunri.jpg',
                '/products/16-tika-chandan.jpg',
                '/products/11-cotton-batti.jpg'
              ].map((src, index) => (
                <div
                  className="kit-collage-item"
                  key={src}
                >
                  <img
                    src={src}
                    alt={`Poojan Kit item ${index + 1}`}
                  />
                </div>
              ))}

            </div>

            <div className="kit-photo-overlay">
              <span>
                POOJAN
              </span>

              <b>
                PREMIUM KIT
              </b>
            </div>

          </div>

          <div className="best-value">
            Best
            <br />
            Value
          </div>

        </div>

        <div className="kit-content">

          <div className="kit-heading-row">

            <div>

              <span className="gold-eyebrow">
                POOJAN PARADISE
              </span>

              <h2>
                Premium Poojan Kit
              </h2>

              <p>
                Complete Pooja Essentials
                for Your Home
              </p>

            </div>

            <strong className="kit-price">
              ₹1,299
            </strong>

          </div>

          <div className="kit-benefits">

            <span>
              <Leaf size={18} />
              Pure
            </span>

            <span>
              <Package size={18} />
              Complete
            </span>

            <span>
              <Sparkles size={18} />
              Auspicious
            </span>

          </div>

          <h3>
            What's Inside?
          </h3>

          <div className="kit-list">

            {kitItems.map((item) => (
              <div key={item}>
                <span>✓</span>
                {item}
              </div>
            ))}

          </div>

          <div className="kit-buttons">

            <button
              className="outline-btn"
              onClick={scrollToShop}
            >
              View Full Details
            </button>

            <button
              className="gold-btn"
              onClick={() =>
                orderWhatsApp(
                  [
                    {
                      id: 'kit-1299',
                      name: 'Premium Poojan Kit',
                      price: 1299,
                      unit: '1 kit',
                      qty: 1
                    }
                  ],
                  'Premium Poojan Kit'
                )
              }
            >
              <ShoppingBag size={17} />
              Order Kit
            </button>

          </div>

        </div>
      </section>

      {/* COIN OFFER */}

      <section
        id="offers"
        className="coin-offer-section"
      >

        <div className="ornament-title">
          <span>❧</span>

          <h2>
            Special Poojan Paradise Offer
          </h2>

          <span>❧</span>
        </div>

        <div className="coin-offer-card">

          <div className="coin-visual">

            <div className="coin-glow"></div>

            <img
              src="/shagun coin.png"
              alt="Shagun Coin"
              className="shagun-coin"
            />

            <img
              src="/para coin.png"
              alt="Para Coin"
              className="para-coin"
            />

          </div>

          <div className="coin-offer-content">

            <span className="gold-eyebrow">
              FOUNDING MEMBER PROGRAM
            </span>

            <h2>
              Shagun Coin & Para Coin
            </h2>

            <p>
              Purchase the Premium Poojan Kit
              and become part of the Poojan Paradise
              Founding Member family.
            </p>

            <div className="offer-steps">

              <div>
                <strong>
                  01
                </strong>

                <span>
                  Purchase the special
                  ₹1,299 Poojan Kit.
                </span>
              </div>

              <div>
                <strong>
                  02
                </strong>

                <span>
                  Receive your digital
                  Shagun Coin.
                </span>
              </div>

              <div>
                <strong>
                  03
                </strong>

                <span>
                  Reach the required
                  Founding Leader milestone.
                </span>
              </div>

            </div>

            <button
              className="gold-btn"
              onClick={scrollToKit}
            >
              Join Program
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE */}

      <section className="why-section">

        <div className="ornament-title">

          <span>❧</span>

          <h2>
            Why Choose Poojan Paradise?
          </h2>

          <span>❧</span>

        </div>

        <div className="why-grid">

          <div className="why-item">
            <div>
              <Leaf />
            </div>

            <strong>
              100% Authentic
            </strong>

            <span>
              Products
            </span>
          </div>

          <div className="why-item">
            <div>
              <Flame />
            </div>

            <strong>
              Inspired by
            </strong>

            <span>
              Sanatan Values
            </span>
          </div>

          <div className="why-item">
            <div>
              <Lock />
            </div>

            <strong>
              Secure
            </strong>

            <span>
              Payments
            </span>
          </div>

          <div className="why-item">
            <div>
              <Truck />
            </div>

            <strong>
              Fast & Safe
            </strong>

            <span>
              Delivery
            </span>
          </div>

          <div className="why-item">
            <div>
              <Headphones />
            </div>

            <strong>
              Dedicated
            </strong>

            <span>
              Customer Support
            </span>
          </div>

        </div>
      </section>

      {/* ABOUT US / FOUNDING MEMBER PROGRAM */}

      <section
        id="about"
        className="about-section"
      >

        <div className="about-logo">
          <img
            src="/logo.png"
            alt="Poojan Paradise"
          />
        </div>

        <div className="about-copy">

          <span className="gold-eyebrow">
            POOJAN PARADISE
          </span>

          <h2>
            Purity in Devotion,
            <br />
            <em>
              Prosperity in Growth!
            </em>
          </h2>

          <p>
            Welcome to Poojan Paradise. Our mission is to
            bring 100% pure and authentic pooja essentials
            to every household.
          </p>

          <p>
            As a growing startup, we are looking for
            passionate early leaders to join us as
            Founding Members to help build our brand
            foundation, drive marketing, and spread our
            sacred mission.
          </p>

          <h3>
            🌟 What is the Founding Member Loyalty Program?
          </h3>

          <p>
            It is more than just a loyalty program—it is an
            exclusive partnership to earn through marketing
            and sales. By helping us reach more homes, you
            can unlock up to <strong>₹21,000 in total
            benefits!</strong>
          </p>

          <h3>
            💰 How It Works
          </h3>

          <div className="about-program">

            <div>
              <strong>
                Get Started — Shagun Coin
              </strong>

              <span>
                Purchase our special ₹1,299 Kit to join
                the loyalty program and instantly receive
                a digital Shagun Coin.
              </span>
            </div>

            <div>
              <strong>
                Become a Founding Leader — Para Coin
              </strong>

              <span>
                Help sell 100 kits and purchase 9 additional
                kits — a total milestone of 110 kits —
                to unlock your Para Coin.
              </span>
            </div>

          </div>

          <h3>
            💰 Total Benefit Breakdown — ₹21,000
          </h3>

          <div className="about-benefits">

            <div>
              <strong>
                ₹18,500
              </strong>

              <span>
                Direct Cash / Cashback
              </span>
            </div>

            <div>
              <strong>
                ₹2,500
              </strong>

              <span>
                Shopping Vouchers redeemable for pure
                pooja products on our site.
              </span>
            </div>

          </div>

          <h3>
            🤝 Why Join as a Founding Member?
          </h3>

          <div className="about-reasons">

            <div>
              <strong>
                Be a Brand Pioneer
              </strong>

              <span>
                Become part of our core founding network
                from day one.
              </span>
            </div>

            <div>
              <strong>
                Promote Authentic Tradition
              </strong>

              <span>
                Help deliver genuine, high-quality pooja
                items to families.
              </span>
            </div>

            <div>
              <strong>
                Earn on Your Terms
              </strong>

              <span>
                Leverage your networking skills to generate
                strong passive income without huge capital
                investments.
              </span>
            </div>

          </div>

          <p className="about-note">
            <strong>Note:</strong> This founding leadership
            program is strictly limited to the first
            5,500 leaders.
          </p>

          <button
            className="gold-btn"
            onClick={scrollToKit}
          >
            Join Loyalty Program & Earn ₹21,000
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="testimonial">

          <div className="quote">
            “
          </div>

          <p>
            Purity in devotion, prosperity in growth.
            Join the Poojan Paradise founding family
            and help bring authentic pooja essentials
            to every household.
          </p>

          <div className="reviewer">

            <div className="avatar">
              PP
            </div>

            <div>
              <strong>
                Poojan Paradise
              </strong>

              <small>
                Founding Member Program
              </small>
            </div>

            <span className="stars">
              ★★★★★
            </span>

          </div>

        </div>

      </section>

      {/* SHOP */}

      <section
        id="shop"
        className="shop-section"
      >

        <div className="shop-heading">

          <div>

            <span className="gold-eyebrow">
              OUR COLLECTION
            </span>

            <h2>
              Shop All Pooja Essentials
            </h2>

          </div>

          <div className="search-box">

            <Search size={18} />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search products..."
            />

          </div>

        </div>

        <div className="shop-chips">

          {categories.map((cat) => (
            <button
              key={cat}
              className={
                category === cat
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCategory(cat)
              }
            >
              {cat}
            </button>
          ))}

        </div>

        <div className="products-grid">

          {filtered.map((p) => (
            <article
              className="product-card"
              key={p.id}
            >

              <div className="product-image">

                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                  />
                ) : (
                  <div className="image-placeholder">
                    🪔
                  </div>
                )}

              </div>

              <div className="product-info">

                <span className="product-category">
                  {p.category}
                </span>

                <h3>
                  {p.name}
                </h3>

                <p>
                  Premium quality •
                  Poojan Paradise
                </p>

                <div className="price-quantity">

                  <div>
                    <small>
                      PRICE
                    </small>

                    <strong>
                      ₹{p.price}
                    </strong>
                  </div>

                  <div>
                    <small>
                      QUANTITY
                    </small>

                    <strong>
                      {p.unit || '1 pc'}
                    </strong>
                  </div>

                </div>

                <button
                  className="product-add"
                  onClick={() =>
                    add(p)
                  }
                >
                  <Plus size={17} />
                  Add
                </button>

              </div>

            </article>
          ))}

        </div>

        {!filtered.length && (
          <div className="empty-products">

            <ShoppingBag size={40} />

            <h3>
              No products found
            </h3>

            <p>
              Try another search
              or category.
            </p>

          </div>
        )}

      </section>

      {/* FOOTER */}

      <footer
        id="contact"
        className="footer"
      >

        <div className="footer-inner">

          <div className="footer-brand">

            <img
              src="/logo.png"
              alt="Poojan Paradise"
            />

            <h2>
              POOJAN PARADISE
            </h2>

            <p>
              Shuddh Samagri •
              Shreshth Seva
            </p>

            <strong>
              Bhakti Har Ghar Tak ❤️
            </strong>

          </div>

          <div>
            <h4>
              Quick Links
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#shop">
              Shop
            </a>

            <a href="#kit">
              Poojan Kit
            </a>

            <a href="#offers">
              Offers
            </a>

            <a href="#about">
              About Us
            </a>
          </div>

          <div>
            <h4>
              Customer Care
            </h4>

            <a href="#contact">
              Track Order
            </a>

            <a href="#contact">
              Shipping Policy
            </a>

            <a href="#contact">
              Return & Refund
            </a>

            <a href="#contact">
              FAQ
            </a>

            <a href="#contact">
              Contact Us
            </a>
          </div>

          <div className="footer-social">

            <h4>
              Follow Us
            </h4>

            <div className="social-icons">

              <a href="#contact">
                <Instagram />
              </a>

              <a href="#contact">
                <Youtube />
              </a>

              <a href="#contact">
                <Facebook />
              </a>

              <a href="#contact">
                <MessageCircle />
              </a>

            </div>

            <h4 className="subscribe-title">
              Subscribe for Latest Offers
            </h4>

            <div className="subscribe">

              <input
                placeholder="Enter your email"
              />

              <button>
                Subscribe
              </button>

            </div>

          </div>

        </div>

        <div className="copyright">
          © 2026 Poojan Paradise.
          All Rights Reserved.
          <span>
            {' '}
            | Made with ❤️ for Devotees
          </span>
        </div>

      </footer>

      {/* CART */}

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
        change={change}
        remove={remove}
        orderWhatsApp={orderWhatsApp}
      />

      {/* LOGIN */}

      {authOpen && (
        <AuthModal
          onClose={() =>
            setAuthOpen(false)
          }
        />
      )}

    </div>
  )
}

createRoot(
  document.getElementById('root')
).render(
  <App />
)