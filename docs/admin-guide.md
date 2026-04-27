# BNI Admin Panel — User Guide

**Boys Network International** · Internal Documentation  
For team members with admin access to `boysnetworkinternational.com/admin`

---

## Table of Contents

1. [Accessing the Admin Panel](#1-accessing-the-admin-panel)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Camp Posts — Managing the Live Feed](#3-camp-posts--managing-the-live-feed)
4. [Stories — Managing Story Bubbles](#4-stories--managing-story-bubbles)
5. [Camp Stats — Sidebar Numbers](#5-camp-stats--sidebar-numbers)
6. [Gallery — Albums & Photos](#6-gallery--albums--photos)
7. [Team Members — Meet the Founders](#7-team-members--meet-the-founders)
8. [Inbox — Messages, Subscribers & Enrollments](#8-inbox--messages-subscribers--enrollments)
9. [Signing Out](#9-signing-out)
10. [Frequently Asked Questions](#10-frequently-asked-questions)

---

## 1. Accessing the Admin Panel

The admin panel is protected and only accessible to authorised BNI email addresses.

### Steps

1. Go to **`https://boysnetworkinternational.com/admin/login`**
2. Click **"Sign in with Google"**
3. Choose your authorised Google account (must be on the allowed list)
4. You will be redirected automatically to the **Dashboard**

> **Note:** If you see "Access Denied" after signing in, your Google account is not on the allowed list. Contact the site administrator to request access.

---

## 2. Dashboard Overview

The Dashboard (`/admin`) is the home screen after login.

### What you see

| Card | What it counts |
|------|----------------|
| 📝 Camp Posts | Total posts in the Camp Live feed |
| 🎬 Stories | Total story bubbles |
| ✉️ Contact Messages | Form submissions from the Contact page |
| 📧 Newsletter Subs | Email sign-ups from the site |
| 🎒 Enrollments | Bootcamp enrollment requests |

### Quick actions

- **+ New Camp Post** — jump straight to creating a new post
- **View Inbox** — jump to contact messages, subscribers, and enrollments

### Navigation

The **left sidebar** shows all sections:

- 📊 Dashboard
- 📝 Camp Posts
- 🎬 Stories
- 📈 Camp Stats
- 🖼️ Gallery
- 👥 Team
- 📬 Inbox

Click any item to navigate to that section.

---

## 3. Camp Posts — Managing the Live Feed

**Location:** Sidebar → "Camp Posts" → `/admin/posts`

Camp Posts appear on the **Camp Live page** (`/camp-live`) as the main social feed. They are what parents and supporters see when following along with the bootcamp.

### Viewing posts

All posts are listed in order (newest first). Each row shows:
- Author name and role
- Time label (e.g. "2 hrs ago", "Yesterday")
- Post text preview
- Live status badge (green = live/published, grey = hidden)
- Edit and Delete buttons

### Creating a new post

1. Click **"+ New Post"** button (top right of the posts list)
2. Fill in the form:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| Author | Person's name (e.g. "Coach Moses") | Yes |
| Role | Their role (e.g. "Lead Mentor") | Yes |
| Avatar URL | Paste a direct image URL for their photo | No |
| Avatar Emoji | Fallback emoji if no photo (e.g. 👤) | No |
| Time Label | Display text for time (e.g. "Just now", "3 hrs ago") | Yes |
| Post Text | The main message content | Yes |
| Image URL | Paste an image URL to attach a photo | No |
| Image Aspect | Choose "landscape" or "portrait" for attached photo | No |
| Highlight Background | CSS colour for a tinted background (e.g. `#fffbeb`) | No |
| Live? | Toggle to show/hide on the public site | Yes |
| Order (Position) | Lower number = shown first | Yes |

3. Click **"Create Post"**

> **Tip:** Set **Live = No** while drafting. Switch to **Yes** when ready to publish.

### Editing a post

1. Click **"Edit"** on any post row
2. Update any fields
3. Click **"Save Changes"**

### Deleting a post

Click **"Delete"** on any post row. This is immediate and cannot be undone.

### What "Live" means

- **Live = Yes** → the post appears on the public `/camp-live` page
- **Live = No** → the post is hidden from visitors but stays in the database

### Ordering posts

The **Position** field controls display order. Lower numbers appear first (top of the feed). Use `0` for the most recent post, `1` for the next, etc.

---

## 4. Stories — Managing Story Bubbles

**Location:** Sidebar → "Stories" → `/admin/stories`

Stories appear at the top of the Camp Live page as circular avatar bubbles — similar to Instagram Stories. They show individual participants or highlights.

### Viewing stories

Each story shows:
- Circular profile photo
- Name label
- "LIVE" badge if active

### Adding a story

At the bottom of the page, use the **Add Story** form:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| Label | Person's name (e.g. "Bryan M.") | Yes |
| Image URL | Direct URL to their photo | Yes |
| Live? | Yes = visible on site, No = hidden | Yes |
| Position (Order) | Lower = appears first | No |

Click **"Add"** to save.

### Deleting a story

Click **"Delete"** next to any story in the list. This is immediate.

> **Tip:** To reorder stories, delete and re-add them with the correct position numbers.

---

## 5. Camp Stats — Sidebar Numbers

**Location:** Sidebar → "Camp Stats" → `/admin/stats`

Camp Stats are the 4 key numbers shown in the Camp Live sidebar (e.g. "47 Boys Enrolled", "3 Days of Camp"). These update instantly on the public site when saved.

### Editing stats

1. You will see up to 4 stat cards, each with:
   - **Icon** — an emoji (click the emoji field to change it)
   - **Label** — the description text (e.g. "Boys Enrolled")
   - **Value** — the number or text (e.g. "47" or "Week 2")

2. Edit any fields directly in the input boxes

3. Click **"Save All Stats"** to apply all changes at once

> **Important:** All stats are saved together with one button click. Changes are live immediately after saving.

---

## 6. Gallery — Albums & Photos

**Location:** Sidebar → "Gallery" → `/admin/gallery`

The Gallery powers the `/gallery` page and individual album pages. Albums contain multiple photos.

### Viewing albums

Each album card shows:
- Cover photo
- Album title
- Photo count and URL slug
- **Manage Photos** button
- **Delete** button

### Creating a new album

1. Click **"+ New Album"** (top right)
2. Fill in:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| Title | Album name (e.g. "Rise & Thrive 2024") | Yes |
| Slug | URL-friendly name (e.g. `rise-thrive-2024`) — no spaces | Yes |
| Cover Image URL | URL for the album thumbnail photo | Yes |

3. Click **"Create Album"**

### Adding photos to an album

1. From the Gallery list, click **"Manage Photos"** on any album
2. You will see all existing photos in the album
3. Use the **Add Photo** form at the bottom:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| Image URL | Direct URL to the photo | Yes |
| Alt text | Description of the photo (for accessibility) | Yes |

4. Click **"Add Photo"** — the photo count updates automatically

### Deleting a photo

Click **"Delete"** next to any photo in the album. The photo count updates automatically.

### Deleting an album

From the Gallery list, click **"Delete"** on an album card. **This also removes the public gallery page for that album.**

---

## 7. Team Members — Meet the Founders

**Location:** Sidebar → "Team" → `/admin/team`

Team members appear on the **About page** in the "Meet the Founders" section.

### Viewing team members

Each card shows:
- Profile photo (or a placeholder icon)
- Name
- Title/role
- **Remove** button

### Adding a team member

Use the **Add Member** form at the bottom:

| Field | What to enter | Required? |
|-------|---------------|-----------|
| Name | Full name (e.g. "John Doe") | Yes |
| Title | Role (e.g. "Co-Founder & Director") | Yes |
| Image URL | Direct URL to their headshot photo | No |
| Order | Lower number = shown first | No |

Click **"Add Member"** to save.

### Removing a team member

Click **"Remove"** on their card. This is immediate.

---

## 8. Inbox — Messages, Subscribers & Enrollments

**Location:** Sidebar → "Inbox" → `/admin/inbox`

The Inbox is **read-only** — it collects all submissions from the public website. No data can be deleted from here.

### Three sections

#### Contact Messages
Submitted via the Contact page. Shows:
- Date submitted
- Name
- Email (clickable to open your mail client)
- Phone
- Message text

#### Newsletter Subscribers
Email addresses collected from the newsletter signup widget. Shows:
- Date subscribed
- Email (clickable)

#### Enrollment Intakes
Submitted via the Camp Live enrollment chatbot. Shows:
- Date submitted
- Child's name
- Age
- Area of interest
- Parent's email (clickable)

> **To reply** to any message or enrollment: click the email address to open a new email in your mail client. All data is read-only in the admin panel.

---

## 9. Signing Out

In the bottom-left of the sidebar, click **"Sign out"** to end your session. You will be redirected to the login page.

---

## 10. Frequently Asked Questions

**Q: I signed in with Google but got redirected back to the login page.**  
A: Your Google account is not on the allowed list. Contact the site administrator.

**Q: I published a post but it's not showing on the Camp Live page.**  
A: Confirm the post has **Live = Yes** in the admin. Also check that the **Position** number is low enough to appear in the feed (lower = higher on the page).

**Q: Can I upload photos directly from my computer?**  
A: Not yet — the current system uses image URLs. Upload your photo to a hosting service (e.g. Google Drive with public sharing, Framer, or Cloudinary) and paste the direct URL.

**Q: What's the difference between "Position 0" and "Position 1"?**  
A: Position 0 appears first (top of the list). Position 99 appears last.

**Q: Can multiple people access the admin panel?**  
A: Yes, as long as their email is on the allowed list. Contact the site administrator to add new users.

**Q: How do I change the live status of a post quickly?**  
A: Go to Camp Posts, click "Edit" on the post, toggle "Live?" to Yes or No, and save.

**Q: I accidentally deleted something. Can it be recovered?**  
A: Deletions in the admin panel are permanent. Contact the site administrator to restore from the database if needed.

---

*Guide written for the BNI Admin Panel · Last updated April 2026*  
*For technical support, contact the site administrator.*
