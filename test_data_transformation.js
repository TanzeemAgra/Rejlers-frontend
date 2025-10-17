// Test frontend data transformation
// Run this in browser console to verify the form data is being transformed correctly

// Import the config (you'll need to copy the relevant parts or run this from the frontend)
function testDataTransformation() {
  console.log('🔄 Testing frontend data transformation...');
  
  // Sample form data as it comes from the frontend form
  const frontendFormData = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    username: "johndoe123",
    phone: "1234567890",           // Frontend uses 'phone'
    department: "Engineering",
    position: "Senior Developer",   // Frontend uses 'position'
    password: "SecurePass123!",
    confirm_password: "SecurePass123!",  // Frontend uses 'confirm_password'
  };
  
  console.log('📝 Original frontend form data:', frontendFormData);
  
  // Manual transformation to match backend expectations
  const transformedData = {
    first_name: frontendFormData.first_name.trim(),
    last_name: frontendFormData.last_name.trim(),
    email: frontendFormData.email.trim().toLowerCase(),
    username: frontendFormData.username.trim().toLowerCase(),
    phone_number: frontendFormData.phone.trim(),        // phone -> phone_number
    department: frontendFormData.department.trim(),
    job_title: frontendFormData.position.trim(),       // position -> job_title
    password: frontendFormData.password,
    password_confirm: frontendFormData.confirm_password, // confirm_password -> password_confirm
    company_name: "REJLERS AB",  // Default company name
  };
  
  console.log('🔄 Transformed data for backend:', transformedData);
  
  // Validation checks
  console.log('✅ Validation checks:');
  console.log('  - phone -> phone_number:', frontendFormData.phone === transformedData.phone_number);
  console.log('  - position -> job_title:', frontendFormData.position === transformedData.job_title);
  console.log('  - confirm_password -> password_confirm:', frontendFormData.confirm_password === transformedData.password_confirm);
  console.log('  - passwords match:', transformedData.password === transformedData.password_confirm);
  
  return transformedData;
}

// Run the test
const testResult = testDataTransformation();