# BNI Website Upgrade — Client Presentation Checklist
**Prepared for:** Boys Network International  
**Date:** May 2026  
**Review URL:** https://boysnetworkinternational.com (live) / localhost:3001 (dev)

---

## LEGEND
- [x] **DONE** — Built, verified live on the site
- [ ] **PENDING CLIENT** — Needs information or action from BNI before we can complete
- [ ] **PHASE 2** — Agreed to build in a future phase; not yet started

---

## 1. WhatsApp & Communication

- [x] **Floating WhatsApp widget** — Green WhatsApp button fixed to bottom-right on every page. Opens a pre-filled chat to the company MTN number (+256 791 408 459).
- [x] **"Talk to a Human" button in bot** — The enrollment bot has a direct WhatsApp handover button with a pre-filled message (e.g. "Hi, I'm on the BNI website and need help with enrollment…").
- [x] **Status inquiry in bot** — Users can type their parent email into the bot to get an instant update on their registration status, handled directly inside the chat window.
- [x] **Bot on all pages** — The enrollment assistant appears on every public page (home, about, programs, magazine, contact, enroll). It is correctly hidden on `/admin` and `/camp-live`.

---

## 2. Enrollment Bot — Agentic & Intelligence Features

- [x] **Automated intake via bot** — The bot collects the boy's name, age, area of interest, and parent email before the user ever touches the formal registration form. Data is saved to the enrollment database immediately.
- [x] **Lead recovery trigger** — If a user spends more than 2 minutes on `/enroll` or `/programs` without completing the action, the bot automatically opens with the message: *"Hey! I noticed you've been looking at enrollment. Need help with the Mobile Money or bank transfer payment process?"*
- [x] **Return visitor greeting** — Returning visitors see *"Welcome back! Registration for the Rise & Thrive Bootcamp 2026 is still open — ready to secure your son's spot?"* instead of a generic greeting. Tracked via browser storage.

---

## 3. Enrollment Form

- [x] **Multi-step form (4 steps)** — The formal enrollment form at `/enroll` is broken into 4 clear steps: Boy's Details → Preferences & Health → Parent/Guardian → Consent & Submit. No more overwhelming one-page dump.
- [x] **Payment preference selection** — Users can select MTN MoMo or Airtel Money as their payment method during enrollment. Payment codes (MTN: 657538 / Airtel: 4395441) are shown on the contact page.

> **PENDING CLIENT — Payment Gateway Integration:**  
> Real-time automated receipts (PDF emailed on payment confirmation) require registration with a payment processor. Options discussed:
> - **Pesapal** (recommended for Uganda — 2.8% fee, supports UGX MoMo + USD card)
> - **Flutterwave** (wider Africa coverage)
> - **MTN/Airtel direct** (slower integration, requires API access agreement with the networks)
>
> **Action required from BNI:** Register for a Pesapal (or chosen provider) business account and share the API credentials. We will handle the technical integration.

> **PHASE 2 — Early Bird / Auto-Pricing:**  
> System-enforced "Early Bird" deadlines where the price automatically increases after a set date. Requires the payment gateway above to be live first.

> **PHASE 2 — Multi-Currency (UGX + USD):**  
> Dollar account payment option alongside MoMo. Also dependent on the payment gateway.

---

## 4. Camp Countdown & Urgency

- [x] **Live countdown timer on homepage** — Dynamic real-time counter showing Days : Hours : Minutes : Seconds to the Rise & Thrive Bootcamp (23 Aug 2026). Visible immediately on landing.

---

## 5. Camp Live Hub

- [x] **Camp Live page** — Dedicated page at `/camp-live` for real-time updates (text, photos, short clips) during active camp days. Accessible via the red dot "Camp Live" link in the nav. The bot is hidden on this page to keep it focused.
- [x] **Admin can post live updates** — Posts go through the admin panel under "Posts / Stories."

---

## 6. Newsletter

- [x] **Newsletter signup** — Embedded signup on the Camp Live page. Subscribers are stored in the database.
- [x] **Newsletter admin panel** — Admin can compose and send newsletters at `/admin/newsletters`. Pre-camp, during-camp, and post-camp templates are available.

> **PENDING CLIENT — Sending Email Address:**  
> To send newsletters from a branded address (e.g. `news@boysnetworkinternational.com`), BNI needs to provide the email address and/or set up an email sending domain. Currently uses the Gmail address as fallback.

---

## 7. Feedback & Post-Camp Survey

- [x] **Automated feedback page** — A post-camp survey lives at `/feedback`. It captures a star rating, what was helpful, what to improve, parent/son names, and a recommendation flag.
- [x] **Feedback admin panel** — All responses are viewable at `/admin/newsletters/feedback`.

> **PHASE 2 — Automated trigger:**  
> The survey should be auto-sent via email 48 hours after camp ends, triggered by the admin marking the camp as complete. Requires the sending email address (above) to be set up.

---

## 8. Social Media

- [x] **Instagram link** — Live at `https://instagram.com/boysnetworkint` (opens in new tab).
- [x] **X / Twitter link** — Live at `https://twitter.com/BoysNetworkInt` (opens in new tab).
- [x] **TikTok link** — Set to `@boysnetworkinternational` (best guess — awaiting confirmation).

> **PENDING CLIENT — Facebook URL:**  
> BNI confirmed they have a Facebook page but the URL has not been shared. Currently showing a placeholder (`#`). Please share the exact Facebook page URL.

> **PENDING CLIENT — LinkedIn URL:**  
> Same situation as Facebook. Currently a placeholder. Please share the LinkedIn page URL.

> **PENDING CLIENT — TikTok handle confirmation:**  
> Please confirm the exact TikTok handle/URL so we can update the link.

> **PHASE 2 — Social Wall auto-sync:**  
> Auto-syncing Instagram/X posts to a website "Social Wall" requires the Meta Graph API (Facebook Business) and X Developer API. This is a larger integration — agreed to handle in a later phase.

---

## 9. Registration Database & Admin

- [x] **Enrollment database** — All registrations are stored securely. Admin can view and filter by enrollment status at `/admin/enrollments`.
- [x] **Admin panel** — Secured behind Google OAuth. Sections: Dashboard, Enrollments, Gallery, Magazine, Posts, Newsletter, Feedback, Settings, Team.
- [x] **Contact inbox** — Messages from the contact form land in `/admin/inbox`.

> **PHASE 2 — Admin editable camp dates:**  
> Currently the camp date (Aug 23) is hardcoded in the countdown and enrollment copy. A future update will let admin update camp dates from the settings panel without a code deploy.

---

## 10. Gallery & Magazine

- [x] **Gallery** — Categorized gallery at `/gallery` with optimized image loading. Admin can add/edit albums at `/admin/gallery`.
- [x] **Magazine section** — Independent magazine section at `/magazine`. Admin can publish issues at `/admin/magazine`.

> **PENDING CLIENT — Gallery content:**  
> Decision needed: start fresh with 2026 content, or load last year's photos? Please confirm so we can populate the gallery before launch.

---

## 11. Policies & Legal

- [x] **Privacy Policy accessible from footer** — Link to `/info#privacy` is in every page footer.
- [x] **Terms referenced on enrollment form** — Consent & T&Cs checkbox on the enrollment form step 4.

> **PENDING CLIENT — T&Cs document:**  
> BNI agreed to share their existing Terms & Conditions document for review and upload. This has not been received yet. Please send the document so we can standardize the legal language and make it accessible.

---

## 12. Domain & Hosting

> **PENDING CLIENT — Domain access:**  
> The domain is currently held by "Elijah" pending payment confirmation from BNI. Once the domain transfer is confirmed, we can point it to the live deployment. Please resolve this on your end so we can go live.

---

## 13. SEO & Technical

- [x] **Schema markup** — Homepage has correct Organization schema with phone, email, and social handles.
- [x] **Mobile responsive** — All pages tested on mobile viewports.
- [x] **Sitemap & robots.txt** — Generated automatically for search engine crawling.

> **PHASE 2 — Technical SEO audit:**  
> A deeper pass on Core Web Vitals, image compression pipeline, and page speed scores against Ugandan/East African network conditions.

---

## Summary: What BNI Needs to Action Before Go-Live

| # | Item | Why It's Blocking |
|---|------|-------------------|
| 1 | **Payment gateway registration** (Pesapal recommended) | Required for automated receipts, multi-currency, early bird pricing |
| 2 | **Facebook page URL** | Social link is currently broken (`#`) |
| 3 | **LinkedIn page URL** | Social link is currently broken (`#`) |
| 4 | **TikTok handle confirmation** | May be pointing to wrong account |
| 5 | **Domain transfer from "Elijah"** | Site cannot go live without DNS control |
| 6 | **Branded sending email address** | Required for newsletter delivery and feedback triggers |
| 7 | **T&Cs document** | Legal section incomplete |
| 8 | **Gallery content decision** | Fresh 2026 content vs. last year's photos |

---

*Document prepared by Calvin Magezi — Developer, BNI Website Project.*
