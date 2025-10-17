/**
 * Frontend User Creation Debug Script
 * Tests authentication and user creation flow
 */

console.log('🔍 Frontend User Creation Debug');
console.log('=' .repeat(50));

// First, let's check if user is authenticated
function checkAuthentication() {
  console.log('\n🔐 Authentication Check:');
  
  const accessToken = localStorage.getItem('access_token');
  const userData = localStorage.getItem('user_data');
  
  console.log('  Access Token:', accessToken ? `Present (${accessToken.substring(0, 20)}...)` : 'Missing');
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      console.log('  User Data:', {
        id: user.id,
        email: user.email,
        is_staff: user.is_staff,
        is_superuser: user.is_superuser,
        role: user.role || 'Not set'
      });
      return { token: accessToken, user };
    } catch (e) {
      console.log('  User Data: Invalid JSON');
      return { token: accessToken, user: null };
    }
  } else {
    console.log('  User Data: Missing');
    return { token: accessToken, user: null };
  }
}

// Test user creation with proper authentication
async function testUserCreationWithAuth(token) {
  console.log('\n🚀 Testing User Creation with Authentication:');
  
  const testUserData = {
    first_name: 'Debug',
    last_name: 'Test',
    email: 'debug.test@rejlers.com',
    username: 'debugtest123',
    phone: '+46701234567',
    department: 'Engineering',
    position: 'Test Engineer',
    password: 'DebugTest123!',
    role_id: 2,
    is_active: true,
    send_welcome_email: false,
    created_via: 'debug_script'
  };
  
  console.log('  Frontend Data:', testUserData);
  
  // Transform using the same function the frontend uses
  const { transformUserDataForAPI } = await import('./src/config/userApiConfig.js');
  const backendPayload = transformUserDataForAPI(testUserData);
  
  console.log('  Transformed Payload:', backendPayload);
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(backendPayload)
    });
    
    console.log(`  Response Status: ${response.status}`);
    console.log(`  Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.json().catch(() => null);
    console.log(`  Response Data:`, responseData);
    
    if (response.status === 400) {
      console.log('\n❌ 400 BAD REQUEST Analysis:');
      if (responseData) {
        Object.keys(responseData).forEach(key => {
          console.log(`    ${key}: ${JSON.stringify(responseData[key])}`);
        });
      }
    } else if (response.status === 403) {
      console.log('\n🚫 403 FORBIDDEN - Permission Issue:');
      console.log('  User may not have user_management.create permission');
    } else if (response.status === 201) {
      console.log('\n✅ SUCCESS - User created!');
    }
    
  } catch (error) {
    console.error('\n❌ Network Error:', error);
  }
}

// Check permissions endpoint
async function checkPermissions(token) {
  console.log('\n🔒 Checking User Permissions:');
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/check-module-permission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        module: 'user_management',
        permission: 'create'
      })
    });
    
    const data = await response.json();
    console.log('  Permission Check Result:', data);
    
  } catch (error) {
    console.log('  Permission check failed:', error.message);
  }
}

// Main execution
async function runDebug() {
  const { token, user } = checkAuthentication();
  
  if (!token) {
    console.log('\n❌ No authentication token found. Please log in first.');
    console.log('   1. Go to the login page');
    console.log('   2. Log in with admin credentials');
    console.log('   3. Run this script again');
    return;
  }
  
  if (!user) {
    console.log('\n⚠️ No user data found. Authentication may be incomplete.');
  }
  
  // Check permissions first
  await checkPermissions(token);
  
  // Test user creation
  await testUserCreationWithAuth(token);
  
  console.log('\n🎯 Debug Complete');
  console.log('   Check the console output above for specific error details');
}

// Run the debug
runDebug();