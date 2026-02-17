# Firebase Setup Guide - Email/Password Authentication

## ✅ Configuration Status
Your Firebase is properly configured with:
- Email/Password Authentication
- Firestore Database
- Storage
- Analytics

## 🔧 Quick Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Admin User in Firebase Console

1. Go to: https://console.firebase.google.com/
2. Select project: **ecommerce-fcd7c**
3. Navigate to: **Authentication** → **Users**
4. Click: **Add User**
5. Enter:
   - Email: `admin@mystore.com` (or your preferred email)
   - Password: Create a strong password (min 6 characters)
6. Click: **Add User**

### 3. Test the Login

1. Start a local server:
   ```bash
   npx serve
   ```
   Or use VS Code Live Server extension

2. Open: `http://localhost:3000/admin-login.html`

3. Login with the credentials you created

### 4. Verify Dashboard Access

After successful login, you should be redirected to `admin-dashboard.html`

## 🎯 Features Ready to Use

### Email Login
- ✅ Email/Password authentication
- ✅ Password visibility toggle
- ✅ Loading states
- ✅ Error handling
- ✅ Auto-redirect on success

### Phone Login (Optional)
To enable phone authentication:
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Phone** provider
3. Add your domain to authorized domains
4. Test domain: `localhost` should already be authorized

## 🔒 Security Notes

- API keys in `firebase-config.js` are safe for client-side use
- Set up Firebase Security Rules for Firestore and Storage
- Consider adding email verification for production
- Implement password reset functionality if needed

## 📝 Next Steps

1. **Set Firestore Rules** (for database security):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

2. **Set Storage Rules** (for file uploads):
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🐛 Troubleshooting

### "Module not found" error
- Make sure you ran `npm install`
- Check that `package.json` exists

### "Firebase: Error (auth/invalid-credential)"
- Verify the email/password in Firebase Console
- Check that Email/Password provider is enabled

### "This domain is not authorized"
- Add your domain in Firebase Console → Authentication → Settings → Authorized domains

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase Console settings
3. Ensure all files are in the correct directory
