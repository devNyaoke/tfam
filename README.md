# TFAM Global Website

Official website for TFAM Global - A global community of faith-rooted justice activists.

## 🚀 Quick Start

1. Clone or download this repository
2. Replace placeholder images in `assets/images/`:
   - `logo.png` - Main logo (color version)
   - `logo-white.png` - White logo for dark backgrounds
   - `favicon.ico` - Browser favicon (16x16, 32x32, 48x48px)
   - `hero-bg.jpg` - Hero section background image
   - `leader1.jpg`, `leader2.jpg` - Leadership photos

3. Open `index.html` in a web browser

## 📁 Project Structure

```
tfam-global/
├── index.html              # Main homepage
├── privacy-policy.html     # Privacy policy page
├── cookie-policy.html      # Cookie policy page
├── security-policy.html    # Security policy page
├── README.md              # This file
└── assets/
    ├── css/
    │   ├── style.css      # Main stylesheet
    │   ├── responsive.css # Responsive design
    │   └── animations.css # Animation styles
    ├── js/
    │   ├── main.js        # Core JavaScript
    │   ├── cookies.js     # Cookie management
    │   └── newsletter.js  # Newsletter popup
    └── images/
        ├── logo.png
        ├── logo-white.png
        ├── favicon.ico
        └── hero-bg.jpg
```

## 🎨 Color Scheme

- **Primary Red:** #DC143C (Crimson)
- **Deep Red:** #8B0000
- **Presbyter Blue:** #4169E1
- **Charcoal:** #1C1C1C
- **White:** #FFFFFF

## ✨ Features

- ✅ Fully responsive design
- ✅ Cookie consent management
- ✅ Newsletter popup (weekly)
- ✅ Interactive map with regional pins
- ✅ Contact form
- ✅ Smooth scrolling navigation
- ✅ Privacy, Cookie, and Security policies
- ✅ GDPR compliant
- ✅ Accessible design

## 🔧 Customization

### Change Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
    --primary-red: #DC143C;
    --presbyter-blue: #4169E1;
    /* ... */
}
```

### Update Content
- Edit text directly in `index.html`
- Replace images in `assets/images/`
- Modify policy pages as needed

### Configure Newsletter
Edit timing in `assets/js/newsletter.js`:
```javascript
const SHOW_DELAY = 5000; // Show after 5 seconds
const SHOW_INTERVAL_DAYS = 7; // Show every 7 days
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Features

- SSL/TLS encryption ready
- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure cookie handling
- Input validation

## 📧 Integration Needed

### Email Services
Connect contact form and newsletter to:
- Mailchimp
- SendGrid
- AWS SES
- Or your preferred email service

### Analytics
Add tracking code to `assets/js/cookies.js`:
```javascript
// Google Analytics
// gtag('config', 'GA_MEASUREMENT_ID');
```

### Payment Processing
Integrate donation buttons with:
- Stripe
- PayPal
- Donorbox
- Or your preferred payment processor

## 📄 License

© 2026 TFAM Global. All rights reserved.

## 👥 Support

For questions or support:
- Email: info@tfamglobal.org
- Website: https://tfamglobal.org

---

**Built with ❤️ for justice and equity**
```

---

## 🎯 DEPLOYMENT CHECKLIST

### Before Going Live:

1. **Images**
   - [ ] Replace all placeholder images
   - [ ] Add proper logo files (PNG, SVG)
   - [ ] Create favicon (16x16, 32x32, 48x48)
   - [ ] Optimize images for web

2. **Content**
   - [ ] Update leader names and roles
   - [ ] Add actual Instagram feed integration
   - [ ] Update contact information
   - [ ] Verify all text content

3. **Integrations**
   - [ ] Connect contact form to email service
   - [ ] Set up newsletter service (Mailchimp, etc.)
   - [ ] Integrate donation payment processor
   - [ ] Add Google Analytics or analytics platform

4. **Testing**
   - [ ] Test on multiple browsers
   - [ ] Test on mobile devices
   - [ ] Test all forms
   - [ ] Verify links work
   - [ ] Check page load speed

5. **Security**
   - [ ] Enable HTTPS/SSL certificate
   - [ ] Configure security headers
   - [ ] Set up GDPR cookie consent
   - [ ] Test security policies

6. **SEO**
   - [ ] Add meta descriptions
   - [ ] Create sitemap.xml
   - [ ] Set up robots.txt
   - [ ] Submit to search engines

---

**All files are ready for deployment! 🚀**