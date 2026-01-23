(function() {
    'use strict';
    
    const COOKIE_CONSENT_KEY = 'tfam_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Cookie utility functions
    const CookieManager = {
        // Set a cookie
        set: function(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
        },
        
        // Get a cookie
        get: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        
        // Delete a cookie
        delete: function(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        }
    };
    
    // Initialize cookie consent
    function initCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('acceptCookies');
        const rejectBtn = document.getElementById('rejectCookies');
        const rejectAllBtn = document.getElementById('rejectAllCookies');
        const customizeBtn = document.getElementById('customizeCookies');
        
        // Check if consent already given
        const consent = CookieManager.get(COOKIE_CONSENT_KEY);
        
        if (!consent) {
            // Show cookie banner after 1 second
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1000);
        }
        
        // Accept all cookies
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                CookieManager.set(COOKIE_CONSENT_KEY, 'all', COOKIE_EXPIRY_DAYS);
                cookieConsent.classList.remove('show');
                enableAllCookies();
                console.log('All cookies accepted');
            });
        }
        
        // Reject non-essential cookies
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                CookieManager.set(COOKIE_CONSENT_KEY, 'essential', COOKIE_EXPIRY_DAYS);
                cookieConsent.classList.remove('show');
                enableEssentialCookies();
                console.log('Only essential cookies accepted');
            });
        }

        // // Reject all cookies
        // if (rejectAllBtn) {
        //     rejectAllBtn.addEventListener('click', function() {
        //         CookieManager.set(COOKIE_CONSENT_KEY, 'none', COOKIE_EXPIRY_DAYS);
        //         cookieConsent.classList.remove('show');
        //         rejectAllCookies();
        //         console.log('All cookies rejected');
        //     });
        // }
        
        // Customize cookies (redirect to cookie policy)
        if (customizeBtn) {
            customizeBtn.addEventListener('click', function() {
                window.location.href = 'cookie-policy.html';
            });
        }
    }
    
    // Enable all cookies (analytics, marketing, etc.)
    function enableAllCookies() {
        // Enable Google Analytics
        // window.dataLayer = window.dataLayer || [];
        // function gtag(){dataLayer.push(arguments);}
        // gtag('js', new Date());
        // gtag('config', 'GA_MEASUREMENT_ID');
        
        console.log('All tracking cookies enabled');
    }
    
    // Enable only essential cookies
    function enableEssentialCookies() {
        console.log('Only essential cookies enabled');
    }
    
    // Check current consent status
    function checkConsentStatus() {
        const consent = CookieManager.get(COOKIE_CONSENT_KEY);
        
        if (consent === 'all') {
            enableAllCookies();
        } else if (consent === 'essential') {
            enableEssentialCookies();
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initCookieConsent();
            checkConsentStatus();
        });
    } else {
        initCookieConsent();
        checkConsentStatus();
    }
    
    // Export for external use
    window.TFAMCookies = CookieManager;

})();
