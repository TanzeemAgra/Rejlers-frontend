#!/usr/bin/env node
/**
 * User Creation API Diagnostic Script
 * Tests the exact API call that's failing with 400 error
 */

const https = require('https');

// Test user data that should match the frontend structure
const testUserData = {
  first_name: 'Test',
  last_name: 'User',
  email: 'test.user@rejlers.com',
  username: 'testuser123',
  phone_number: '+46701234567',  // Using backend field name
  department: 'Engineering',
  job_title: 'Test Engineer',    // Using backend field name
  password: 'TestPassword123!',
  password_confirm: 'TestPassword123!',  // Backend expects confirmation
  company_name: 'Rejlers',
  role_id: 2,
  is_active: true,
  send_welcome_email: true,
  created_via: 'super_admin_interface'
};

console.log('🔍 Testing User Creation API');
console.log('=' * 50);
console.log('API Endpoint: https://rejlers-backend-production.up.railway.app/api/v1/auth/users/create/');
console.log('Test Data:', JSON.stringify(testUserData, null, 2));

// Function to make the API call
function testUserCreation() {
  const data = JSON.stringify(testUserData);
  
  const options = {
    hostname: 'rejlers-backend-production.up.railway.app',
    port: 443,
    path: '/api/v1/auth/users/create/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'REJLERS-Frontend-Diagnostic/1.0'
    }
  };

  console.log('\n🚀 Making API call...');
  
  const req = https.request(options, (res) => {
    console.log(`\n📊 Response Status: ${res.statusCode}`);
    console.log(`📋 Response Headers:`, res.headers);
    
    let responseBody = '';
    
    res.on('data', (chunk) => {
      responseBody += chunk;
    });
    
    res.on('end', () => {
      console.log('\n📄 Response Body:');
      try {
        const parsed = JSON.parse(responseBody);
        console.log(JSON.stringify(parsed, null, 2));
        
        if (res.statusCode === 400) {
          console.log('\n❌ 400 BAD REQUEST - Analysis:');
          if (parsed.detail) {
            console.log('   Error Detail:', parsed.detail);
          }
          if (parsed.non_field_errors) {
            console.log('   Non-field errors:', parsed.non_field_errors);
          }
          // Check for field-specific validation errors
          Object.keys(parsed).forEach(field => {
            if (Array.isArray(parsed[field])) {
              console.log(`   Field "${field}":`, parsed[field]);
            }
          });
        } else if (res.statusCode === 401 || res.statusCode === 403) {
          console.log('\n🔒 Authentication/Authorization Issue:');
          console.log('   This is expected - need valid auth token');
          console.log('   ✅ API endpoint is reachable');
        } else if (res.statusCode === 201) {
          console.log('\n✅ SUCCESS - User creation worked!');
        }
        
      } catch (error) {
        console.log('Raw response:', responseBody);
        console.log('JSON parse error:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error('\n❌ Request Error:', error.message);
  });

  req.write(data);
  req.end();
}

// Test the API
testUserCreation();

// Also test a minimal payload to see if it's a field validation issue
console.log('\n🧪 Testing with minimal payload...');

const minimalData = {
  first_name: 'Test',
  last_name: 'User', 
  email: 'test2@rejlers.com',
  username: 'testuser2',
  password: 'TestPass123!',
  password_confirm: 'TestPass123!'
};

setTimeout(() => {
  console.log('\n📋 Minimal Test Data:', JSON.stringify(minimalData, null, 2));
  
  const data = JSON.stringify(minimalData);
  
  const options = {
    hostname: 'rejlers-backend-production.up.railway.app',
    port: 443,
    path: '/api/v1/auth/users/create/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'REJLERS-Frontend-Diagnostic/1.0'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`\n📊 Minimal Payload Response: ${res.statusCode}`);
    
    let responseBody = '';
    res.on('data', (chunk) => { responseBody += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(responseBody);
        console.log('Minimal Response:', JSON.stringify(parsed, null, 2));
      } catch (error) {
        console.log('Minimal Raw response:', responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Minimal Request Error:', error.message);
  });

  req.write(data);
  req.end();
}, 2000);