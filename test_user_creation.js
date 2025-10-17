// Test script for user creation API
// Run this in the browser console when logged in to test the backend connection

async function testUserCreation() {
  try {
    console.log('🔍 Testing user creation API...');
    
    // Get current auth token
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('❌ No access token found. Please log in first.');
      return;
    }
    
    console.log('✅ Access token found');
    
    // Test data with correct backend field names
    const testUserData = {
      first_name: "Test",
      last_name: "User",
      email: "testuser" + Date.now() + "@example.com", // Unique email
      username: "testuser" + Date.now(),
      phone_number: "1234567890",
      department: "IT",
      job_title: "Developer",
      password: "TestPassword123!",
      password_confirm: "TestPassword123!",
      company_name: "REJLERS AB"
    };
    
    console.log('📤 Sending test data:', testUserData);
    
    // Make API call
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(testUserData)
    });
    
    console.log('📥 Response status:', response.status);
    
    const responseData = await response.json();
    console.log('📥 Response data:', responseData);
    
    if (response.ok) {
      console.log('✅ User creation successful!');
    } else {
      console.log('❌ User creation failed:', responseData);
      
      // Check for specific error types
      if (response.status === 400) {
        console.log('🔍 400 Error Details:');
        if (responseData.password) console.log('  - Password errors:', responseData.password);
        if (responseData.password_confirm) console.log('  - Password confirm errors:', responseData.password_confirm);
        if (responseData.email) console.log('  - Email errors:', responseData.email);
        if (responseData.username) console.log('  - Username errors:', responseData.username);
        if (responseData.non_field_errors) console.log('  - General errors:', responseData.non_field_errors);
      }
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Auto-run the test
testUserCreation();