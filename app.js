// Shared enhancements. Each page's content and navigation live in its HTML file.
'use strict';
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
const backTop = document.querySelector('#back-top');
backTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
});
window.addEventListener('scroll', () => {
  backTop.hidden = window.scrollY < 500;
}, { passive: true });

// Filter the actual HTML resources. Add a resource in resources.html only.
const resourceSearch = document.querySelector('#resource-search');
if (resourceSearch) {
  const filters = [...document.querySelectorAll('.resource-filter')];
  const rows = [...document.querySelectorAll('#resource-list .resource-row')];
  function filterResources() {
    const category = filters.find(button => button.getAttribute('aria-pressed') === 'true').dataset.category;
    const query = resourceSearch.value.trim().toLowerCase();
    let count = 0;
    rows.forEach(row => {
      const matches = (category === 'All' || row.dataset.category === category || row.dataset.category === 'Everyone')
        && row.textContent.toLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) count++;
    });
    document.querySelector('#resource-count').textContent = `${count} resource${count === 1 ? '' : 's'} found`;
    document.querySelector('#no-resources').hidden = count !== 0;
  }
  resourceSearch.addEventListener('input', filterResources);
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterResources();
  }));
  filterResources();
}

// Calendar is limited to news.html. Dates are interpreted in the school's timezone.
const calendarGrid = document.querySelector('#calendar-grid');
if (calendarGrid) {
  const schoolDate = () => {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Africa/Johannesburg', year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return new Date(Number(values.year), Number(values.month) - 1, Number(values.day));
  };
  let monthDate = schoolDate();
  monthDate.setDate(1);
  function renderCalendar() {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const today = schoolDate();
    document.querySelector('#month-label').textContent = monthDate.toLocaleDateString('en-ZA', {
      month: 'long', year: 'numeric'
    });
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    let html = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      .map(day => `<span class="weekday">${day}</span>`).join('');
    html += '<span aria-hidden="true"></span>'.repeat(offset);
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      html += `<span${isToday ? ' class="today" aria-current="date"' : ''}>${day}</span>`;
    }
    calendarGrid.innerHTML = html;
  }
  document.querySelector('#prev-month').addEventListener('click', () => {
    monthDate.setMonth(monthDate.getMonth() - 1);
    renderCalendar();
  });
  document.querySelector('#next-month').addEventListener('click', () => {
    monthDate.setMonth(monthDate.getMonth() + 1);
    renderCalendar();
  });
  document.querySelector('#today-month').addEventListener('click', () => {
    monthDate = schoolDate();
    monthDate.setDate(1);
    renderCalendar();
  });
  renderCalendar();
  const filters = [...document.querySelectorAll('.news-filter')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('#notice-list article').forEach(article => {
      article.hidden = button.dataset.category !== 'All' && article.dataset.category !== button.dataset.category;
    });
  }));
}

// Compose a draft, never submit an email or store visitor data.
const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.querySelector('button[type="submit"]').disabled = false;
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const recipient = document.querySelector('.contact-details a[href^="mailto:"]').href;
    const subject = `${data.get('topic')} — ${data.get('name')}`;
    const body = `Name: ${data.get('name')}\nReply email: ${data.get('email')}\n\n${data.get('message')}`;
    document.querySelector('#email-status').textContent =
      'Your email draft is ready to open. Review it in your email app and send it when you are ready.';
    location.href = `${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
