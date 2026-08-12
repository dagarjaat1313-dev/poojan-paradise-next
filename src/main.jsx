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
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  User,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Gift
} from 'lucide-react'

import { products } from './products'
import { supabase } from './lib/supabase'
import './styles.css'

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

const waNumber = '919999999999'

/* =========================================
   AUTH MODAL
========================================= */

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

          setTimeout(() => {
            onClose()
          }, 700)
        } else {
          setMessage(
            'Account created. Please check your email to verify your account.'
          )
        }
      } else {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password
          })

        if (error) {
          setMessage(error.message)
        } else {
          setMessage('Login successful.')

          setTimeout(() => {
            onClose()
          }, 700)
        }
      }
    } catch (error) {
      setMessage(
        error.message || 'Something went wrong.'
      )
    }

    setLoading(false)
  }

  return (
    <div
      className="overlay auth-overlay"
      onClick={onClose}
    >
      <div
        className="auth-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="auth-logo">
          <img
            src="/logo.png"
            alt="Poojan Paradise"
          />
        </div>

        <h2>
          {mode === 'login'
            ? 'Welcome Back'
            : 'Create Account'}
        </h2>

        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Login to your Poojan Paradise account'
            : 'Join Poojan Paradise today'}
        </p>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength={6}
            required
          />

          <button
            type="submit"
            className="btn primary auth-submit"
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
          className="auth-switch"
          onClick={() => {
            setMode(
              mode === 'login'
                ? 'register'
                : 'login'
            )
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

/* =========================================
   LOYALTY OFFER POPUP
========================================= */

function LoyaltyPopup({ onClose }) {
  const [details, setDetails] = useState(false)

  return (
    <div
      className="offer-overlay"
      onClick={onClose}
    >
      <div
        className={
          details
            ? 'offer-popup offer-popup-details'
            : 'offer-popup'
        }
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* CLOSE BUTTON */}

        <button
          className="offer-close"
          onClick={onClose}
          aria-label="Close offer"
        >
          <X size={21} />
        </button>

        {!details ? (

          /* =====================================
             FIRST OFFER SCREEN
          ===================================== */

          <>
            <div className="offer-top">
              ✨ SPECIAL LOYALTY PROGRAM ✨
            </div>

            <div className="offer-content">

              <div className="offer-logo-wrap">
                <img
                  src="/logo.png"
                  alt="Poojan Paradise"
                  className="offer-logo"
                />
              </div>

              <div className="offer-mini-label">
                EXCLUSIVE MEMBER REWARDS
              </div>

              <h2>
                Poojan Paradise
                <br />
                <span>Loyalty Program</span>
              </h2>

              <p className="offer-intro">
                Shop with Poojan Paradise and unlock
                exclusive rewards with our special
                <strong>
                  {' '}Shagun Coin + Para Coin
                </strong>
                {' '}program.
              </p>

              {/* REAL COIN IMAGES */}

              <div className="coin-preview">

                <div className="coin-item coin-left">
                  <img
                    src="/shagun-coin.png"
                    alt="Shagun Coin"
                    className="real-coin"
                  />

                  <span>
                    SHAGUN COIN
                  </span>
                </div>

                <div className="coin-plus">
                  +
                </div>

                <div className="coin-item coin-right">
                  <img
                    src="/para-coin.png"
                    alt="Para Coin"
                    className="real-coin"
                  />

                  <span>
                    PARA COIN
                  </span>
                </div>

              </div>

              <div className="offer-value">

                <div>
                  <small>
                    TOTAL REWARD VALUE
                  </small>

                  <strong>
                    ₹21,000
                  </strong>
                </div>

                <Gift size={25} />

              </div>

              {/* IMPORTANT:
                  This button now opens DETAILS,
                  NOT closes popup.
              */}

              <button
                className="offer-explore"
                onClick={() =>
                  setDetails(true)
                }
              >
                <span>
                  Explore Offer
                </span>

                <span className="arrow">
                  →
                </span>
              </button>

              <button
                className="offer-later"
                onClick={onClose}
              >
                Maybe later
              </button>

            </div>
          </>

        ) : (

          /* =====================================
             OFFER DETAILS SCREEN
          ===================================== */

          <div className="offer-details">

            <div className="details-header">

              <button
                className="offer-back"
                onClick={() =>
                  setDetails(false)
                }
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <span>
                LOYALTY PROGRAM
              </span>

            </div>

            <div className="details-logo">
              <img
                src="/logo.png"
                alt="Poojan Paradise"
              />
            </div>

            <div className="details-title">
              <span>
                ✦ SPECIAL REWARD PROGRAM ✦
              </span>

              <h2>
                Earn Your
                <br />
                <em>Shagun & Para Coins</em>
              </h2>

              <p>
                Become a Poojan Paradise loyalty
                member and unlock exclusive rewards.
              </p>
            </div>

            {/* COINS */}

            <div className="details-coins">

              <div className="detail-coin-card">

                <div className="detail-coin-image">
                  <img
                    src="/shagun-coin.png"
                    alt="Shagun Coin"
                  />
                </div>

                <h3>
                  Shagun Coin
                </h3>

                <strong>
                  ₹11,000 Value
                </strong>

                <p>
                  Complete the qualifying purchase
                  requirement to unlock your
                  Shagun Coin reward.
                </p>

              </div>

              <div className="detail-coin-card">

                <div className="detail-coin-image">
                  <img
                    src="/para-coin.png"
                    alt="Para Coin"
                  />
                </div>

                <h3>
                  Para Coin
                </h3>

                <strong>
                  ₹10,000 Value
                </strong>

                <p>
                  Complete the qualifying sales
                  target and unlock your Para Coin.
                </p>

              </div>

            </div>

            {/* REQUIREMENTS */}

            <div className="offer-rules">

              <div className="rules-title">
                <Sparkles size={18} />
                How the program works
              </div>

              <div className="rule">

                <div className="rule-number">
                  01
                </div>

                <div>
                  <strong>
                    Purchase 10 Kits
                  </strong>

                  <p>
                    Purchase 10 Poojan Paradise
                    kits within 1 year.
                  </p>
                </div>

              </div>

              <div className="rule">

                <div className="rule-number">
                  02
                </div>

                <div>
                  <strong>
                    Complete Kit Sales
                  </strong>

                  <p>
                    Help sell 100 eligible kits
                    to qualify for the Para Coin.
                  </p>
                </div>

              </div>

              <div className="rule">

                <div className="rule-number">
                  03
                </div>

                <div>
                  <strong>
                    Unlock Your Rewards
                  </strong>

                  <p>
                    After verification of the
                    qualifying requirements,
                    receive your applicable reward.
                  </p>
                </div>

              </div>

            </div>

            {/* VALUE BOX */}

            <div className="details-total">

              <div>
                <small>
                  COMBINED REWARD VALUE
                </small>

                <strong>
                  ₹21,000
                </strong>
              </div>

              <div className="reward-check">
                <CheckCircle2 size={25} />
              </div>

            </div>

            <div className="details-note">
              *Terms and eligibility conditions apply.
              Rewards are subject to verification by
              Poojan Paradise.
            </div>

            <button
              className="details-whatsapp"
              onClick={() => {
                const message =
                  `Namaste Poojan Paradise!\n\nI am interested in the Loyalty Program and would like to know more about the Shagun Coin and Para Coin offer.`

                window.open(
                  `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    message
                  )}`,
                  '_blank'
                )
              }}
            >
              <MessageCircle size={19} />
              Enquire on WhatsApp
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

/* =========================================
   APP
========================================= */

function App() {

  const [query, setQuery] =
    useState('')

  const [category, setCategory] =
    useState('All')

  const [cart, setCart] =
    useState([])

  const [cartOpen, setCartOpen] =
    useState(false)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [authOpen, setAuthOpen] =
    useState(false)

  const [user, setUser] =
    useState(null)

  /* Loyalty Popup */

  const [offerOpen, setOfferOpen] =
    useState(true)

  /* =========================================
     AUTH SESSION
  ========================================= */

  useEffect(() => {

    let mounted = true

    supabase.auth
      .getSession()
      .then(({ data }) => {

        if (mounted) {
          setUser(
            data.session?.user || null
          )
        }

      })

    const {
      data: { subscription }
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {

          setUser(
            session?.user || null
          )

        }
      )

    return () => {

      mounted = false
      subscription.unsubscribe()

    }

  }, [])

  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = [
    'All',
    ...new Set(
      products.map(
        (p) => p.category
      )
    )
  ]

  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (
            category === 'All' ||
            p.category === category
          ) &&
          p.name
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      ),
    [category, query]
  )

  /* =========================================
     CART
  ========================================= */

  const add = (p) =>
    setCart((c) => {

      const found =
        c.find(
          (x) => x.id === p.id
        )

      return found
        ? c.map(
            (x) =>
              x.id === p.id
                ? {
                    ...x,
                    qty:
                      x.qty + 1
                  }
                : x
          )
        : [
            ...c,
            {
              ...p,
              qty: 1
            }
          ]

    })

  const change = (
    id,
    delta
  ) =>
    setCart((c) =>
      c
        .map((x) =>
          x.id === id
            ? {
                ...x,
                qty:
                  x.qty + delta
              }
            : x
        )
        .filter(
          (x) => x.qty > 0
        )
    )

  const remove = (id) =>
    setCart((c) =>
      c.filter(
        (x) => x.id !== id
      )
    )

  const cartCount =
    cart.reduce(
      (a, x) =>
        a + x.qty,
      0
    )

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = async () => {
    await supabase.auth.signOut()
  }

  /* =========================================
     WHATSAPP ORDER
  ========================================= */

  const orderWhatsApp = (
    items = cart,
    title = 'Poojan Paradise Order'
  ) => {

    if (!items.length)
      return

    const lines =
      items
        .map(
          (x) =>
            `• ${x.name} × ${x.qty}`
        )
        .join('\n')

    const msg =
      `Namaste Poojan Paradise!

${title}
${lines}

Please share total price and delivery details.`

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        msg
      )}`,
      '_blank'
    )
  }

  return (
    <div>

      {/* =====================================
          LOYALTY POPUP
      ===================================== */}

      {offerOpen && (
        <LoyaltyPopup
          onClose={() =>
            setOfferOpen(false)
          }
        />
      )}

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="header">

        <div className="nav container">

          <button
            className="icon-btn mobile-menu"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >
            {menuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <a
            className="brand"
            href="#home"
          >
            <img
              src="/logo.png"
              alt="Poojan Paradise logo"
            />
          </a>

          <nav
            className={
              menuOpen
                ? 'navlinks open'
                : 'navlinks'
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
              href="#about"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              About
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

          <div className="header-actions">

            {user ? (

              <button
                className="account-btn"
                onClick={logout}
                title="Logout"
              >

                <User size={18} />

                <span>
                  {
                    user.user_metadata
                      ?.full_name ||
                    user.email
                      ?.split('@')[0] ||
                    'Account'
                  }
                </span>

                <LogOut size={16} />

              </button>

            ) : (

              <button
                className="account-btn"
                onClick={() =>
                  setAuthOpen(true)
                }
              >

                <User size={18} />

                <span>
                  Login
                </span>

              </button>

            )}

            <button
              className="cart-btn"
              onClick={() =>
                setCartOpen(true)
              }
            >

              <ShoppingBag
                size={20}
              />

              <span>
                Cart
              </span>

              {cartCount > 0 && (
                <b>
                  {cartCount}
                </b>
              )}

            </button>

          </div>

        </div>

      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main>

        {/* HERO */}

        <section
          id="home"
          className="hero"
        >

          <div className="hero-inner container">

            <div className="hero-copy">

              <span className="eyebrow">

                <Sparkles
                  size={15}
                />

                SHUDDH SAMAGRI
                • SHRESHTH SEVA

              </span>

              <h1>
                Bring the divine
                <br />
                <em>
                  home.
                </em>
              </h1>

              <p>
                Premium pooja samagri,
                spiritual essentials and
                thoughtfully curated pooja
                kits — all in one place.
              </p>

              <div className="hero-actions">

                <a
                  href="#shop"
                  className="btn primary"
                >
                  Explore Collection
                </a>

                <a
                  href="#kit"
                  className="btn secondary"
                >
                  View ₹1,299 Kit
                </a>

              </div>

            </div>

            <div className="hero-logo-card">

              <img
                src="/logo.png"
                alt="Poojan Paradise"
              />

            </div>

          </div>

        </section>

        {/* TRUST */}

        <section className="trust">

          <div className="container trust-grid">

            <div>

              <ShieldCheck />

              <span>

                <strong>
                  Pure & Authentic
                </strong>

                <small>
                  Carefully selected samagri
                </small>

              </span>

            </div>

            <div>

              <Truck />

              <span>

                <strong>
                  Pan India Delivery
                </strong>

                <small>
                  Safe & secure packing
                </small>

              </span>

            </div>

            <div>

              <Heart />

              <span>

                <strong>
                  Made for Devotion
                </strong>

                <small>
                  Premium presentation
                </small>

              </span>

            </div>

          </div>

        </section>

        {/* =====================================
            POOJAN KIT
        ===================================== */}

        <section
          id="kit"
          className="kit-section"
        >

          <div className="container kit-grid">

            <div>

              <span className="eyebrow">
                LIMITED LAUNCH COLLECTION
              </span>

              <h2>
                Premium Poojan Kit
                <br />
                <span>
                  ₹1,299
                </span>
              </h2>

              <p className="kit-sub">
                A ready-to-use essentials
                kit for your daily pooja
                and auspicious occasions.
              </p>

              <button
                className="btn primary"
                onClick={() =>
                  orderWhatsApp(
                    [
                      {
                        name:
                          'Premium Poojan Kit ₹1,299',
                        qty: 1
                      }
                    ],
                    'Premium Poojan Kit'
                  )
                }
              >
                Order Kit on WhatsApp
                <MessageCircle
                  size={18}
                />
              </button>

            </div>

            <div className="kit-card">

              <div className="kit-badge">
                ₹1,299
              </div>

              <h3>
                Kit Includes
              </h3>

              <ul>

                {kitItems.map(
                  (x, i) => (
                    <li key={i}>
                      <span>
                        ✦
                      </span>

                      {x}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>

        </section>

        {/* =====================================
            SHOP
        ===================================== */}

        <section
          id="shop"
          className="shop-section"
        >

          <div className="container">

            <div className="section-head">

              <div>

                <span className="eyebrow">
                  SHOP THE COLLECTION
                </span>

                <h2>
                  Pooja Essentials
                </h2>

              </div>

              <div className="search">

                <Search
                  size={18}
                />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(
                      e.target.value
                    )
                  }
                  placeholder="Search products..."
                />

              </div>

            </div>

            <div className="chips">

              {categories.map(
                (c) => (

                  <button
                    className={
                      category === c
                        ? 'active'
                        : ''
                    }
                    key={c}
                    onClick={() =>
                      setCategory(c)
                    }
                  >
                    {c}
                  </button>

                )
              )}

            </div>

            <div className="products">

              {filtered.map(
                (p) => (

                  <article
                    className="product"
                    key={p.id}
                  >

                    <div className="product-img">

                      <div className="mini-diya">
                        🪔
                      </div>

                    </div>

                    <div className="product-body">

                      <small>
                        {p.category}
                      </small>

                      <h3>
                        {p.name}
                      </h3>

                      <p>
                        Premium quality •
                        Poojan Paradise
                      </p>

                      <div className="product-bottom">

                        <span className="price">
                          ₹ Add price
                        </span>

                        <button
                          onClick={() =>
                            add(p)
                          }
                        >
                          <Plus
                            size={17}
                          />

                          Add
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

            {!filtered.length && (
              <div className="empty">
                No products found.
                Try another search.
              </div>
            )}

          </div>

        </section>

        {/* =====================================
            ABOUT
        ===================================== */}

        <section
          id="about"
          className="about"
        >

          <div className="container about-inner">

            <span className="eyebrow">
              POOJAN PARADISE
            </span>

            <h2>
              Your one stop shop for
              <br />
              <span>
                all pooja needs.
              </span>
            </h2>

            <p>
              From everyday pooja essentials
              to spiritual malas, hawan
              samagri, diyas and curated kits,
              Poojan Paradise is designed to
              make devotional shopping simple,
              beautiful and trustworthy.
            </p>

          </div>

        </section>

      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer id="contact">

        <div className="container footer-grid">

          <div>

            <img
              src="/logo.png"
              className="footer-logo"
              alt="Poojan Paradise"
            />

            <p>
              Pure samagri. Premium seva.
            </p>

            <div className="social-links">

              <a
                href="#social"
                aria-label="Instagram"
                title="Instagram Coming Soon"
              >
                <Instagram
                  size={20}
                />
              </a>

              <a
                href="#social"
                aria-label="Facebook"
                title="Facebook Coming Soon"
              >
                <Facebook
                  size={20}
                />
              </a>

              <a
                href="#social"
                aria-label="YouTube"
                title="YouTube Coming Soon"
              >
                <Youtube
                  size={20}
                />
              </a>

              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle
                  size={20}
                />
              </a>

            </div>

            <small className="social-coming">
              Instagram • Facebook • YouTube —
              Coming Soon
            </small>

          </div>

          <div>

            <h4>
              Quick Links
            </h4>

            <a href="#shop">
              Shop
            </a>

            <a href="#kit">
              Poojan Kit
            </a>

            <a href="#about">
              About
            </a>

          </div>

          <div>

            <h4>
              Order
            </h4>

            <button
              className="whatsapp"
              onClick={() =>
                orderWhatsApp(
                  [
                    {
                      name:
                        'Product enquiry',
                      qty: 1
                    }
                  ],
                  'General Enquiry'
                )
              }
            >
              <MessageCircle
                size={18}
              />

              WhatsApp Us
            </button>

            <p>
              WhatsApp ordering available
              for quick enquiries.
            </p>

          </div>

        </div>

        <div className="copyright">
          © 2026 Poojan Paradise.
          All rights reserved.
        </div>

      </footer>

      {/* =====================================
          CART DRAWER
      ===================================== */}

      {cartOpen && (

        <div
          className="overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <aside
            className="drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="drawer-head">

              <h2>
                Your Cart
              </h2>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
              >
                <X />
              </button>

            </div>

            {!cart.length ? (

              <div className="empty-cart">

                <ShoppingBag
                  size={42}
                />

                <p>
                  Your cart is empty.
                </p>

                <a
                  href="#shop"
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  Browse products
                </a>

              </div>

            ) : (

              <>

                <div className="cart-list">

                  {cart.map(
                    (x) => (

                      <div
                        className="cart-item"
                        key={x.id}
                      >

                        <div>

                          <strong>
                            {x.name}
                          </strong>

                          <small>
                            {x.category}
                          </small>

                        </div>

                        <div className="qty">

                          <button
                            onClick={() =>
                              change(
                                x.id,
                                -1
                              )
                            }
                          >
                            <Minus />
                          </button>

                          <b>
                            {x.qty}
                          </b>

                          <button
                            onClick={() =>
                              change(
                                x.id,
                                1
                              )
                            }
                          >
                            <Plus />
                          </button>

                          <button
                            className="trash"
                            onClick={() =>
                              remove(
                                x.id
                              )
                            }
                          >
                            <Trash2 />
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

                <button
                  className="btn primary full"
                  onClick={() =>
                    orderWhatsApp()
                  }
                >
                  Order Cart on WhatsApp

                  <MessageCircle
                    size={18}
                  />
                </button>

              </>

            )}

          </aside>

        </div>

      )}

      {/* =====================================
          LOGIN / REGISTER
      ===================================== */}

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

/* =========================================
   RENDER APP
========================================= */

createRoot(
  document.getElementById('root')
).render(
  <App />
)