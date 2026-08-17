(() => {
  const replaceAbout = () => {
    const section = document.querySelector('#about')
    const copy = section?.querySelector('.about-copy')
    if (!copy || copy.dataset.aboutUpdated === 'true') return !!copy

    copy.innerHTML = `
      <span class="gold-eyebrow">POOJAN PARADISE</span>
      <h2>Purity in Devotion,<br /><em>Tradition in Every Home.</em></h2>
      <p>Welcome to Poojan Paradise — your trusted destination for thoughtfully selected pooja samagri and spiritual essentials for everyday worship and special occasions.</p>
      <p>Our goal is simple: make pooja essentials easy to discover and order while delivering a premium and respectful shopping experience.</p>

      <h3>🌟 Our Founding Member Program</h3>
      <p>Eligible members can participate in our founding-member milestones and rewards program, subject to the applicable offer terms and conditions.</p>

      <h3>💰 How the Program Works</h3>
      <div class="about-program">
        <div class="about-program-item">
          <strong>Shagun Coin — Value ₹11,000</strong>
          <span>Eligible participants can receive the Shagun Coin under the applicable launch offer terms.</span>
        </div>
        <div class="about-program-item">
          <strong>Para Coin — Value ₹10,000</strong>
          <span>Eligible participants can unlock the Para Coin after completing the applicable purchase and sales milestones within the stated offer period.</span>
        </div>
      </div>

      <h3>🎁 Total Coin Value — ₹21,000</h3>
      <div class="about-benefits">
        <div><strong>₹11,000</strong><span>Shagun Coin value, subject to applicable offer terms.</span></div>
        <div><strong>₹10,000</strong><span>Para Coin value, subject to applicable eligibility requirements.</span></div>
      </div>

      <h3>🤝 Why Join Poojan Paradise?</h3>
      <div class="about-reasons">
        <div><strong>Be an Early Supporter</strong><span>Help us build a trusted pooja-products brand from the beginning.</span></div>
        <div><strong>Promote Devotional Essentials</strong><span>Help more families discover thoughtfully selected pooja and spiritual products.</span></div>
        <div><strong>Grow With the Brand</strong><span>Participate in eligible campaigns, milestones and rewards according to the published terms.</span></div>
      </div>

      <div class="about-note"><strong>Important:</strong> Coin values, rewards, eligibility, limits and timelines are governed by the applicable Poojan Paradise offer terms. Participation does not guarantee income or returns.</div>

      <button class="gold-btn about-join-btn" type="button" onclick="document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})">
        Explore Poojan Paradise <span aria-hidden="true">→</span>
      </button>
    `

    copy.dataset.aboutUpdated = 'true'
    return true
  }

  const timer = setInterval(() => {
    if (replaceAbout()) clearInterval(timer)
  }, 100)
  setTimeout(() => clearInterval(timer), 15000)
})()
