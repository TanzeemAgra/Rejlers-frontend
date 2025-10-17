// Backend Delete Testing Script
// Run this in browser console on the user management page

console.log('🔍 Testing Backend Delete Behavior...');

const testBackendDeleteBehavior = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('❌ No access token found. Please login first.');
    return;
  }

  const baseUrl = 'https://rejlers-backend-production.up.railway.app/api/v1/auth';

  try {
    // Step 1: Get current user list
    console.log('📊 Step 1: Getting current user list...');
    const listResponse = await fetch(`${baseUrl}/users/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!listResponse.ok) {
      console.error('❌ Failed to get user list:', listResponse.status);
      return;
    }

    const userList = await listResponse.json();
    const userCount = userList.results ? userList.results.length : userList.length;
    console.log(`✅ Current user count: ${userCount}`);

    if (userCount === 0) {
      console.log('⚠️ No users found in the system to test deletion');
      return;
    }

    const users = userList.results || userList;
    console.log('👥 Available users:', users.map(u => ({ id: u.id, email: u.email, active: u.is_active })));

    // Step 2: Test delete endpoint with a fake UUID (should return 404)
    console.log('🧪 Step 2: Testing delete endpoint with fake UUID...');
    const fakeUUID = 'aaaaaaaa-bbbb-4ccc-dddd-eeeeeeeeeeee';
    
    const deleteResponse = await fetch(`${baseUrl}/users/${fakeUUID}/delete/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📡 Delete fake user response: ${deleteResponse.status}`);
    const deleteData = await deleteResponse.json();
    console.log('📦 Delete response data:', deleteData);

    if (deleteResponse.status === 404) {
      console.log('✅ Delete endpoint working correctly (404 for non-existent user)');
    } else if (deleteResponse.status === 403) {
      console.log('⚠️ Permission denied - user may not have delete permissions');
    } else {
      console.log('ℹ️ Unexpected response:', deleteResponse.status);
    }

    // Step 3: Check user permissions
    console.log('🔑 Step 3: Checking user permissions...');
    const permResponse = await fetch(`${baseUrl}/permissions/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (permResponse.ok) {
      const permissions = await permResponse.json();
      const userMgmt = permissions.modules?.find(m => m.module_key === 'user_management');
      
      if (userMgmt) {
        console.log('🔧 User Management Permissions:', {
          can_view: userMgmt.access_level?.can_view,
          can_create: userMgmt.access_level?.can_create,
          can_edit: userMgmt.access_level?.can_edit,
          can_delete: userMgmt.access_level?.can_delete,
          full_access: userMgmt.access_level?.full_access
        });

        if (userMgmt.access_level?.can_delete) {
          console.log('✅ User has delete permissions');
        } else {
          console.log('❌ User does NOT have delete permissions');
        }
      } else {
        console.log('⚠️ No user_management module found in permissions');
      }
    }

    // Step 4: Check if there are any real users we can test with
    const realUsers = users.filter(u => !u.email.includes('deleted_'));
    console.log(`👤 Real (non-deleted) users: ${realUsers.length}`);

    if (realUsers.length > 0) {
      console.log('ℹ️ To test actual deletion:');
      console.log('1. Use the frontend delete button for any user');
      console.log('2. Check the console for success/error messages');
      console.log('3. Verify user disappears from table');
      console.log('4. Check that user count decreases');
    }

    // Step 5: Test audit logs if accessible
    console.log('📋 Step 5: Checking audit logs...');
    try {
      const auditResponse = await fetch(`${baseUrl}/audit-logs/?action=delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (auditResponse.ok) {
        const auditData = await auditResponse.json();
        const deleteLogs = auditData.results || auditData;
        console.log(`📜 Recent delete operations: ${deleteLogs.length}`);
        
        if (deleteLogs.length > 0) {
          console.log('Recent deletions:', deleteLogs.slice(0, 3));
        }
      } else {
        console.log('⚠️ Cannot access audit logs (may need higher permissions)');
      }
    } catch (error) {
      console.log('⚠️ Audit logs not accessible:', error.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Summary of expected backend behavior
console.log(`
🎯 Expected Backend Delete Behavior:
1. ✅ Delete API marks user as is_active=False
2. ✅ Prefixes email/username with deleted_timestamp
3. ✅ User list API filters out inactive users  
4. ✅ Deleted user disappears from frontend table
5. ✅ Audit log entry created for deletion
6. ✅ Returns success response

This means the "reflection of changes" IS working correctly - 
deleted users should disappear from the user list as intended.
`);

// Run the test
testBackendDeleteBehavior();