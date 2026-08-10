import React, {useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {ShoppingBag, Search, Menu, X, Plus, Minus, Trash2, MessageCircle, Sparkles, ShieldCheck, Truck, Heart} from 'lucide-react'
import {products} from './products'
import './styles.css'

const kitItems = ["Camphor — 250gm", "Laal & Peela Kapda", "Dhoop Batti", "Chota Perfume / Itra", "Roli — 1 packet", "Laal Chunri — 1", "Chandan Tika — 1", "Pooja Ghee — 150gm", "Cotton Batti — 1 packet"]
const waNumber = '919999999999' // CHANGE THIS to your WhatsApp number with country code

function App(){
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState('All')
  const [cart,setCart]=useState([])
  const [cartOpen,setCartOpen]=useState(false)
  const [menuOpen,setMenuOpen]=useState(false)

  const categories=['All',...new Set(products.map(p=>p.category))]
  const filtered=useMemo(()=>products.filter(p=>
    (category==='All'||p.category===category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ),[category,query])

  const add=(p)=>setCart(c=>{
    const found=c.find(x=>x.id===p.id)
    return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]
  })
  const change=(id,delta)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0))
  const remove=(id)=>setCart(c=>c.filter(x=>x.id!==id))
  const cartCount=cart.reduce((a,x)=>a+x.qty,0)

  const orderWhatsApp=(items=cart, title='Poojan Paradise Order')=>{
    if(!items.length) return
    const lines=items.map(x=>`• ${x.name} × ${x.qty}`).join('\n')
    const msg=`Namaste Poojan Paradise!\n\n${title}\n${lines}\n\nPlease share total price and delivery details.`
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  return <div>
    <header className="header">
      <div className="nav container">
        <button className="icon-btn mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
        <a className="brand" href="#home"><img src="/logo.png" alt="Poojan Paradise logo"/></a>
        <nav className={menuOpen?'navlinks open':'navlinks'}>
          <a href="#home" onClick={()=>setMenuOpen(false)}>Home</a>
          <a href="#shop" onClick={()=>setMenuOpen(false)}>Shop</a>
          <a href="#kit" onClick={()=>setMenuOpen(false)}>Poojan Kit</a>
          <a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="cart-btn" onClick={()=>setCartOpen(true)}><ShoppingBag size={20}/><span>Cart</span>{cartCount>0&&<b>{cartCount}</b>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-inner container">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15}/> SHUDDH SAMAGRI • SHRESHTH SEVA</span>
            <h1>Bring the divine<br/><em>home.</em></h1>
            <p>Premium pooja samagri, spiritual essentials and thoughtfully curated pooja kits — all in one place.</p>
            <div className="hero-actions">
              <a href="#shop" className="btn primary">Explore Collection</a>
              <a href="#kit" className="btn secondary">View ₹1,299 Kit</a>
            </div>
          </div>
          <div className="hero-logo-card"><img src="/logo.png" alt="Poojan Paradise"/></div>
        </div>
      </section>

      <section className="trust">
        <div className="container trust-grid">
          <div><ShieldCheck/><span><strong>Pure & Authentic</strong><small>Carefully selected samagri</small></span></div>
          <div><Truck/><span><strong>Pan India Delivery</strong><small>Safe & secure packing</small></span></div>
          <div><Heart/><span><strong>Made for Devotion</strong><small>Premium presentation</small></span></div>
        </div>
      </section>

      <section id="kit" className="kit-section">
        <div className="container kit-grid">
          <div>
            <span className="eyebrow">LIMITED LAUNCH COLLECTION</span>
            <h2>Premium Poojan Kit<br/><span>₹1,299</span></h2>
            <p className="kit-sub">A ready-to-use essentials kit for your daily pooja and auspicious occasions.</p>
            <button className="btn primary" onClick={()=>orderWhatsApp([{name:'Premium Poojan Kit ₹1,299',qty:1}],'Premium Poojan Kit')}>Order Kit on WhatsApp <MessageCircle size={18}/></button>
          </div>
          <div className="kit-card">
            <div className="kit-badge">₹1,299</div>
            <h3>Kit Includes</h3>
            <ul>{kitItems.map((x,i)=><li key={i}><span>✦</span>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="shop" className="shop-section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">SHOP THE COLLECTION</span><h2>Pooja Essentials</h2></div>
            <div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div>
          </div>
          <div className="chips">{categories.map(c=><button className={category===c?'active':''} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="products">
            {filtered.map(p=><article className="product" key={p.id}>
              <div className="product-img"><div className="mini-diya">🪔</div></div>
              <div className="product-body"><small>{p.category}</small><h3>{p.name}</h3><p>Premium quality • Poojan Paradise</p><div className="product-bottom"><span className="price">₹ Add price</span><button onClick={()=>add(p)}><Plus size={17}/> Add</button></div></div>
            </article>)}
          </div>
          {!filtered.length&&<div className="empty">No products found. Try another search.</div>}
        </div>
      </section>

      <section id="about" className="about">
        <div className="container about-inner">
          <span className="eyebrow">POOJAN PARADISE</span>
          <h2>Your one stop shop for<br/><span>all pooja needs.</span></h2>
          <p>From everyday pooja essentials to spiritual malas, hawan samagri, diyas and curated kits, Poojan Paradise is designed to make devotional shopping simple, beautiful and trustworthy.</p>
        </div>
      </section>
    </main>

    <footer id="contact">
      <div className="container footer-grid">
        <div><img src="/logo.png" className="footer-logo"/><p>Pure samagri. Premium seva.</p></div>
        <div><h4>Quick Links</h4><a href="#shop">Shop</a><a href="#kit">Poojan Kit</a><a href="#about">About</a></div>
        <div><h4>Order</h4><button className="whatsapp" onClick={()=>orderWhatsApp([{name:'Product enquiry',qty:1}],'General Enquiry')}><MessageCircle size={18}/> WhatsApp Us</button><p>Replace the WhatsApp number in <b>src/main.jsx</b>.</p></div>
      </div>
      <div className="copyright">© 2026 Poojan Paradise. All rights reserved.</div>
    </footer>

    {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><h2>Your Cart</h2><button onClick={()=>setCartOpen(false)}><X/></button></div>
      {!cart.length?<div className="empty-cart"><ShoppingBag size={42}/><p>Your cart is empty.</p><a href="#shop" onClick={()=>setCartOpen(false)}>Browse products</a></div>:
      <><div className="cart-list">{cart.map(x=><div className="cart-item" key={x.id}><div><strong>{x.name}</strong><small>{x.category}</small></div><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus/></button><b>{x.qty}</b><button onClick={()=>change(x.id,1)}><Plus/></button><button className="trash" onClick={()=>remove(x.id)}><Trash2/></button></div></div>)}</div><button className="btn primary full" onClick={()=>orderWhatsApp()}>Order Cart on WhatsApp <MessageCircle size={18}/></button></>}
    </aside></div>}
  </div>
}
