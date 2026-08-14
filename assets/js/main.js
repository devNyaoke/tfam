// ========================================
// TFAM GLOBAL - MAIN JAVASCRIPT
// Complete functionality for the website
// ========================================

(function() {
    'use strict';

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!menuToggle || !navLinks) return;
        
        // Toggle menu on click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    function initHeaderScroll() {
        const header = document.getElementById('mainHeader');
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    function initSmoothScroll() {
        const header = document.getElementById('mainHeader');
        
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // CONTACT FORM HANDLING - FORMSPREE/GOOGLE
    // ========================================
   function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Google Form submission URL
        // REPLACE WITH YOUR ACTUAL FORM ID AND ENTRY IDS
        const GOOGLE_FORM_ID = '1FAIpQLSebr5wVy2Xj86VZdIfusCbxQd0uJv2_Bd5RmCgRxBd9HTSxQw'; // From your form URL
        const NAME_ENTRY = 'entry.1203468564'; // Your name field ID
        const EMAIL_ENTRY = 'entry.1585952517'; // Your email field ID
        const MESSAGE_ENTRY = 'entry.1727114733'; // Your message field ID

        const googleFormURL = 'https://docs.google.com/forms/d/e/' + GOOGLE_FORM_ID + '/formResponse';
        
        // Create form data for Google Forms
        const googleFormData = new FormData();
        googleFormData.append(NAME_ENTRY, name);
        googleFormData.append(EMAIL_ENTRY, email);
        googleFormData.append(MESSAGE_ENTRY, message);
        
        // Submit to Google Forms
        fetch(googleFormURL, {
            method: 'POST',
            body: googleFormData,
            mode: 'no-cors' // Important: Google Forms requires no-cors
        })
        .then(function() {
            // Success (no-cors means we can't read the response, but it worked if no error)
            alert('Thank you, ' + name + '! Your message has been sent successfully. We\'ll get back to you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('Oops! There was a problem sending your message. Please try again or email us at info@tfamglobal.org');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}
    // function initContactForm() {
    //     const contactForm = document.getElementById('contactForm');
    //     if (!contactForm) return;
        
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         const formData = new FormData(contactForm);
    //         const name = formData.get('name');
    //         const email = formData.get('email');
    //         const message = formData.get('message');
            
    //         // Validation
    //         if (!name || !email || !message) {
    //             alert('Please fill in all fields.');
    //             return;
    //         }
            
    //         // Email validation
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (!emailRegex.test(email)) {
    //             alert('Please enter a valid email address.');
    //             return;
    //         }
            
    //         // Get submit button
    //         const submitBtn = contactForm.querySelector('button[type="submit"]');
    //         const originalText = submitBtn.textContent;
            
    //         // Show loading state
    //         submitBtn.textContent = 'Sending...';
    //         submitBtn.disabled = true;
            
    //         // Send using Formspree
    //         // REPLACE 'YOUR_FORM_ID' with your actual Formspree form ID
    //         fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Accept': 'application/json'
    //             }
    //         })
    //         .then(function(response) {
    //             if (response.ok) {
    //                 alert('Thank you, ' + name + '! Your message has been sent successfully. We\'ll get back to you soon.');
    //                 contactForm.reset();
    //             } else {
    //                 response.json().then(function(data) {
    //                     if (data.errors) {
    //                         alert('Oops! There was a problem: ' + data.errors.map(function(error) { 
    //                             return error.message; 
    //                         }).join(', '));
    //                     } else {
    //                         alert('Oops! There was a problem sending your message. Please try again or email us at info@tfamglobal.org');
    //                     }
    //                 });
    //             }
    //         })
    //         .catch(function(error) {
    //             console.error('Error:', error);
    //             alert('Oops! There was a problem sending your message. Please try again or email us at info@tfamglobal.org');
    //         })
    //         .finally(function() {
    //             submitBtn.textContent = originalText;
    //             submitBtn.disabled = false;
    //         });
    //     });
    // }

    // ========================================
    // COOKIE CONSENT MANAGEMENT
    // ========================================
    function initCookieConsent() {
        const COOKIE_CONSENT_KEY = 'tfam_cookie_consent';
        const COOKIE_EXPIRY_DAYS = 365;
        
        const CookieManager = {
            set: function(name, value, days) {
                const expires = new Date();
                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Strict;Secure';
            },
            
            get: function(name) {
                const nameEQ = name + "=";
                const ca = document.cookie.split(';');
                for(let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        };
        
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('acceptCookies');
        const rejectBtn = document.getElementById('rejectCookies');
        const customizeBtn = document.getElementById('customizeCookies');
        
        if (!cookieConsent) return;
        
        const consent = CookieManager.get(COOKIE_CONSENT_KEY);
        
        if (!consent) {
            setTimeout(function() {
                cookieConsent.classList.add('show');
            }, 1000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                CookieManager.set(COOKIE_CONSENT_KEY, 'all', COOKIE_EXPIRY_DAYS);
                cookieConsent.classList.remove('show');
                console.log('All cookies accepted');
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                CookieManager.set(COOKIE_CONSENT_KEY, 'essential', COOKIE_EXPIRY_DAYS);
                cookieConsent.classList.remove('show');
                console.log('Only essential cookies accepted');
            });
        }
        
        if (customizeBtn) {
            customizeBtn.addEventListener('click', function() {
                window.location.href = 'cookie-policy.html';
            });
        }
    }
    //========================================
    // BIO MODAL
    //========================================
    document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');

    document.addEventListener('click', function (e) {
        const card = e.target.closest('.leader-card');
        if (card) {
            modalImg.src = card.dataset.img;
            modalImg.alt = card.dataset.name;
            modalCaption.textContent = card.dataset.name;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            return;
        }

        if (e.target.classList.contains('image-modal-overlay') || e.target.classList.contains('image-modal-close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
    // ========================================
    // NEWSLETTER POPUP
    // ========================================
    // function initNewsletterPopup() {
    //     const NEWSLETTER_KEY = 'tfam_newsletter_shown';
    //     const DONT_SHOW_KEY = 'tfam_newsletter_dont_show';
    //     const SHOW_DELAY = 5000;
    //     const SHOW_INTERVAL_DAYS = 7;
        
    //     function shouldShowPopup() {
    //         const dontShow = localStorage.getItem(DONT_SHOW_KEY);
    //         if (dontShow === 'true') {
    //             return false;
    //         }
            
    //         const lastShown = localStorage.getItem(NEWSLETTER_KEY);
    //         if (lastShown) {
    //             const lastShownDate = new Date(parseInt(lastShown));
    //             const now = new Date();
    //             const daysSinceShown = (now - lastShownDate) / (1000 * 60 * 60 * 24);
                
    //             if (daysSinceShown < SHOW_INTERVAL_DAYS) {
    //                 return false;
    //             }
    //         }
            
    //         return true;
    //     }
        
    //     function showNewsletterPopup() {
    //         const popup = document.getElementById('newsletterPopup');
            
    //         if (popup && shouldShowPopup()) {
    //             setTimeout(function() {
    //                 popup.classList.add('show');
    //                 localStorage.setItem(NEWSLETTER_KEY, Date.now().toString());
    //             }, SHOW_DELAY);
    //         }
    //     }
        
    //     function hideNewsletterPopup() {
    //         const popup = document.getElementById('newsletterPopup');
    //         if (popup) {
    //             popup.classList.remove('show');
    //         }
    //     }
        
    //     const popup = document.getElementById('newsletterPopup');
    //     const closeBtn = document.getElementById('closeNewsletter');
    //     const form = document.getElementById('newsletterForm');
    //     const dontShowCheckbox = document.getElementById('dontShowAgain');
        
    //     if (!popup) return;
        
    //     if (closeBtn) {
    //         closeBtn.addEventListener('click', hideNewsletterPopup);
    //     }
        
    //     popup.addEventListener('click', function(e) {
    //         if (e.target === popup) {
    //             hideNewsletterPopup();
    //         }
    //     });
        
    //     if (form) {
    //         form.addEventListener('submit', function(e) {
    //             e.preventDefault();
                
    //             const emailInput = document.getElementById('newsletterEmail');
    //             const email = emailInput ? emailInput.value.trim() : '';
                
    //             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //             if (!emailRegex.test(email)) {
    //                 alert('Please enter a valid email address.');
    //                 return;
    //             }
                
    //             if (dontShowCheckbox && dontShowCheckbox.checked) {
    //                 localStorage.setItem(DONT_SHOW_KEY, 'true');
    //             }
                
    //             alert('Thank you for subscribing! We\'ll send updates to ' + email);
    //             hideNewsletterPopup();
    //             form.reset();
    //         });
    //     }
        
    //     showNewsletterPopup();
    // }
    function initNewsletterPopup() {
    const NEWSLETTER_KEY = 'tfam_newsletter_shown';
    const DONT_SHOW_KEY = 'tfam_newsletter_dont_show';
    const SHOW_DELAY = 5000;
    const SHOW_INTERVAL_DAYS = 7;
    
    function shouldShowPopup() {
        const dontShow = localStorage.getItem(DONT_SHOW_KEY);
        if (dontShow === 'true') {
            return false;
        }
        
        const lastShown = localStorage.getItem(NEWSLETTER_KEY);
        if (lastShown) {
            const lastShownDate = new Date(parseInt(lastShown));
            const now = new Date();
            const daysSinceShown = (now - lastShownDate) / (1000 * 60 * 60 * 24);
            
            if (daysSinceShown < SHOW_INTERVAL_DAYS) {
                return false;
            }
        }
        
        return true;
    }
    
    function showNewsletterPopup() {
        const popup = document.getElementById('newsletterPopup');
        
        if (popup && shouldShowPopup()) {
            setTimeout(function() {
                popup.classList.add('show');
                localStorage.setItem(NEWSLETTER_KEY, Date.now().toString());
            }, SHOW_DELAY);
        }
    }
    
    function hideNewsletterPopup() {
        const popup = document.getElementById('newsletterPopup');
        if (popup) {
            popup.classList.remove('show');
        }
    }
    
    const popup = document.getElementById('newsletterPopup');
    const closeBtn = document.getElementById('closeNewsletter');
    const form = document.getElementById('newsletterForm');
    const dontShowCheckbox = document.getElementById('dontShowAgain');
    
    if (!popup) return;
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideNewsletterPopup);
    }
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideNewsletterPopup();
        }
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Check "don't show again" checkbox
            if (dontShowCheckbox && dontShowCheckbox.checked) {
                localStorage.setItem(DONT_SHOW_KEY, 'true');
            }
            
            // Google Form submission URL
            const GOOGLE_FORM_ID = '1FAIpQLSd_dlu-v0-BXjJKoElb9_4EwHOXt_5wABgtXqm6PYXsACUzHw'; // From your newsletter form URL
            const EMAIL_ENTRY = 'entry.1046451193'; // Your email field ID

            const googleFormURL = 'https://docs.google.com/forms/d/e/' + GOOGLE_FORM_ID + '/formResponse';
            
            // Create form data for Google Forms
            const googleFormData = new FormData();
            googleFormData.append(EMAIL_ENTRY, email);
            
            // Submit to Google Forms
            fetch(googleFormURL, {
                method: 'POST',
                body: googleFormData,
                mode: 'no-cors'
            })
            .then(function() {
                alert('Thank you for subscribing! We\'ll send updates to ' + email);
                hideNewsletterPopup();
                form.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Oops! There was a problem. Please try again later.');
            });
        });
    }
    
    showNewsletterPopup();
}

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.leader-card, .news-card, .who-text-box');
        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ========================================
    // INTERACTIVE MAP
    // ========================================
    function initInteractiveMap() {
        // Regional presbyter data
        const regionData = {
            'uk': {
                title: 'United Kingdom & Europe',
                subtitle: 'London',
                presbyters: [
                    { name: 'Rev. Paul Bailey', initials: 'House of Rainbow, UK', image: 'assets/images/presbyters/paul-bailey.jpg' }
                ]
            },
            'south-america': {
                title: 'Latin America & the Caribbean',
                subtitle: 'Cuba, Mexico',
                presbyters: [
                    { name: 'Rev. Dr. Jaime Galarza', initials: 'City of Refuge and Las Memoras Tijuana, Casa Debora', image: 'assets/images/presbyters/jaime-galarza.jpg' },
                    { name: 'Rev. Alba Onofrio', initials: '', image: 'assets/images/presbyters/Rev. Alba Onofrio.jpg' }
                ]
            },
            'central-america': {
                title: 'Central America',
                subtitle: 'Panama, Honduras, Belize',
                presbyters: [
                    { name: 'Rev. Phil Gray', initials: '', image: 'assets/images/presbyters/phil-gray.jpg' }
                ]
            },
            'east-africa': {
                title: 'East Africa',
                subtitle: 'Kenya, Uganda, Rwanda, DRC',
                presbyters: [
                    { name: 'Rev. Caroline Omolo', initials: 'Cosmopolitan Affirming Community', image: 'assets/images/presbyters/caroline-omolo.jpg' },
                    { name: 'Rev. Geoffrey Kalisa Mwesigye', initials: 'TFAM Rwanda', image: 'assets/images/presbyters/geoffrey-mwesigye.jpg' }
                ]
            },
            'west-africa': {
                title: 'West Africa',
                subtitle: 'Regional Leadership',
                presbyters: [
                    { name: 'Information Loading...', initials: 'IDNOWA', image: 'assets/images/presbyters/IDNOWA.png' }
                ]
            },
            'south-africa': {
                title: 'South Africa',
                subtitle: 'Regional Leadership',
                presbyters: [
                    { name: 'Information Loading...', initials: 'TBA', image: 'assets/images/presbyters/south-africa.jpg' }
                ]
            },
            'global-health': {
                title: 'Global Health',
                subtitle: 'Cross-Regional Leadership',
                presbyters: [
                    { name: 'Rev. Dr. David Williams', initials: 'TFAM Global', image: 'assets/images/presbyters/david-williams.jpg' }
                ]
            }
        };
        
        const modal = document.getElementById('regionModal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal) return;
        
        let hoverTimeout;
        let isModalOpen = false;
        
        // Open modal
        function openRegionModal(regionKey) {
            const region = regionData[regionKey];
            if (!region) return;
            
            modalTitle.textContent = region.title;
            modalSubtitle.textContent = region.subtitle;
            
            // Build presbyters HTML
            let presbytersHTML = '';
            region.presbyters.forEach(function(presbyter) {
                presbytersHTML += '<div class="presbyter-card">';
                presbytersHTML += '<div class="presbyter-image">';
                if (presbyter.image) {
                    presbytersHTML += '<img src="' + presbyter.image + '" alt="' + presbyter.name + '">';
                } else {
                    presbytersHTML += presbyter.initials;
                }
                presbytersHTML += '</div>';
                presbytersHTML += '<div class="presbyter-name">' + presbyter.name + '</div>';
                presbytersHTML += '<div class="presbyter-title">' + region.title + '</div>';
                presbytersHTML += '</div>';
            });
            
            modalBody.innerHTML = presbytersHTML;
            modal.classList.add('active');
            isModalOpen = true;
            document.body.style.overflow = 'hidden';
        }
        
        // Close modal
        function closeRegionModal() {
            modal.classList.remove('active');
            isModalOpen = false;
            document.body.style.overflow = '';
        }
        
        // Add hover events to map pins
        document.querySelectorAll('.map-pin').forEach(function(pin) {
            // Mouse enter - show modal after short delay
            pin.addEventListener('mouseenter', function() {
                const regionKey = this.getAttribute('data-region');
                
                // Clear any existing timeout
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                // Show modal after 300ms hover
                hoverTimeout = setTimeout(function() {
                    if (!isModalOpen) {
                        openRegionModal(regionKey);
                    }
                }, 300);
            });
            
            // Mouse leave - cancel timeout if not opened yet
            pin.addEventListener('mouseleave', function() {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
            });
            
            // Click - also open modal (for mobile/tablet)
            pin.addEventListener('click', function() {
                const regionKey = this.getAttribute('data-region');
                if (!isModalOpen) {
                    openRegionModal(regionKey);
                }
            });
        });
        
        // Close modal when mouse leaves modal area
        modal.addEventListener('mouseleave', function(e) {
            // Only close if mouse truly left the modal area
            if (!modal.contains(e.relatedTarget)) {
                closeRegionModal();
            }
        });
        
        // Keep modal open when hovering over it
        modal.addEventListener('mouseenter', function() {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        });
        
        // Close modal events
        if (modalClose) {
            modalClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeRegionModal();
            });
        }
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegionModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isModalOpen) {
                closeRegionModal();
            }
        });
    }

    // ========================================
    // INITIALIZE ALL FUNCTIONS
    // ========================================
    function init() {
        console.log('TFAM Global - Initializing...');
        
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initContactForm();
        initCookieConsent();
        initNewsletterPopup();
        initScrollAnimations();
        initInteractiveMap();
        
        console.log('TFAM Global - All features loaded successfully!');
    }

    // ========================================
    // DOM READY
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            clearTimeout(timeout);
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce: debounce,
        throttle: throttle
    };
}
