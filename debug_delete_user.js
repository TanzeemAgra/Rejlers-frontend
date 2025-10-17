// Debug script for delete user functionality
// Run this in browser console on the user management page

console.log('🔍 Debug: Testing delete user functionality...');

// Check if user data exists
const checkUserData = () => {
  console.log('📊 Checking user data in table...');
  
  // Look for user rows in the table
  const userRows = document.querySelectorAll('table tbody tr');
  console.log(`Found ${userRows.length} user rows`);
  
  if (userRows.length > 0) {
    const firstRow = userRows[0];
    const deleteButton = firstRow.querySelector('button[title*="Delete"], .text-red-600');
    console.log('Delete button found:', deleteButton ? 'Yes' : 'No');
    
    if (deleteButton) {
      console.log('Delete button element:', deleteButton);
    }
  }
};

// Test API call directly
const testDeleteAPI = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('❌ No access token found');
    return;
  }
  
  console.log('🔑 Token found, testing delete endpoint...');
  
  // Test with a fake user ID to see response
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/users/test-id/delete/', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 Delete API Response Status:', response.status);
    const responseData = await response.json();
    console.log('📦 Delete API Response Data:', responseData);
    
    if (response.status === 404) {
      console.log('✅ API endpoint is working (404 for fake ID is expected)');
    } else if (response.status === 403) {
      console.log('⚠️ Permission denied - check user permissions');
    } else {
      console.log('ℹ️ Other response:', response.status);
    }
  } catch (error) {
    console.error('❌ Delete API Error:', error);
  }
};

// Test user permissions
const testPermissions = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) return;
  
  try {
    const response = await fetch('https://rejlers-backend-production.up.railway.app/api/v1/auth/permissions/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const permissions = await response.json();
      console.log('👤 User Permissions:', permissions);
      
      // Check for user_management permissions
      const userMgmt = permissions.modules?.find(m => m.module_key === 'user_management');
      if (userMgmt) {
        console.log('🔧 User Management Permissions:', userMgmt);
        console.log('🗑️ Can Delete:', userMgmt.access_level?.can_delete || false);
      } else {
        console.log('⚠️ No user_management module found in permissions');
      }
    }
  } catch (error) {
    console.error('❌ Permission check error:', error);
  }
};

// Run all checks
checkUserData();
testDeleteAPI();
testPermissions();

// Instructions for manual testing
console.log(`
🧪 Manual Testing Steps:
1. Try clicking the delete button (trash icon) in the Actions column
2. Check if confirmation dialog appears
3. Check browser console for any errors
4. If no confirmation dialog, the onClick handler may not be properly attached
5. If confirmation appears but delete fails, check the API response above
`);

// Check for React component state
setTimeout(() => {
  console.log('🔍 Checking for React component...');
  const reactRoot = document.querySelector('#__next');
  if (reactRoot && reactRoot._reactInternalFiber) {
    console.log('⚛️ React component detected');
  } else {
    console.log('ℹ️ React internals not accessible from console');
  }
}, 1000);