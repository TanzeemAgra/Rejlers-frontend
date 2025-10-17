/**
 * 400 Error Debug Script
 * Run this in browser console to see exact validation errors
 */

console.log('🔍 Debugging 400 Error in User Creation');
console.log('='.repeat(50));

async function debug400Error() {
  // Check authentication first
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    console.log('❌ No access token found');
    return;
  }

  console.log('✅ Access token found');

  // Test with minimal valid data
  const testData = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@rejlers.com',
    username: 'testuser123',
    password: 'TestPass123!',
    password_confirm: 'TestPass123!',
    is_active: true
  };

  console.log('📤 Sending test data:', testData);

  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(testData)
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📋 Response Headers:`, Object.fromEntries(response.headers.entries()));

    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      const text = await response.text();
      console.log('Raw response:', text);
      return;
    }

    console.log('📄 Response Data:', responseData);

    if (response.status === 400) {
      console.log('\n❌ 400 BAD REQUEST - Detailed Analysis:');
      
      if (responseData.non_field_errors) {
        console.log('🔸 Non-field errors:', responseData.non_field_errors);
      }
      
      // Check each field for validation errors
      Object.keys(responseData).forEach(field => {
        if (field !== 'non_field_errors' && responseData[field]) {
          console.log(`🔸 Field "${field}":`, responseData[field]);
        }
      });
      
      // Check for missing required fields
      console.log('\n🔍 Checking for missing required fields...');
      const requiredFields = ['first_name', 'last_name', 'email', 'username', 'password'];
      requiredFields.forEach(field => {
        if (!testData[field]) {
          console.log(`❌ Missing required field: ${field}`);
        } else {
          console.log(`✅ Field present: ${field}`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Also test with the actual frontend transformation
async function testWithFrontendTransform() {
  console.log('\n🔄 Testing with Frontend Data Transformation');
  
  const frontendData = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@rejlers.com',
    username: 'testuser123',
    phone: '+46701234567',
    department: 'Engineering',
    position: 'Test Engineer',
    password: 'TestPass123!',
    confirm_password: 'TestPass123!',
    role_id: 2,
    is_active: true,
    send_welcome_email: false
  };

  // Simulate the frontend transformation (basic version)
  const backendData = {
    first_name: frontendData.first_name,
    last_name: frontendData.last_name,
    email: frontendData.email,
    username: frontendData.username,
    password: frontendData.password,
    password_confirm: frontendData.confirm_password, // Note: backend expects this field name
    phone_number: frontendData.phone,
    department: frontendData.department,
    job_title: frontendData.position,
    role_id: frontendData.role_id,
    is_active: frontendData.is_active,
    send_welcome_email: frontendData.send_welcome_email
  };

  console.log('📤 Frontend data:', frontendData);
  console.log('📤 Transformed backend data:', backendData);

  const accessToken = localStorage.getItem('access_token');
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(backendData)
    });

    const responseData = await response.json();
    console.log(`📊 Transform Test Status: ${response.status}`);
    console.log('📄 Transform Test Response:', responseData);

  } catch (error) {
    console.error('❌ Transform test error:', error);
  }
}

// Run both tests
debug400Error().then(() => testWithFrontendTransform());