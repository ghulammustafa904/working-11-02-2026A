import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

class AuthManager {
    constructor() {
        this.confirmationResult = null;
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.setupEmailAuth();
        this.setupPhoneAuth();
        this.setupPasswordToggle();
        this.setupRecaptcha();
    }

    showAlert(message, type = 'error') {
        const alert = document.getElementById('alertMsg');
        alert.textContent = message;
        alert.className = `alert alert-${type} show`;
        setTimeout(() => alert.classList.remove('show'), 5000);
    }

    toggleLoader(btnId, show) {
        const btn = document.getElementById(btnId);
        const text = btn.querySelector('.btn-text');
        const loader = btn.querySelector('.btn-loader');
        btn.disabled = show;
        text.style.display = show ? 'none' : 'inline';
        loader.style.display = show ? 'inline' : 'none';
    }

    setupTabSwitching() {
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const method = tab.dataset.method;
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${method}Form`).classList.add('active');
                document.getElementById('alertMsg').className = 'alert';
            });
        });
    }

    setupPasswordToggle() {
        const toggleBtn = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password');
        const eyeOpen = toggleBtn.querySelector('.eye-open');
        const eyeClosed = toggleBtn.querySelector('.eye-closed');

        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            eyeOpen.style.display = isPassword ? 'none' : 'block';
            eyeClosed.style.display = isPassword ? 'block' : 'none';
        });
    }

    setupEmailAuth() {
        document.getElementById('emailForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.toggleLoader('emailLoginBtn', true);

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                this.showAlert('Authentication successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'admin-dashboard.html', 1500);
            } catch (error) {
                this.toggleLoader('emailLoginBtn', false);
                const errorMessage = this.getErrorMessage(error.code);
                this.showAlert(errorMessage, 'error');
            }
        });
    }

    setupRecaptcha() {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {},
            'expired-callback': () => {
                this.showAlert('reCAPTCHA expired. Please try again.', 'error');
            }
        });
    }

    setupPhoneAuth() {
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const otpSection = document.getElementById('otpSection');
        const phoneForm = document.getElementById('phoneForm');

        sendOtpBtn.addEventListener('click', async () => {
            const phone = document.getElementById('phone').value.trim();
            
            if (!this.validatePhoneNumber(phone)) {
                this.showAlert('Please enter a valid phone number with country code', 'error');
                return;
            }

            this.toggleLoader('sendOtpBtn', true);

            try {
                this.confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
                this.toggleLoader('sendOtpBtn', false);
                otpSection.classList.add('show');
                this.showAlert('Verification code sent successfully!', 'success');
                document.getElementById('otp').focus();
            } catch (error) {
                this.toggleLoader('sendOtpBtn', false);
                const errorMessage = this.getErrorMessage(error.code);
                this.showAlert(errorMessage, 'error');
            }
        });

        phoneForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const otp = document.getElementById('otp').value.trim();

            if (otp.length !== 6) {
                this.showAlert('Please enter a valid 6-digit code', 'error');
                return;
            }

            this.toggleLoader('verifyOtpBtn', true);

            try {
                await this.confirmationResult.confirm(otp);
                this.showAlert('Authentication successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'admin-dashboard.html', 1500);
            } catch (error) {
                this.toggleLoader('verifyOtpBtn', false);
                this.showAlert('Invalid verification code. Please try again.', 'error');
            }
        });
    }

    validatePhoneNumber(phone) {
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        return phoneRegex.test(phone);
    }

    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/invalid-email': 'Invalid email address format',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'Invalid credentials',
            'auth/wrong-password': 'Invalid credentials',
            'auth/invalid-credential': 'Invalid credentials',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later',
            'auth/network-request-failed': 'Network error. Please check your connection',
            'auth/invalid-phone-number': 'Invalid phone number format',
            'auth/missing-phone-number': 'Please enter a phone number',
            'auth/quota-exceeded': 'SMS quota exceeded. Please try again later',
            'auth/captcha-check-failed': 'reCAPTCHA verification failed. Please try again'
        };
        return errorMessages[errorCode] || 'Authentication failed. Please try again';
    }
}

// Initialize authentication manager
new AuthManager();
