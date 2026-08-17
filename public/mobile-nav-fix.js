(() => {
  const init = () => {
    const header = document.querySelector('.main-header .header-inner')
    const nav = document.querySelector('.main-header .nav')
    if (!header || !nav || document.querySelector('.mobile-menu-btn')) return !!nav

    const button = document.createElement('button')
    button.className = 'mobile-menu-btn'
    button.type = 'button'
    button.setAttribute('aria-label', 'Open menu')
    button.setAttribute('aria-expanded', 'false')
    button.innerHTML = '<span class="hamburger-lines"><i></i><i></i><i></i></span>'
    header.insertBefore(button, nav)

    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open')
      button.setAttribute('aria-expanded', String(open))
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
      button.classList.toggle('is-open', open)
    })

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open')
      button.classList.remove('is-open')
      button.setAttribute('aria-expanded', 'false')
      button.setAttribute('aria-label', 'Open menu')
    }))
    return true
  }

  const timer = setInterval(() => { if (init()) clearInterval(timer) }, 50)
  setTimeout(() => clearInterval(timer), 10000)
})()
