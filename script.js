// Toju Health — site interactions
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

// Waitlist form
// NOTE: this currently has no backend wired up. It stores nothing.
// Before launch, connect this to a real endpoint — e.g. a Formspree form,
// a Google Form, or a simple API route once the app backend supports it —
// and replace the localStorage line + fake delay below with an actual fetch() call.
const form = document.getElementById('waitlistForm');
const status = document.getElementById('waitlistStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!email) return;

  status.textContent = 'Adding you to the list…';

  // Placeholder behavior — replace with a real submission endpoint.
  await new Promise(r => setTimeout(r, 500));

  status.textContent = `You're on the list. We'll email ${email} when your beta spot opens.`;
  form.reset();
});
