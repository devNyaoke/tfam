(function() {
    'use strict';
    
    const NEWSLETTER_KEY = 'tfam_newsletter_shown';
    const DONT_SHOW_KEY = 'tfam_newsletter_dont_show';
    const SHOW_DELAY = 5000; // 5 seconds
    const SHOW_INTERVAL_DAYS = 7; // Show again after 7 days
    
    // Check if popup should be shown
    function shouldShowPopup() {
        // Check if user opted out
        const dontShow = localStorage.getItem(DONT_SHOW_KEY);
        if (dontShow === 'true') {
            return false;
        }
        
        // Check last shown date
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
    
    // Show newsletter popup
    function showNewsletterPopup() {
        const popup = document.getElementById('newsletterPopup');
        
        if (popup && shouldShowPopup()) {
            setTimeout(() => {
                popup.classList.add('show');
                // Record that we showed the popup
                localStorage.setItem(NEWSLETTER_KEY, Date.now().toString());
            }, SHOW_DELAY);
        }
    }
    
    // Hide newsletter popup
    function hideNewsletterPopup() {
        const popup = document.getElementById('newsletterPopup');
        if (popup) {
            popup.classList.remove('show');
        }
    }
    
    // Initialize newsletter functionality
    function initNewsletter() {
        const popup = document.getElementById('newsletterPopup');
        const closeBtn = document.getElementById('closeNewsletter');
        const form = document.getElementById('newsletterForm');
        const dontShowCheckbox = document.getElementById('dontShowAgain');
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                hideNewsletterPopup();
            });
        }
        
        // Close on background click
        if (popup) {
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    hideNewsletterPopup();
                }
            });
        }
        
        // Form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = document.getElementById('newsletterEmail');
                const email = emailInput.value.trim();
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Check "don't show again" checkbox
                if (dontShowCheckbox && dontShowCheckbox.checked) {
                    localStorage.setItem(DONT_SHOW_KEY, 'true');
                }
                
                // Simulate newsletter subscription
                console.log('Newsletter subscription:', email);
                alert(`Thank you for subscribing! We'll send updates to ${email}`);
                
                // TODO: Send to actual newsletter service
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
                
    //             hideNewsletterPopup();
    //             form.reset();
    //         });
    //     }
    //
    //     // Show popup
    //     showNewsletterPopup();
    // }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletter);
    } else {
        initNewsletter();
    }
    
    // Export for external use
    window.TFAMNewsletter = {
        show: showNewsletterPopup,
        hide: hideNewsletterPopup
    };
    
}) ();
