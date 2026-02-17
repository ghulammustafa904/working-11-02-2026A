# Login Troubleshooting Guide

## ✅ Fixes Applied

1. **Fixed duplicate HTML** in admin-login.html
2. **Added console logging** for debugging
3. **Verified authentication flow**

## 🔍 How to Test Login

### Step 1: Open Browser Console
- Press `F12` or `Ctrl+Shift+I` (Windows)
- Go to **Console** tab

### Step 2: Try to Login
1. Open `admin-login.html`
2. Enter your signup credentials
3. Click "Sign In"
4. Watch the console for messages

### Expected Console Output:
```
Attempting login with email: admin@mystore.com
Login successful: admin@mystore.com
Redirecting to dashboard...
```

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid credentials" error
**Cause:** Email/password doesn't match Firebase account

**Solutions:**
- Verify you completed signup successfully
- Check Firebase Console → Authentication → Users
- Ensure Email/Password provider is enabled
- Try signing up again with a new email

### Issue 2: Module import errors
**Cause:** Missing dependencies or wrong file paths

**Solutions:**
```bash
npm install
npx serve
```

### Issue 3: "Network request failed"
**Cause:** No internet or Firebase project issue

**Solutions:**
- Check internet connection
- Verify Firebase project is active
- Check browser console for specific errors

### Issue 4: Page doesn't redirect
**Cause:** JavaScript error or file path issue

**Solutions:**
- Check browser console for errors
- Verify `admin-dashboard.html` exists
- Clear browser cache (Ctrl+Shift+Delete)

## 📝 Testing Checklist

- [ ] Run `npm install`
- [ ] Start server with `npx serve`
- [ ] Open browser console (F12)
- [ ] Go to signup page
- [ ] Create new account
- [ ] Wait for redirect to login
- [ ] Enter same credentials
- [ ] Click "Sign In"
- [ ] Check console messages
- [ ] Verify redirect to dashboard

## 🔧 Manual Test Steps

### Test 1: Verify Firebase Connection
```
Open: firebase-test.html
Expected: All green checkmarks
```

### Test 2: Test Signup
```
Open: admin-signup.html
Fill: Name, Email, Password
Expected: "Account created successfully!"
Expected: Auto-redirect to login page
```

### Test 3: Test Login
```
Open: admin-login.html (or auto-redirected)
Fill: Same email and password from signup
Click: "Sign In"
Expected: "Authentication successful!"
Expected: Redirect to dashboard in 1.5 seconds
```

### Test 4: Verify Dashboard
```
Expected: See "Welcome, Admin!" message
Expected: See your email displayed
Expected: See logout button
```

## 🎯 Quick Fix Commands

```bash
# Reinstall dependencies
npm install

# Start fresh server
npx serve

# Clear npm cache if needed
npm cache clean --force
npm install
```

## 📞 Firebase Console Checklist

1. Go to: https://console.firebase.google.com/
2. Select: **ecommerce-fcd7c**
3. Check: **Authentication** → **Sign-in method**
   - Email/Password: ✅ Enabled
4. Check: **Authentication** → **Users**
   - Your account should be listed
5. Check: **Firestore Database**
   - Should see `admins` collection with your user

## 🚨 If Still Not Working

1. **Open browser console** (F12)
2. **Copy all error messages**
3. **Check these files exist:**
   - firebase-config.js
   - admin-auth.js
   - admin-login.html
   - admin-dashboard.html

4. **Verify Firebase config:**
   - Open firebase-config.js
   - Check projectId: "ecommerce-fcd7c"
   - Check all values are filled

## ✨ Success Indicators

When login works correctly, you'll see:
1. ✅ Loading spinner appears
2. ✅ Green success message
3. ✅ Console shows "Login successful"
4. ✅ Page redirects to dashboard
5. ✅ Dashboard shows your email
6. ✅ Logout button is visible

---

**Note:** Make sure you're using a local server (npx serve or Live Server), not opening files directly (file://).
