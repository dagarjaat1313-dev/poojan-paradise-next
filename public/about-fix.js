(() => {
  const replaceAbout = () => {
    const section = document.querySelector('#about')
    const copy = section?.querySelector('.about-copy')
    if (!copy || copy.dataset.aboutUpdated === 'true') return !!copy

    copy.innerHTML = `
      <span class="gold-eyebrow">POOJAN PARADISE</span>
      <h2>Purity in Devotion,<br /><em>Tradition in Every Home.</em></h2>
      <p>Welcome to Poojan Paradise — your trusted destination for thoughtfully selected pooja samagri and spiritual essentials for everyday worship and special occasions.</p>
      <p>Our goal is simple: make authentic-looking, thoughtfully presented pooja essentials easy to discover and order, while delivering a premium and respectful shopping experience to families across India.</p>

      <h3>🌟 Our Founding Member Program</h3>
      <p>We are building Poojan Paradise with a community of early supporters and brand ambassadors. Eligible members can participate in our founding-member milestones and rewards program, subject to the applicable offer terms and conditions.</p>

      <h3>💰 How the Program Works</h3>
      <div class="about-program">
        <div class="about-program-item">
          <strong>Get Started — Shagun Coin</strong>
          <span>Purchase the eligible ₹1,299 Premium Poojan Kit to participate in the launch offer and receive the applicable Shagun Coin reward, subject to the offer terms.</span>
        </div>
        <div class="about-program-item">
          <strong>Reach the Milestone — Para Coin</strong>
          <span>Complete the required kit purchases and sales milestones within the stated offer period to become eligible for the applicable Para Coin reward.</span>
        </div>
      </div>

      <h3>🎁 Reward Benefits</h3>
      <div class="about-benefits">
        <div><strong>Shagun Coin</strong><span>Launch reward available to eligible participants under the offer terms.</span></div>
        <div><strong>Para Coin</strong><span>Milestone-based reward available after the applicable eligibility requirements are completed.</span></div>
      </div>

      <h3>🤝 Why Join Poojan Paradise?</h3>
      <div class="about-reasons">
        <div><strong>Be an Early Supporter</strong><span>Help us build a trusted pooja-products brand from the beginning.</span></div>
        <div><strong>Promote Devotional Essentials</strong><span>Help more families discover thoughtfully selected pooja and spiritual products.</span></div>
        <div><strong>Grow With the Brand</strong><span>Participate in eligible campaigns, milestones and rewards according to the published terms.</span></div>
      </div>

      <div class="about-note"><strong>Important:</strong> Rewards, eligibility, limits and timelines are governed by the applicable Poojan Paradise offer terms. Participation does not guarantee income or returns.</div>

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
