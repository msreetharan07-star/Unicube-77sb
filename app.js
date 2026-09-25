/**
 * UniCube Student Support & Services
 * Interactive Front-end Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initHeroSearch();
  initBookingRadioSelectors();
  initEscModalClose();
  initServiceHighlighting();
});

/* ========================================================
   1. STICKY HEADER
   ======================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ========================================================
   2. MOBILE DRAWER NAVIGATION
   ======================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

/* ========================================================
   3. HERO SEARCH BAR INTERACTION
   ======================================================== */
function initHeroSearch() {
  const heroSearchInput = document.getElementById('hero-search-input');
  if (!heroSearchInput) return;

  heroSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = heroSearchInput.value.trim();
      if (query) {
        document.getElementById('ai-helper').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          submitAiQuestion(query);
          heroSearchInput.value = '';
        }, 600);
      }
    }
  });
}

function focusHeroSearch() {
  const input = document.getElementById('hero-search-input');
  if (input) input.focus();
}

/* ========================================================
   4. INTERACTIVE AI HELPER CHATBOT
   ======================================================== */
const AI_KNOWLEDGE_BASE = [
  {
    keywords: ['store', 'storage', 'box', 'boxes', 'keep', 'belongings', 'pack', 'luggage'],
    title: '📦 UniCube Student Storage',
    response: `UniCube provides door-to-door student storage in Brisbane starting at just <strong>$19/month</strong>!
    <br><br>
    • <strong>Free Doorstep Pickup:</strong> We collect directly from UQ St Lucia, QUT Kelvin Grove/Gardens Point, Griffith South Bank, or any private rental.<br>
    • <strong>Climate-controlled & Secure:</strong> 24/7 monitored facilities.<br>
    • <strong>Return Anytime:</strong> When you get back from holidays, we deliver your boxes straight to your new room!
    <br><br>
    <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem; margin-top: 6px;" onclick="openModal('booking-modal')">Calculate your storage rate &rarr;</button>`
  },
  {
    keywords: ['job', 'jobs', 'work', 'part-time', 'hiring', 'barista', 'earn', 'money'],
    title: '💼 Finding Student Work in Brisbane',
    response: `Here are the top tips for landing a student job in Brisbane:
    <br><br>
    • <strong>Hospitality & Cafes:</strong> Get your Queensland RSA (Responsible Service of Alcohol). South Bank, West End, and Howard Smith Wharves are always hiring friendly student staff.<br>
    • <strong>On-Campus Jobs:</strong> Check UQ StudentHub or QUT CareerHub for library, tutoring, and campus event positions.<br>
    • <strong>Visa Hours:</strong> International students can work up to 48 hours per fortnight during semester, and unlimited during official uni breaks!`
  },
  {
    keywords: ['home', 'holiday', 'holidays', 'break', 'flight', 'leave', 'vacation'],
    title: '✈️ Pre-Holiday Student Checklist',
    response: `Heading home for the university break? Here is our quick 4-step checklist:
    <br><br>
    1. <strong>Don't pay empty rent:</strong> Store your heavy items with UniCube to avoid paying summer lease rates.<br>
    2. <strong>Clear your fridge:</strong> Defrost dorm mini-fridges 24 hours prior to prevent water damage.<br>
    3. <strong>Mail redirection:</strong> Forward important documents via Australia Post or hold them at campus mail.<br>
    4. <strong>Book airport transit:</strong> The Brisbane Airtrain or Translink 590 bus connects directly to the terminals.`
  },
  {
    keywords: ['live', 'housing', 'accommodation', 'rent', 'lease', 'apartment', 'room', 'sublet'],
    title: '🏠 Brisbane Student Accommodation Guide',
    response: `Finding a place to live around Brisbane universities:
    <br><br>
    • <strong>St Lucia & Toowong:</strong> Ideal for UQ students (walking distance or quick ferry ride on the CityCat).<br>
    • <strong>South Bank & Woolloongabba:</strong> Vibrant student hubs with fast busway access to both QUT and Griffith.<br>
    • <strong>Rental Bond Tip:</strong> Always make sure your bond is officially lodged with the Queensland RTA (Residential Tenancies Authority) for legal protection.`
  },
  {
    keywords: ['move', 'moving', 'van', 'truck', 'relocate', 'heavy'],
    title: '🚚 UniCube Student Moving Service',
    response: `Moving between student accommodations? UniCube handles the heavy lifting:
    <br><br>
    • Dedicated 2-person moving team with clean student-sized cargo vans.<br>
    • Free wardrobe boxes and heavy-duty bubble wrap.<br>
    • Transparent flat student hourly rates with no surprise fuel surcharges.<br><br>
    <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem; margin-top: 6px;" onclick="openModal('booking-modal')">Book a moving van &rarr;</button>`
  },
  {
    keywords: ['around', 'transit', 'bus', 'train', 'ferry', 'transport', 'citycat', 'go card'],
    title: '🚍 Getting Around Brisbane',
    response: `Public transit in Brisbane is easy with a <strong>Student Go Card</strong> (gives you 50% off all fares!):
    <br><br>
    • <strong>CityCat Ferry:</strong> Scenic river commute directly into UQ St Lucia campus.<br>
    • <strong>Busway System:</strong> Dedicated bus highways connecting Queen St Mall, Cultural Centre, and campus hubs in minutes.<br>
    • <strong>E-Scooters:</strong> Neuron & Beam scooters available everywhere across the city with student discounts.`
  }
];

function handleAiChipClick(questionText) {
  submitAiQuestion(questionText);
}

function handleAiChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('ai-chat-input');
  if (!input) return;
  const question = input.value.trim();
  if (question) {
    submitAiQuestion(question);
    input.value = '';
  }
}

function submitAiQuestion(query) {
  const conversation = document.getElementById('ai-chat-conversation');
  if (!conversation) return;

  // Append User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-msg chat-msg--user';
  userBubble.textContent = query;
  conversation.appendChild(userBubble);
  conversation.scrollTop = conversation.scrollHeight;

  // Append Thinking Indicator
  const thinking = document.createElement('div');
  thinking.className = 'chat-thinking';
  thinking.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  conversation.appendChild(thinking);
  conversation.scrollTop = conversation.scrollHeight;

  // Realistic response latency
  setTimeout(() => {
    thinking.remove();

    // Match query against knowledge base
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    AI_KNOWLEDGE_BASE.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        if (lowerQuery.includes(kw)) score += 2;
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    });

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-msg chat-msg--bot';

    if (bestMatch && maxScore > 0) {
      botBubble.innerHTML = `<div style="font-weight: 700; margin-bottom: 6px; color: #FFA37B;">${bestMatch.title}</div>${bestMatch.response}`;
    } else {
      botBubble.innerHTML = `Thanks for asking! UniCube is built to support Brisbane university students with <strong>Storage</strong>, <strong>Moving</strong>, and <strong>Practical Advice</strong>.
      <br><br>
      Whether you need boxes picked up from your student dorm, help moving between leases, or advice on settling into Brisbane, our friendly student care team is here to help!
      <br><br>
      <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem; margin-top: 4px;" onclick="openModal('booking-modal')">Chat with Student Support &rarr;</button>`;
    }

    conversation.appendChild(botBubble);
    conversation.scrollTop = conversation.scrollHeight;
  }, 900);
}

/* ========================================================
   5. SKYLINE HOTSPOTS & QUICK FILTER
   ======================================================== */
function quickFilterAction(type) {
  switch (type) {
    case 'housing':
      openGuideArticle('accom');
      break;
    case 'community':
      document.getElementById('community').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'guides':
      document.getElementById('guides').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'transit':
      document.getElementById('ai-helper').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => submitAiQuestion('How do I get around Brisbane with student transit?'), 600);
      break;
    case 'storage':
      document.getElementById('storage').scrollIntoView({ behavior: 'smooth' });
      break;
  }
}

/* ========================================================
   6. POLAROID DETAIL INTERACTION
   ======================================================== */
const POLAROID_DATA = {
  housing: {
    title: 'Where can I live in Brisbane?',
    tag: 'STUDENT HOUSING & DORM TIPS',
    content: `Finding the right accommodation can define your uni experience. The most popular student areas around Brisbane include:
    <br><br>
    • <strong>St Lucia:</strong> Right on the doorstep of UQ. Relaxed, leafy suburb with quiet streets and plenty of student sharehouses.<br>
    • <strong>Toowong & Indooroopilly:</strong> Fantastic shopping centres, train stations, and CityCat terminals with 10-minute transit to campus.<br>
    • <strong>South Bank & Kelvin Grove:</strong> Perfect for QUT and Griffith students who love walkable cafes, cultural precincts, and nightlife.`
  },
  friends: {
    title: 'How do I meet people in a new city?',
    tag: 'COMMUNITY & FRIENDSHIPS',
    content: `Everyone starts in the same boat! Here are genuine ways students build lifelong friendships:
    <br><br>
    • <strong>Join 2-3 Clubs during O-Week:</strong> Whether it is hiking, board games, or your cultural society, clubs are the easiest way to make friends outside lectures.<br>
    • <strong>UniCube Student Meetups:</strong> We host monthly sunset BBQs at South Bank parklands and study sessions for students new to Brisbane.`
  },
  transit: {
    title: 'How do I get around Brisbane easily?',
    tag: 'TRANSIT & NAVIGATION',
    content: `Brisbane has one of the most scenic public transport systems in the world thanks to the Brisbane River!
    <br><br>
    • Apply for your <strong>Tertiary Transport Concession</strong> through your uni portal to get 50% discount on all buses, trains, and ferries.<br>
    • The <strong>CityCat Ferry</strong> is both a commute and an experience — hop on at South Bank and cruise right up to the UQ St Lucia campus.`
  },
  uq: {
    title: 'First time at UQ St Lucia?',
    tag: 'CAMPUS NAVIGATION GUIDE',
    content: `The University of Queensland's St Lucia campus is vast and surrounded by the river.
    <br><br>
    • <strong>The Great Court:</strong> The iconic sandstone quadrangle — best place for sunny lunch breaks between tutorials.<br>
    • <strong>UQ Lakes Busway:</strong> Fast connection to South Bank and the CBD.<br>
    • UniCube provides free box drop-off and pickup directly to all Colleges on College Road!`
  },
  work: {
    title: 'Where can I find part-time student work?',
    tag: 'STUDENT EMPLOYMENT',
    content: `Brisbane is a bustling student city with active part-time opportunities:
    <br><br>
    • <strong>Barista & Cafe Work:</strong> Brisbane takes specialty coffee seriously! A 1-day barista course pays for itself quickly.<br>
    • <strong>Retail & Logistics:</strong> UniCube hires casual student helpers for moving days and warehouse organization each semester.`
  }
};

function showPolaroidDetail(key) {
  const item = POLAROID_DATA[key];
  if (!item) return;

  const content = `
    <span class="sub-label-tag">${item.tag}</span>
    <h3 class="modal-title" style="margin-bottom: 16px;">${item.title}</h3>
    <div style="font-size: 1rem; color: #4B5563; line-height: 1.6;">${item.content}</div>
    <div style="margin-top: 24px;">
      <button class="btn btn-primary" onclick="closeModal('guide-modal'); openModal('booking-modal');">Get UniCube Student Support &rarr;</button>
    </div>
  `;
  document.getElementById('guide-modal-content').innerHTML = content;
  openModal('guide-modal');
}

/* ========================================================
   7. GUIDES MODAL ARTICLE PREVIEWS
   ======================================================== */
const GUIDE_ARTICLES = {
  accom: {
    title: 'Moving to Accommodation: The Complete Checklist',
    tag: 'PRACTICAL GUIDE',
    content: `Moving into a new college, private room, or sharehouse is exciting. Here is what you need to check:
    <br><br>
    1. <strong>Condition Report:</strong> Take photos of every room, wall, and appliance on day one before unpacking.<br>
    2. <strong>Inventory Check:</strong> Ensure all furniture listed in your agreement is in working condition.<br>
    3. <strong>Connecting Utilities:</strong> Look for student internet packages with no 12-month lock-in contract.<br>
    4. <strong>UniCube Moving Vans:</strong> Don't try to drag 4 suitcases on the bus. Book our student moving service from just $49.`
  },
  jobs: {
    title: 'Part-Time Jobs in Brisbane: Finding Your First Role',
    tag: 'CAREER & BUDGETING',
    content: `Balancing study and part-time work gives you financial independence and real local experience.
    <br><br>
    • <strong>Resume formatting:</strong> Keep your Australian resume to 1-2 pages with your visa status and availability clearly listed.<br>
    • <strong>Key Hiring Seasons:</strong> February/March (semester 1 start) and July/August (semester 2 start) are the peak hiring months.<br>
    • <strong>Tax File Number (TFN):</strong> Apply for a TFN via the ATO website as soon as you arrive to avoid higher withholding taxes.`
  },
  travel: {
    title: 'Going Home for the Holidays: Zero-Stress Storage',
    tag: 'STUDENT TRAVEL',
    content: `When the exam period ends, the last thing you want is hauling luggage around or paying thousands in rent for an empty room.
    <br><br>
    • <strong>UniCube Holiday Storage:</strong> We deliver sturdy packing boxes to your room, pick them up when packed, and store them securely until you return in the new semester.<br>
    • <strong>Flexible Delivery:</strong> Moving into a completely different address when you get back? Just update your address in your UniCube account and we deliver there!`
  },
  brisbane: {
    title: 'Exploring Brisbane: Best Sights, Food & Sunsets',
    tag: 'LOCAL DISCOVERY',
    content: `Welcome to the Sunshine State capital! Here are our team's favourite local spots:
    <br><br>
    • <strong>Mt Coot-tha Lookout:</strong> Unmatched panoramic views across the city and Moreton Bay.<br>
    • <strong>South Bank Streets Beach:</strong> Australia's only man-made city beach with free entry and palm trees.<br>
    • <strong>Eat Street Northshore:</strong> Shipping containers turned into an international street food paradise every weekend.`
  },
  all: {
    title: 'UniCube Student Resource Library',
    tag: 'ALL GUIDES',
    content: `Explore our free guides curated specifically for students living in Brisbane:
    <br><br>
    • 🏠 <strong>Moving to Accommodation:</strong> Rental advice, bond safety, and moving checklist.<br>
    • 💼 <strong>Part-Time Jobs:</strong> Resume tips, visa regulations, and local hospitality hubs.<br>
    • ✈️ <strong>Going Home for Holidays:</strong> Storage plans and travel preparation.<br>
    • 🌆 <strong>Exploring Brisbane:</strong> Budget friendly student activities, day trips, and transit tricks.`
  }
};

function openGuideArticle(type) {
  const guide = GUIDE_ARTICLES[type] || GUIDE_ARTICLES['all'];
  const content = `
    <span class="sub-label-tag">${guide.tag}</span>
    <h3 class="modal-title" style="margin-bottom: 16px;">${guide.title}</h3>
    <div style="font-size: 1.05rem; color: #4B5563; line-height: 1.6;">${guide.content}</div>
    <div style="margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap;">
      <button class="btn btn-primary" onclick="closeModal('guide-modal'); openModal('booking-modal');">Get Started with UniCube &rarr;</button>
      <button class="btn-text-link" onclick="closeModal('guide-modal');">Close guide</button>
    </div>
  `;
  document.getElementById('guide-modal-content').innerHTML = content;
  openModal('guide-modal');
}

/* ========================================================
   8. SERVICE MENU STACK INTERACTION
   ======================================================== */
function initServiceHighlighting() {
  const cards = document.querySelectorAll('.service-stack-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ========================================================
   9. MODAL MANAGEMENT
   ======================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initEscModalClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-backdrop.open');
      openModals.forEach(m => closeModal(m.id));
      closeMobileDrawer();
    }
  });

  // Click outside modal card to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

/* ========================================================
   10. BOOKING FORM & RADIO INTERACTION
   ======================================================== */
function initBookingRadioSelectors() {
  const radioLabels = document.querySelectorAll('.radio-card');
  radioLabels.forEach(label => {
    label.addEventListener('click', () => {
      radioLabels.forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');
    });
  });
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('student-name').value;
  const campus = document.getElementById('campus-select').options[document.getElementById('campus-select').selectedIndex].text;
  const boxes = document.getElementById('box-count').value;

  alert(`🎉 Thank you, ${name}! Your student quote has been reserved for ${campus}.\n\nEstimated bundle: ${boxes}.\nA confirmation with your 20% Student Welcome Code has been sent to your email!`);
  closeModal('booking-modal');
}

function playMockVideo(btn) {
  btn.innerHTML = `<span style="font-size: 0.9rem; font-weight: 700; color: #FFF;">Playing...</span>`;
  setTimeout(() => {
    alert("🎬 Demo: UniCube student story video player started!");
  }, 300);
}
