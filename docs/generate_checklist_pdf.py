from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# Color palette
BNI_BLUE      = colors.HexColor('#1f2fe6')
BNI_DARK      = colors.HexColor('#070d4f')
BNI_LIGHT     = colors.HexColor('#e8eaff')
GREEN         = colors.HexColor('#16a34a')
AMBER         = colors.HexColor('#d97706')
RED           = colors.HexColor('#dc2626')
GRAY_TEXT     = colors.HexColor('#374151')
GRAY_LIGHT    = colors.HexColor('#f3f4f6')
GRAY_BORDER   = colors.HexColor('#d1d5db')
WHITE         = colors.white

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

doc = SimpleDocTemplate(
    '/Users/calvinmagezi/Documents/GitHub/bni-website/docs/BNI-Website-Client-Checklist.pdf',
    pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=16 * mm, bottomMargin=16 * mm,
    title='BNI Website Upgrade — Client Checklist',
    author='Calvin Magezi',
)

styles = getSampleStyleSheet()

# Custom styles
def S(name, **kw):
    return ParagraphStyle(name, **kw)

BODY = S('body', fontName='Helvetica', fontSize=9.5, leading=14, textColor=GRAY_TEXT)
BODY_BOLD = S('body_bold', fontName='Helvetica-Bold', fontSize=9.5, leading=14, textColor=GRAY_TEXT)
SMALL = S('small', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#6b7280'))
SECTION = S('section', fontName='Helvetica-Bold', fontSize=11, leading=16,
            textColor=BNI_DARK, spaceBefore=10, spaceAfter=2)
PENDING_TITLE = S('pending_title', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=AMBER)
PHASE2_TITLE  = S('phase2_title',  fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=colors.HexColor('#7c3aed'))
ITEM          = S('item', fontName='Helvetica', fontSize=9.5, leading=14, textColor=GRAY_TEXT, leftIndent=6)
ACTION_TITLE  = S('action_title', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=RED)

story = []

# ── HEADER BLOCK ─────────────────────────────────────────────────────────────
header_data = [[
    Paragraph('<font color="#ffffff"><b>BNI Website Upgrade</b></font><br/>'
              '<font color="#c7d0ff" size="9">Client Presentation Checklist — May 2026</font>',
              S('hdr', fontName='Helvetica-Bold', fontSize=16, leading=22,
                textColor=WHITE)),
    Paragraph('<font color="#c7d0ff" size="8">Prepared by Calvin Magezi<br/>'
              'Boys Network International</font>',
              S('hdr2', fontName='Helvetica', fontSize=8, leading=13,
                textColor=WHITE, alignment=2)),
]]
header_tbl = Table(header_data, colWidths=[PAGE_W - 2*MARGIN - 42*mm, 42*mm])
header_tbl.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BNI_DARK),
    ('ROUNDEDCORNERS', [8]),
    ('TOPPADDING',    (0,0), (-1,-1), 12),
    ('BOTTOMPADDING', (0,0), (-1,-1), 12),
    ('LEFTPADDING',   (0,0), (-1,-1), 14),
    ('RIGHTPADDING',  (0,0), (-1,-1), 14),
    ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(header_tbl)
story.append(Spacer(1, 5*mm))

# ── LEGEND ───────────────────────────────────────────────────────────────────
legend_items = [
    ('[x] DONE', WHITE, GREEN),
    ('[ ] PENDING CLIENT', WHITE, AMBER),
    ('[ ] PHASE 2', WHITE, colors.HexColor('#7c3aed')),
]
leg_cells = [[
    Paragraph(f'<b><font color="white">{t}</font></b>',
              S('leg', fontName='Helvetica-Bold', fontSize=8, leading=11, alignment=TA_CENTER))
    for t, _, bg in legend_items
]]
leg_tbl = Table(leg_cells, colWidths=[(PAGE_W - 2*MARGIN)/3]*3, hAlign='LEFT')
leg_tbl.setStyle(TableStyle([
    ('BACKGROUND', (i,0), (i,0), legend_items[i][2]) for i in range(3)
] + [
    ('TOPPADDING',    (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('LEFTPADDING',   (0,0), (-1,-1), 8),
    ('ROUNDEDCORNERS', [5]),
]))
story.append(leg_tbl)
story.append(Spacer(1, 5*mm))


# ── HELPER: done item ─────────────────────────────────────────────────────────
def done(title, detail=None):
    rows = [[
        Paragraph('<font color="#16a34a"><b>[x]</b></font>',
                  S('chk', fontName='Helvetica-Bold', fontSize=10, leading=14)),
        Paragraph(f'<b>{title}</b>', BODY_BOLD),
    ]]
    tbl = Table(rows, colWidths=[8*mm, PAGE_W - 2*MARGIN - 8*mm])
    tbl.setStyle(TableStyle([
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING',    (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING',   (0,0), (-1,-1), 0),
        ('RIGHTPADDING',  (0,0), (-1,-1), 0),
    ]))
    elems = [tbl]
    if detail:
        elems.append(Paragraph(detail, S('det', fontName='Helvetica', fontSize=8.5,
                                          leading=12, textColor=colors.HexColor('#6b7280'),
                                          leftIndent=8*mm)))
    elems.append(Spacer(1, 1.5*mm))
    return elems


def pending_block(action_title, body):
    rows = [[
        Paragraph(f'<b>PENDING CLIENT</b>',
                  S('pb', fontName='Helvetica-Bold', fontSize=8, leading=12, textColor=WHITE)),
        Paragraph(f'<b>{action_title}</b><br/>'
                  f'<font size="8.5" color="#374151">{body}</font>',
                  S('pb2', fontName='Helvetica', fontSize=9, leading=13, textColor=GRAY_TEXT)),
    ]]
    tbl = Table(rows, colWidths=[26*mm, PAGE_W - 2*MARGIN - 26*mm])
    tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (0,0), AMBER),
        ('BACKGROUND',    (1,0), (1,0), colors.HexColor('#fffbeb')),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING',    (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('RIGHTPADDING',  (0,0), (-1,-1), 8),
        ('LINEABOVE',     (0,0), (-1,0), 0.5, AMBER),
        ('LINEBELOW',     (0,0), (-1,0), 0.5, AMBER),
    ]))
    return [tbl, Spacer(1, 2*mm)]


def phase2_block(title, body):
    rows = [[
        Paragraph('<b>PHASE 2</b>',
                  S('p2', fontName='Helvetica-Bold', fontSize=8, leading=12, textColor=WHITE)),
        Paragraph(f'<b>{title}</b><br/>'
                  f'<font size="8.5" color="#374151">{body}</font>',
                  S('p2b', fontName='Helvetica', fontSize=9, leading=13, textColor=GRAY_TEXT)),
    ]]
    tbl = Table(rows, colWidths=[26*mm, PAGE_W - 2*MARGIN - 26*mm])
    tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (0,0), colors.HexColor('#7c3aed')),
        ('BACKGROUND',    (1,0), (1,0), colors.HexColor('#f5f3ff')),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING',    (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('RIGHTPADDING',  (0,0), (-1,-1), 8),
    ]))
    return [tbl, Spacer(1, 2*mm)]


def section(num, title):
    return [
        HRFlowable(width='100%', thickness=1, color=GRAY_BORDER, spaceAfter=3),
        Paragraph(f'{num}. {title}', SECTION),
    ]


# ── SECTIONS ──────────────────────────────────────────────────────────────────

story += section('1', 'WhatsApp & Communication')
story += done('Floating WhatsApp widget',
              'Green WhatsApp button fixed bottom-right on every page. Opens a pre-filled chat to the company MTN number (+256 791 408 459).')
story += done('"Talk to a Human" button in bot',
              'The enrollment bot includes a direct WhatsApp handover button with a pre-filled message.')
story += done('Status inquiry inside bot',
              'Users enter their parent email into the bot to get an instant registration status update, without leaving the chat window.')
story += done('Bot on all pages',
              'Enrollment assistant appears on every public page. Correctly hidden on /admin and /camp-live.')
story.append(Spacer(1, 2*mm))

story += section('2', 'Enrollment Bot — Agentic Features')
story += done('Automated intake via bot',
              "Bot collects the boy's name, age, area of interest, and parent email before the user reaches the formal form. Data saved to the database immediately.")
story += done('Lead recovery trigger (2-minute)',
              "If a user spends 2+ minutes on /enroll or /programs without completing, the bot auto-opens: \"I noticed you're checking out enrollment. Need help with the payment process?\"")
story += done('Return visitor greeting',
              "Returning visitors see \"Welcome back! Registration is still open\" instead of a generic greeting, tracked via browser storage.")
story.append(Spacer(1, 2*mm))

story += section('3', 'Enrollment Form')
story += done('Multi-step form (4 steps)',
              "The /enroll form is broken into 4 clear steps: Boy's Details > Preferences & Health > Parent/Guardian > Consent & Submit.")
story += done('Payment preference selection',
              'Users choose MTN MoMo or Airtel Money during enrollment. Payment codes shown on contact page (MTN: 657538 / Airtel: 4395441).')
story += pending_block(
    'Payment Gateway Registration',
    'Real-time PDF receipts and automated invoicing require a payment processor account.<br/>'
    'Recommended: <b>Pesapal</b> (Uganda-based, 2.8% fee, supports UGX MoMo + USD card).<br/>'
    'Alternatives: Flutterwave, or direct MTN/Airtel API (slower).<br/>'
    '<b>Action required:</b> BNI registers a Pesapal business account and shares API credentials.'
)
story += phase2_block('Early Bird / Auto-Pricing', 'Automatic price increase after a set deadline. Requires the payment gateway above to be live first.')
story += phase2_block('Multi-Currency (UGX + USD)', 'Dollar account payment option alongside MoMo. Also depends on payment gateway.')

story += section('4', 'Camp Countdown & Urgency')
story += done('Live countdown timer on homepage',
              'Dynamic real-time Days : Hours : Minutes : Seconds counter to Rise & Thrive Bootcamp (23 Aug 2026), visible immediately on landing.')
story.append(Spacer(1, 2*mm))

story += section('5', 'Camp Live Hub')
story += done('Camp Live page',
              'Dedicated page at /camp-live for real-time text/photo/video updates during active camp days. Accessible via the red dot "Camp Live" nav link.')
story += done('Admin can post live updates', 'Posts go through the admin panel under Posts / Stories.')
story.append(Spacer(1, 2*mm))

story += section('6', 'Newsletter')
story += done('Newsletter signup', 'Embedded signup on the Camp Live page. Subscribers stored in the database.')
story += done('Newsletter admin panel', 'Admin can compose and send newsletters at /admin/newsletters. Pre-camp, during-camp, and post-camp templates available.')
story += pending_block(
    'Branded Sending Email Address',
    'To send newsletters from a branded address (e.g. news@boysnetworkinternational.com), BNI must provide the address or set up an email sending domain.<br/>'
    '<b>Action required:</b> Share the preferred sending email address.'
)

story += section('7', 'Feedback & Post-Camp Survey')
story += done('Automated feedback page', 'Post-camp survey at /feedback captures star rating, highlights, improvements, parent/son names, and recommendation flag.')
story += done('Feedback admin panel', 'All responses viewable at /admin/newsletters/feedback.')
story += phase2_block('Automated survey trigger', 'Auto-send survey email 48 hours after camp ends, triggered when admin marks camp complete. Requires branded email above.')

story += section('8', 'Social Media')
story += done('Instagram link — live', 'https://instagram.com/boysnetworkint (opens in new tab).')
story += done('X / Twitter link — live', 'https://twitter.com/BoysNetworkInt (opens in new tab).')
story += done('TikTok link — set', 'Set to @boysnetworkinternational — awaiting client confirmation of exact handle.')
story += pending_block('Facebook Page URL', 'BNI confirmed they have a Facebook page but the URL has not been shared. Link currently shows as a placeholder (#). Please share the exact Facebook page URL.')
story += pending_block('LinkedIn Page URL', 'Same as Facebook — URL not shared. Showing placeholder. Please share the LinkedIn company page URL.')
story += pending_block('TikTok Handle Confirmation', 'Please confirm the exact TikTok handle so the link can be verified.')
story += phase2_block('Social Wall Auto-Sync', 'Auto-syncing Instagram/X posts to a website Social Wall requires Meta Graph API and X Developer API. Agreed for a later phase.')

story += section('9', 'Registration Database & Admin')
story += done('Enrollment database', 'All registrations stored securely. Admin can view and filter by status at /admin/enrollments.')
story += done('Admin panel (Google OAuth)', 'Secured via Google sign-in. Sections: Dashboard, Enrollments, Gallery, Magazine, Posts, Newsletter, Feedback, Settings, Team.')
story += done('Contact inbox', 'Messages from the contact form land in /admin/inbox.')
story += phase2_block('Admin editable camp dates', 'Camp date (Aug 23) is currently hardcoded. A future update will let admin change it from the settings panel without a code deploy.')

story += section('10', 'Gallery & Magazine')
story += done('Gallery', 'Categorized gallery at /gallery with optimized image loading. Admin manages albums at /admin/gallery.')
story += done('Magazine section', 'Independent magazine section at /magazine. Admin publishes issues at /admin/magazine.')
story += pending_block('Gallery Content Decision', 'Start fresh with 2026 content, or load last year\'s photos? Please confirm so the gallery can be populated before launch.')

story += section('11', 'Policies & Legal')
story += done('Privacy Policy in footer', 'Link to /info#privacy on every page footer.')
story += done('T&Cs on enrollment form', 'Consent and Terms checkbox on enrollment Step 4.')
story += pending_block('T&Cs Document', 'BNI agreed to share their existing Terms & Conditions document for review and upload. Not yet received. Please send the document so legal language can be standardized.')

story += section('12', 'Domain & Hosting')
story += pending_block('Domain Transfer', 'Domain is held by "Elijah" pending payment confirmation from BNI. Site cannot go live until DNS control is transferred. Please resolve this on your end.')

story += section('13', 'SEO & Technical')
story += done('Schema markup', 'Correct Organization schema on homepage with phone, email, and social handles.')
story += done('Mobile responsive', 'All pages tested on mobile viewports.')
story += done('Sitemap & robots.txt', 'Auto-generated for search engine crawling.')
story += phase2_block('Technical SEO audit', 'Deep pass on Core Web Vitals, image compression pipeline, and page speed against Ugandan/East African network conditions.')

story.append(Spacer(1, 5*mm))

# ── SUMMARY TABLE ─────────────────────────────────────────────────────────────
story.append(HRFlowable(width='100%', thickness=1.5, color=BNI_BLUE, spaceAfter=4))
story.append(Paragraph('What BNI Needs to Action Before Go-Live',
                        S('sumhdr', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=BNI_DARK, spaceAfter=4)))

summary_rows = [
    ['#', 'Item', 'Why It Blocks Go-Live'],
    ['1', 'Payment gateway registration\n(Pesapal recommended)', 'Automated receipts, multi-currency, early bird pricing all depend on this'],
    ['2', 'Facebook page URL', 'Social link is currently broken (#)'],
    ['3', 'LinkedIn page URL', 'Social link is currently broken (#)'],
    ['4', 'TikTok handle confirmation', 'May be pointing to wrong account'],
    ['5', 'Domain transfer from "Elijah"', 'Site cannot go live without DNS control'],
    ['6', 'Branded sending email address', 'Required for newsletter delivery and feedback survey triggers'],
    ['7', 'T&Cs document', 'Legal section incomplete'],
    ['8', 'Gallery content decision', 'Fresh 2026 content vs. last year\'s photos'],
]

col_w = [(PAGE_W - 2*MARGIN) * r for r in [0.06, 0.38, 0.56]]
cell_style = S('tc', fontName='Helvetica', fontSize=8.5, leading=12, textColor=GRAY_TEXT)
head_style = S('th', fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=WHITE)

tbl_data = []
for i, row in enumerate(summary_rows):
    st = head_style if i == 0 else cell_style
    tbl_data.append([Paragraph(cell, st) for cell in row])

sum_tbl = Table(tbl_data, colWidths=col_w, repeatRows=1)
sum_tbl.setStyle(TableStyle([
    ('BACKGROUND',    (0,0), (-1,0), BNI_DARK),
    ('BACKGROUND',    (0,1), (-1,-1), WHITE),
    ('ROWBACKGROUNDS',(0,1), (-1,-1), [WHITE, GRAY_LIGHT]),
    ('GRID',          (0,0), (-1,-1), 0.4, GRAY_BORDER),
    ('TOPPADDING',    (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('LEFTPADDING',   (0,0), (-1,-1), 7),
    ('RIGHTPADDING',  (0,0), (-1,-1), 7),
    ('VALIGN',        (0,0), (-1,-1), 'TOP'),
]))
story.append(sum_tbl)
story.append(Spacer(1, 4*mm))

story.append(Paragraph(
    'Document prepared by Calvin Magezi — Developer, BNI Website Project — May 2026',
    S('footer', fontName='Helvetica-Oblique', fontSize=7.5, leading=10,
      textColor=colors.HexColor('#9ca3af'), alignment=TA_CENTER)
))

doc.build(story)
print('PDF generated.')
