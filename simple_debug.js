/**
 * Simple User Creation Test Script
 * 
 * Instructions:
 * 1. Open the browser console on https://rejlers-frontend.vercel.app/dashboard/super-admin/user-management
 * 2. Paste this script and run it
 * 3. Check the console output for detailed error information
 */

console.log('🔍 User Creation Debug Tool');
console.log('='.repeat(50));

// Check authentication status
function checkAuth() {
  const token = localStorage.getItem('access_token');
  const userData = localStorage.getItem('user_data');
  
  console.log('\n🔐 Authentication Status:');
  console.log('Token:', token ? `${token.substring(0, 20)}...` : 'MISSING');
  
  if (userData) {
    try {
      const user = JSON.parse(userData);
      console.log('User:', {
        id: user.id,
        email: user.email,
        role: user.role,
        is_superuser: user.is_superuser
      });
      return { token, user };
    } catch (e) {
      console.log('User data parse error:', e);
      return { token, user: null };
    }
  }
  
  return { token, user: null };
}

// Test API connection
async function testAPI(token) {
  console.log('\n🌐 Testing API Connection:');
  
  const testData = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test.user@example.com',
    username: 'testuser123',
    phone: '+46701234567',
    department: 'Test',
    position: 'Tester',
    password: 'TestPass123!',
    password_confirm: 'TestPass123!',
    role_id: 2,
    is_active: true
  };
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      console.log('Response parsing error:', e);
      const text = await response.text();
      console.log('Raw response:', text);
      return;
    }
    
    console.log('Response Data:', responseData);
    
    if (response.status === 400) {
      console.log('\n❌ 400 BAD REQUEST - Validation Errors:');
      if (responseData && typeof responseData === 'object') {
        Object.entries(responseData).forEach(([field, errors]) => {
          console.log(`  ${field}:`, errors);
        });
      }
    } else if (response.status === 403) {
      console.log('\n🚫 403 FORBIDDEN - Permission Denied');
      console.log('  Check if user has user_management.create permission');
    } else if (response.status === 401) {
      console.log('\n🔒 401 UNAUTHORIZED - Invalid Token');
      console.log('  Token might be expired or invalid');
    } else if (response.status === 201) {
      console.log('\n✅ 201 SUCCESS - User Created!');
    }
    
  } catch (error) {
    console.log('\n❌ Network Error:', error);
  }
}

// Test permission check
async function testPermission(token) {
  console.log('\n🔒 Testing Permission Check:');
  
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
    console.log('Permission Result:', data);
    
    if (!data.has_permission) {
      console.log('❌ User does NOT have user_management.create permission');
    } else {
      console.log('✅ User HAS user_management.create permission');
    }
    
  } catch (error) {
    console.log('Permission check failed:', error);
  }
}

// Main execution
async function runTest() {
  const { token, user } = checkAuth();
  
  if (!token) {
    console.log('\n❌ No authentication token found!');
    console.log('Please log in first, then run this script again.');
    return;
  }
  
  if (!user) {
    console.log('\n⚠️ No user data found');
  }
  
  // Run tests
  await testPermission(token);
  await testAPI(token);
  
  console.log('\n🎯 Test Complete!');
  console.log('Check the output above for specific issues.');
}

// Auto-run the test
runTest();