/**
 * Production Authentication Debug Script
 * Run this in browser console on the live site
 */

console.log('🔍 Production Authentication Debug');
console.log('='.repeat(50));

// Check current authentication state
function checkAuthState() {
  console.log('\n🔐 Authentication State Check:');
  
  // Check localStorage for auth tokens
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const userData = localStorage.getItem('user_data');
  
  console.log('Access Token:', accessToken ? `Present (${accessToken.length} chars)` : '❌ MISSING');
  console.log('Refresh Token:', refreshToken ? `Present (${refreshToken.length} chars)` : '❌ MISSING');
  console.log('User Data:', userData ? '✅ Present' : '❌ MISSING');
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      console.log('User Info:', {
        id: user.id,
        email: user.email,
        role: user.role,
        is_superuser: user.is_superuser,
        is_staff: user.is_staff
      });
    } catch (e) {
      console.log('❌ User data parse error:', e.message);
    }
  }
  
  // Check sessionStorage as well
  const sessionAccess = sessionStorage.getItem('access_token');
  const sessionUser = sessionStorage.getItem('user_data');
  
  if (sessionAccess || sessionUser) {
    console.log('\n📱 Session Storage:');
    console.log('Session Access Token:', sessionAccess ? 'Present' : 'Missing');
    console.log('Session User Data:', sessionUser ? 'Present' : 'Missing');
  }
  
  return { accessToken, refreshToken, userData };
}

// Test authentication with current token
async function testAuthWithToken(token) {
  if (!token) {
    console.log('\n❌ No token to test');
    return false;
  }
  
  console.log('\n🧪 Testing Token Validity:');
  
  try {
    // Test with a simple authenticated endpoint first
    const profileResponse = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Profile Test Status:', profileResponse.status);
    
    if (profileResponse.status === 200) {
      console.log('✅ Token is valid');
      return true;
    } else if (profileResponse.status === 401) {
      console.log('❌ Token is invalid/expired');
      return false;
    } else {
      console.log('⚠️ Unexpected status:', profileResponse.status);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Token test failed:', error.message);
    return false;
  }
}

// Test refresh token functionality
async function tryRefreshToken(refreshToken) {
  if (!refreshToken) {
    console.log('\n❌ No refresh token available');
    return null;
  }
  
  console.log('\n🔄 Attempting Token Refresh:');
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    });
    
    console.log('Refresh Status:', response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Token refreshed successfully');
      
      // Update localStorage with new token
      localStorage.setItem('access_token', data.access);
      console.log('💾 New token saved to localStorage');
      
      return data.access;
    } else {
      const errorData = await response.json().catch(() => null);
      console.log('❌ Refresh failed:', errorData);
      return null;
    }
    
  } catch (error) {
    console.log('❌ Refresh error:', error.message);
    return null;
  }
}

// Check permissions after authentication
async function checkUserPermissions(token) {
  console.log('\n🔒 Checking User Permissions:');
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/check-module-permission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        module: 'user_management',
        permission: 'create'
      })
    });
    
    const data = await response.json();
    console.log('Permission Result:', data);
    
    if (data.has_permission) {
      console.log('✅ User has user creation permission');
      return true;
    } else {
      console.log('❌ User lacks user creation permission');
      return false;
    }
    
  } catch (error) {
    console.log('❌ Permission check failed:', error.message);
    return false;
  }
}

// Test user creation with valid token
async function testUserCreation(token) {
  console.log('\n👤 Testing User Creation:');
  
  const testData = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test.debug@rejlers.com',
    username: 'testdebug',
    password: 'DebugTest123!',
    password_confirm: 'DebugTest123!',
    phone_number: '+46701234567',
    department: 'Test',
    job_title: 'Tester',
    role_id: 2,
    is_active: true
  };
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData)
    });
    
    console.log('User Creation Status:', response.status);
    const responseData = await response.json().catch(() => null);
    
    if (response.status === 201) {
      console.log('✅ User creation successful!');
      console.log('Created user:', responseData);
    } else if (response.status === 400) {
      console.log('❌ Validation errors:');
      if (responseData) {
        Object.entries(responseData).forEach(([field, errors]) => {
          console.log(`   ${field}:`, errors);
        });
      }
    } else if (response.status === 403) {
      console.log('❌ Permission denied');
    } else {
      console.log('❌ Unexpected response:', responseData);
    }
    
  } catch (error) {
    console.log('❌ User creation failed:', error.message);
  }
}

// Main debug flow
async function runProductionDebug() {
  const { accessToken, refreshToken } = checkAuthState();
  
  // Test current token
  let validToken = null;
  if (accessToken) {
    const isValid = await testAuthWithToken(accessToken);
    if (isValid) {
      validToken = accessToken;
    }
  }
  
  // Try refresh if current token is invalid
  if (!validToken && refreshToken) {
    validToken = await tryRefreshToken(refreshToken);
  }
  
  if (!validToken) {
    console.log('\n🚨 AUTHENTICATION REQUIRED');
    console.log('Solutions:');
    console.log('1. Please log out and log back in');
    console.log('2. Clear localStorage and re-authenticate');
    console.log('3. Check if your account has proper permissions');
    return;
  }
  
  // Test permissions and user creation
  await checkUserPermissions(validToken);
  await testUserCreation(validToken);
  
  console.log('\n🎯 Debug Complete');
}

// Auto-run
runProductionDebug();