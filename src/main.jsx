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
  LogOut
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


/* =========================================================
   AUTH MODAL
========================================================= */

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


/* =========================================================
   OFFER DETAILS
========================================================= */

function OfferDetails({ onClose }) {
  return (
    <div
      className="offer-overlay"
      onClick={onClose}
    >

      <div
        className="offer-details-popup"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <button
          className="offer-close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="offer-details-top">
          ✨ POOJAN PARADISE REWARDS ✨
        </div>

        <div className="offer-details-content">

          <img
            src="/logo.png"
            alt="Poojan Paradise"
            className="details-logo"
          />

          <span className="details-eyebrow">
            SPECIAL LAUNCH OFFER
          </span>

          <h2>
            Shagun Coin
            <br />
            <span>+ Para Coin</span>
          </h2>

          <p className="details-text">
            Shop with Poojan Paradise and become
            a part of our exclusive loyalty rewards
            program.
          </p>

          <div className="details-coins">

            <img
              src="/shagun coin.png"
              alt="Shagun Coin"
            />

            <div className="details-plus">
              +
            </div>

            <img
              src="/para coin.png"
              alt="Para Coin"
            />

          </div>

          <div className="reward-box">

            <div>
              <small>
                SHAGUN COIN
              </small>

              <strong>
                ₹11,000
              </strong>
            </div>

            <div className="reward-divider"></div>

            <div>
              <small>
                PARA COIN
              </small>

              <strong>
                ₹10,000
              </strong>
            </div>

          </div>

          <div className="rules-box">

            <h3>
              How to Unlock Rewards?
            </h3>

            <div className="rule">
              <span>01</span>

              <p>
                Purchase
                <strong>
                  {' '}10 Poojan Paradise Kits
                </strong>
                {' '}within 1 year.
              </p>
            </div>

            <div className="rule">
              <span>02</span>

              <p>
                Refer / sell
                <strong>
                  {' '}100 Kits
                </strong>
                {' '}to unlock the next reward.
              </p>
            </div>

            <div className="rule">
              <span>03</span>

              <p>
                Complete the required target and
                become eligible for your reward coin.
              </p>
            </div>

          </div>

          <button
            className="offer-explore"
            onClick={onClose}
          >
            Start Shopping
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  )
}


/* =========================================================
   APP
========================================================= */

function App() {

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)

  const [offerOpen, setOfferOpen] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(false)


  /* =====================================================
     SUPABASE AUTH
  ===================================================== */

  useEffect(() => {

    let mounted = true

    supabase.auth.getSession()
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


  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = [
    'All',
    ...new Set(
      products.map(
        (p) => p.category
      )
    )
  ]


  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filtered = useMemo(() => {

    return products.filter((p) => {

      const categoryMatch =
        category === 'All' ||
        p.category === category

      const searchMatch =
        p.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )

      return (
        categoryMatch &&
        searchMatch
      )
    })

  }, [category, query])


  /* =====================================================
     ADD TO CART
  ===================================================== */

  const add = (product) => {

    setCart((currentCart) => {

      const found =
        currentCart.find(
          (item) =>
            item.id === product.id
        )

      if (found) {

        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty:
                    item.qty + 1
                }
              : item
        )

      }

      return [
        ...currentCart,
        {
          ...product,
          qty: 1
        }
      ]

    })

  }


  /* =====================================================
     CHANGE CART QUANTITY
  ===================================================== */

  const change = (id, delta) => {

    setCart((currentCart) =>

      currentCart
        .map((item) =>

          item.id === id
            ? {
                ...item,
                qty:
                  item.qty + delta
              }
            : item

        )
        .filter(
          (item) =>
            item.qty > 0
        )

    )

  }


  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  const remove = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== id
      )
    )

  }


  /* =====================================================
     CART COUNT
  ===================================================== */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.qty,
      0
    )


  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = async () => {
    await supabase.auth.signOut()
  }


  /* =====================================================
     WHATSAPP ORDER
  ===================================================== */

  const orderWhatsApp = (
    items = cart,
    title = 'Poojan Paradise Order'
  ) => {

    if (!items.length) {
      return
    }

    const lines =
      items
        .map(
          (item) =>
            `• ${item.name} × ${item.qty}`
        )
        .join('\n')

    const msg = `Namaste Poojan Paradise!

${title}

${lines}

Please share total price and delivery details.`

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )

  }


  /* =====================================================
     OFFER FUNCTIONS
  ===================================================== */

  const closeOffer = () => {
    setOfferOpen(false)
  }

  const openDetails = () => {
    setOfferOpen(false)
    setDetailsOpen(true)
  }


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div>

      {/* =================================================
          MOBILE / PRODUCT FIX STYLES
      ================================================= */}

      <style>{`

        /* PRODUCT PRICE + QUANTITY */

        .product-info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 14px;
          margin-bottom: 12px;
        }

        .product-info-box {
          background: #faf7f1;
          border: 1px solid #eee5d8;
          border-radius: 8px;
          padding: 7px 8px;
          min-width: 0;
        }

        .product-info-label {
          display: block;
          font-size: 9px;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #9a8b78;
          margin-bottom: 3px;
        }

        .product-info-value {
          display: block;
          font-size: 15px;
          line-height: 1.2;
          font-weight: 700;
          color: #351316;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* PRODUCT GRID */

        .products {
          width: 100%;
          box-sizing: border-box;
        }

        .product {
          min-width: 0;
          box-sizing: border-box;
          overflow: hidden;
        }

        .product-img {
          width: 100%;
          overflow: hidden;
        }

        .product-img img {
          display: block;
          width: 100%;
          max-width: 100%;
          object-fit: cover;
        }

        .product-body {
          min-width: 0;
          box-sizing: border-box;
        }

        .product-body h3 {
          overflow-wrap: anywhere;
        }

        /* MOBILE */

        @media (max-width: 600px) {

          .products {
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }

          .product {
            width: 100% !important;
          }

          .product-body {
            padding: 10px !important;
          }

          .product-body h3 {
            font-size: 16px !important;
            line-height: 1.2 !important;
          }

          .product-body p {
            font-size: 11px !important;
            line-height: 1.35 !important;
          }

          .product-info-row {
            gap: 5px;
          }

          .product-info-box {
            padding: 6px;
          }

          .product-info-label {
            font-size: 8px;
          }

          .product-info-value {
            font-size: 13px;
          }

          .product-bottom {
            width: 100%;
            min-width: 0;
          }

          .product-bottom > button {
            white-space: nowrap;
            flex-shrink: 0;
          }

        }

        /* VERY SMALL PHONES */

        @media (max-width: 380px) {

          .products {
            gap: 8px !important;
          }

          .product-info-row {
            grid-template-columns: 1fr;
          }

          .product-info-value {
            font-size: 13px;
          }

        }

      `}</style>


      {/* =================================================
          LOYALTY POPUP
      ================================================= */}

      {offerOpen && (

        <div
          className="offer-overlay"
          onClick={closeOffer}
        >

          <div
            className="offer-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="offer-close"
              onClick={closeOffer}
            >
              <X size={22} />
            </button>

            <div className="offer-top">
              ✨ SPECIAL LOYALTY PROGRAM ✨
            </div>

            <div className="offer-content">

              <img
                src="/logo.png"
                alt="Poojan Paradise"
                className="offer-logo"
              />

              <h2>
                Poojan Paradise
                <br />
                <span>
                  Loyalty Program
                </span>
              </h2>

              <p className="offer-intro">
                Shop with Poojan Paradise and unlock
                exclusive
                <strong>
                  {' '}Shagun Coin + Para Coin
                </strong>
                {' '}rewards.
              </p>

              <div className="coin-preview">

                <img
                  src="/shagun coin.png"
                  alt="Shagun Coin"
                  className="real-coin shagun-coin"
                />

                <div className="coin-plus">
                  +
                </div>

                <img
                  src="/para coin.png"
                  alt="Para Coin"
                  className="real-coin para-coin"
                />

              </div>

              <div className="offer-value">

                <small>
                  Total Coin Value
                </small>

                <strong>
                  ₹21,000
                </strong>

              </div>

              <button
                className="offer-explore"
                onClick={openDetails}
              >
                Explore Offer
                <span>→</span>
              </button>

              <button
                className="offer-later"
                onClick={closeOffer}
              >
                Maybe later
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          OFFER DETAILS
      ================================================= */}

      {detailsOpen && (
        <OfferDetails
          onClose={() =>
            setDetailsOpen(false)
          }
        />
      )}


      {/* =================================================
          HEADER
      ================================================= */}

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
            {menuOpen
              ? <X />
              : <Menu />
            }
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
              >

                <User size={18} />

                <span>
                  {user.user_metadata?.full_name ||
                    user.email?.split('@')[0] ||
                    'Account'}
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

              <ShoppingBag size={20} />

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


      {/* =================================================
          MAIN
      ================================================= */}

      <main>


        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="home"
          className="hero"
        >

          <div className="hero-inner container">

            <div className="hero-copy">

              <span className="eyebrow">

                <Sparkles size={15} />

                SHUDDH SAMAGRI •
                SHRESHTH SEVA

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
                thoughtfully curated pooja kits —
                all in one place.
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


        {/* =================================================
            TRUST
        ================================================= */}

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


        {/* =================================================
            POOJAN KIT
        ================================================= */}

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
                A ready-to-use essentials kit
                for your daily pooja and
                auspicious occasions.
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
                  (item, index) => (

                    <li key={index}>

                      <span>
                        ✦
                      </span>

                      {item}

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

        </section>


        {/* =================================================
            SHOP
        ================================================= */}

        <section
          id="shop"
          className="shop-section"
        >

          <div className="container">


            {/* SECTION HEADER */}

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

                <Search size={18} />

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


            {/* CATEGORY BUTTONS */}

            <div className="chips">

              {categories.map(
                (item) => (

                  <button
                    className={
                      category === item
                        ? 'active'
                        : ''
                    }
                    key={item}
                    onClick={() =>
                      setCategory(item)
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>


            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <div className="products">

              {filtered.map(
                (product) => (

                  <article
                    className="product"
                    key={product.id}
                  >


                    {/* PRODUCT IMAGE */}

                    <div className="product-img">

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />

                      ) : (

                        <div className="mini-diya">
                          🪔
                        </div>

                      )}

                    </div>


                    {/* PRODUCT BODY */}

                    <div className="product-body">


                      {/* CATEGORY */}

                      <small>
                        {product.category}
                      </small>


                      {/* PRODUCT NAME */}

                      <h3>
                        {product.name}
                      </h3>


                      {/* DESCRIPTION */}

                      <p>
                        Premium quality •
                        Poojan Paradise
                      </p>


                      {/* =================================================
                          PRICE + QUANTITY SEPARATE
                      ================================================= */}

                      <div className="product-info-row">


                        {/* PRICE */}

                        <div className="product-info-box">

                          <span className="product-info-label">
                            Price
                          </span>

                          <span className="product-info-value">
                            ₹{product.price}
                          </span>

                        </div>


                        {/* QUANTITY */}

                        <div className="product-info-box">

                          <span className="product-info-label">
                            Quantity
                          </span>

                          <span className="product-info-value">
                            {product.unit}
                          </span>

                        </div>

                      </div>


                      {/* ADD BUTTON */}

                      <div className="product-bottom">

                        <button
                          onClick={() =>
                            add(product)
                          }
                        >

                          <Plus size={17} />

                          Add

                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>


            {/* EMPTY */}

            {!filtered.length && (

              <div className="empty">

                No products found.
                Try another search.

              </div>

            )}

          </div>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

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
              to spiritual malas, hawan samagri,
              diyas and curated kits, Poojan Paradise
              is designed to make devotional shopping
              simple, beautiful and trustworthy.
            </p>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer id="contact">

        <div className="container footer-grid">


          {/* BRAND */}

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

              <a href="#social">
                <Instagram size={20} />
              </a>

              <a href="#social">
                <Facebook size={20} />
              </a>

              <a href="#social">
                <Youtube size={20} />
              </a>

              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={20} />
              </a>

            </div>


            <small className="social-coming">
              Instagram • Facebook • YouTube —
              Coming Soon
            </small>

          </div>


          {/* QUICK LINKS */}

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


          {/* ORDER */}

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


      {/* =================================================
          CART DRAWER
      ================================================= */}

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


            {/* CART HEADER */}

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


            {/* EMPTY CART */}

            {!cart.length ? (

              <div className="empty-cart">

                <ShoppingBag size={42} />

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


                {/* CART LIST */}

                <div className="cart-list">

                  {cart.map(
                    (item) => (

                      <div
                        className="cart-item"
                        key={item.id}
                      >

                        <div>

                          <strong>
                            {item.name}
                          </strong>

                          <small>
                            ₹{item.price}
                            {' '}•{' '}
                            {item.unit}
                          </small>

                        </div>


                        <div className="qty">

                          <button
                            onClick={() =>
                              change(
                                item.id,
                                -1
                              )
                            }
                          >
                            <Minus />
                          </button>

                          <b>
                            {item.qty}
                          </b>

                          <button
                            onClick={() =>
                              change(
                                item.id,
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
                                item.id
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


                {/* WHATSAPP */}

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


      {/* =================================================
          LOGIN MODAL
      ================================================= */}

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


/* =========================================================
   CREATE ROOT
========================================================= */

createRoot(
  document.getElementById('root')
).render(
  <App />
)