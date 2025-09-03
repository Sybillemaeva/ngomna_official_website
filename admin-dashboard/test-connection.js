// Simple test script to verify backend connection
const API_BASE_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('Testing backend connection...');
  
  try {
    // Test basic connectivity
    const response = await fetch(`${API_BASE_URL}/menus`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Backend connection successful!');
    console.log('📊 Menus data:', data);
    
    // Test pages endpoint
    const pagesResponse = await fetch(`${API_BASE_URL}/pages`);
    if (pagesResponse.ok) {
      const pagesData = await pagesResponse.json();
      console.log('📄 Pages data:', pagesData);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
    return false;
  }
}

// Run the test
testConnection();
