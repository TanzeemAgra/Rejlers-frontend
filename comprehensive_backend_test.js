// Comprehensive backend connection and user creation test
// Copy this entire script and paste it in your browser console while logged in

async function testBackendConnection() {
  console.log('🚀 Starting comprehensive backend connection test...');
  
  // Step 1: Check authentication
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('❌ No access token found. Please log in first.');
    return;
  }
  console.log('✅ Step 1: Access token found');
  
  // Step 2: Test token validity with a simple endpoint
  try {
    console.log('🔍 Step 2: Testing token validity...');
    const healthResponse = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/health/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (healthResponse.ok) {
      console.log('✅ Step 2: Token is valid, backend is reachable');
    } else {
      console.log('⚠️ Step 2: Token may be invalid or expired, status:', healthResponse.status);
      
      // Try to refresh token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        console.log('🔄 Attempting token refresh...');
        const refreshResponse = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: refreshToken
          })
        });
        
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem('access_token', refreshData.access);
          console.log('✅ Token refreshed successfully');
        } else {
          console.error('❌ Token refresh failed. Please log in again.');
          return;
        }
      }
    }
  } catch (error) {
    console.error('❌ Step 2: Network error testing token:', error);
    return;
  }
  
  // Step 3: Test user creation endpoint structure
  console.log('🔍 Step 3: Testing user creation endpoint...');
  
  const testData = {
    first_name: "Test",
    last_name: "User", 
    email: `testuser${Date.now()}@example.com`,
    username: `testuser${Date.now()}`,
    phone_number: "1234567890",
    department: "IT",
    job_title: "Developer",
    password: "TestPassword123!",
    password_confirm: "TestPassword123!",
    company_name: "REJLERS AB"
  };
  
  console.log('📤 Step 3: Sending test user data:', testData);
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📥 Step 3: Response status:', response.status);
    const responseData = await response.json();
    console.log('📥 Step 3: Response data:', responseData);
    
    if (response.ok) {
      console.log('🎉 SUCCESS: User creation works perfectly!');
      console.log('✅ Backend is fully connected and functional');
    } else {
      console.log('❌ Step 3: User creation failed with status:', response.status);
      
      if (response.status === 400) {
        console.log('🔍 400 Bad Request - Field validation errors:');
        Object.entries(responseData).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            console.log(`  - ${field}: ${errors.join(', ')}`);
          } else if (typeof errors === 'string') {
            console.log(`  - ${field}: ${errors}`);
          }
        });
      } else if (response.status === 401) {
        console.log('🔐 401 Unauthorized - Authentication issue');
      } else if (response.status === 403) {
        console.log('🚫 403 Forbidden - Permission issue');
      }
    }
    
  } catch (error) {
    console.error('❌ Step 3: Network error during user creation:', error);
  }
  
  console.log('🏁 Backend connection test completed');
}

// Auto-run the test
testBackendConnection();