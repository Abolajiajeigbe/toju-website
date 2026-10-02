// Toju Health — site interactions
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

// Waitlist form — wired to Supabase.
// This uses the public "anon" key, which is safe to ship in client-side code:
// what it's allowed to do is governed by Row Level Security policies on the
// `waitlist` table (insert-only for anon), not by keeping this key secret.
// TODO: fill these in once confirmed — project URL from Supabase Settings > API,
// and the "anon" / "public" key from the same page (never the service_role key).
const SUPABASE_URL = 'https://nbdikagvymbzrssvlwoe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_CNbUWoJb3aUL31HA7qk0qg_6Kk0fzgn';

const form = document.getElementById('waitlistForm');
const status = document.getElementById('waitlistStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!email) return;

  status.textContent = 'Adding you to the list…';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      status.textContent = `You're on the list. We'll email ${email} when your beta spot opens.`;
      form.reset();
    } else if (res.status === 409) {
      // unique constraint on email — they already signed up
      status.textContent = `You're already on the list — we'll email ${email} when your beta spot opens.`;
      form.reset();
    } else {
      status.textContent = "Something went wrong — mind trying again in a moment?";
    }
  } catch (err) {
    status.textContent = "Something went wrong — mind trying again in a moment?";
  }
});
